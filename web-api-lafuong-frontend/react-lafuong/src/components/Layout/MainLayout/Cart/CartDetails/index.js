import classNames from "classnames/bind";
import styles from "./CartDetails.module.scss";
import images from "@/assets/images";
import { Link } from "react-router-dom";
import icons from "@/assets/icons";
import { useDispatch, useSelector } from "react-redux";
import mainLayoutSlide from "../../mainLayoutSlide";
import { cartItemsSelector, cartSelector } from "@/redux/selector";
import currencyConvert from "@/services/currencyConvert";
import cartSlice from "../cartSlice";

const cx = classNames.bind(styles);

function CartDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartItemsSelector);
  const cartInfor = useSelector(cartSelector);

  // ----- -----
  const handleCloseCart = () => {
    dispatch(mainLayoutSlide.actions.closeCart());
  };

  const handleNavigateToDeliveryForm = () => {
    // Clear old delivery information
    dispatch(cartSlice.actions.clearDeliveryInfor());

    // Navigate to devlivery form
    dispatch(mainLayoutSlide.actions.openCartDelivery());
  };

  const handleOpenWishesInputModal = (item) => {
    dispatch(
      mainLayoutSlide.actions.openWishesModal({
        productId: item.productId,
        wishes: item.wishes,
      }),
    );
  };
  // ----- -----

  // ----- Handle remove cart item -----
  const handleRemoveCartItem = (productId) => {
    dispatch(cartSlice.actions.removeItem(productId));
  };
  // ----- End handle remove cart item -----

  return (
    <div className={cx("w-100", "d-flex", "flex-column")}>
      <div className={cx("px-4", "px-sm-32", "py-4", "d-flex", "justify-space-between", "align-items-center")}>
        <h2 className={cx("font-secondary", "fw-200", "fs-36", "text-italic")}>Giỏ hàng</h2>
        <img onClick={handleCloseCart} className={cx("cursor-pointer")} src={icons.times} alt="" />
      </div>

      {/* ----- Cart items ----- */}
      <div className={cx("py-2", "overflow-y-auto")}>
        {cartItems?.map((item) => (
          <div key={item.productId} className={cx("px-4", "px-sm-32", "pb-4", "d-flex")}>
            <img className={cx("cart-item-img")} src={item.image || images.placeholder} alt="" />
            <div className={cx("ms-4", "w-100")}>
              <div className={cx("w-100", "d-flex", "justify-space-between")}>
                <Link
                  to={`/products/${item.productId}`}
                  className={cx("fs-18", "fw-500", "text-primary", "text-decoration-none")}
                >
                  <span>{item.name}</span>
                  <span> x {item.qty}</span>
                </Link>
                <button
                  onClick={() => {
                    handleRemoveCartItem(item.productId);
                  }}
                  className={cx("btn", "btn-link")}
                >
                  Xoá
                </button>
              </div>
              <p className={cx("font-primary", "fs-16")}>{item.title}</p>
              <div className={cx("py-1")}>
                {item.wishes ? (
                  <div className={cx("wishes-wrap")}>
                    <p className={cx("quote", "me-1")} title="Lời chúc kèm theo bánh">
                      "{item.wishes}"
                    </p>
                    <button
                      onClick={() => {
                        handleOpenWishesInputModal(item);
                      }}
                      className={cx("btn", "btn-link")}
                    >
                      Sửa
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleOpenWishesInputModal(item);
                    }}
                    className={cx("btn", "btn-sm", "btn-dark")}
                  >
                    Viết lời chúc
                  </button>
                )}
              </div>
              <p className={cx("py-1", "font-primary")}>{currencyConvert(item.price)}</p>
            </div>
          </div>
        ))}
      </div>
      {/* ----- Cart items ----- */}

      {/* ----- Cart total ----- */}
      {cartItems.length > 0 ? (
        <div className={cx("px-4", "px-sm-32", "pt-2", "pb-5", "border-top", "mt-auto")}>
          <div className={cx("d-flex", "justify-space-between", "align-items-center", "pt-2", "pb-4")}>
            <span className={cx("fs-14", "font-primary", "fw-600", "text-uppercase")}>
              Tổng {cartItems?.reduce((total, item) => total + item.qty, 0)} sản phẩm
            </span>
            <span className={cx("font-primary", "fs-16")}>{currencyConvert(cartInfor.itemsTotal)}</span>
          </div>
          <div className={cx("w-100")}>
            <button onClick={handleNavigateToDeliveryForm} className={cx("btn", "btn-dark", "w-100")}>
              Tiếp tục
            </button>
          </div>
        </div>
      ) : (
        <div className={cx("mt-auto", "mb-auto", "ms-auto", "me-auto", "d-flex", "flex-column", "align-items-center")}>
          <p className={cx("fs-36", "fw-200", "font-secondary", "text-italic", "px-4", "py-2", "text-center")}>
            Chưa có sản phẩm trong giỏ
          </p>
          <Link to={"/products"} onClick={handleCloseCart} className={cx("btn", "fs-16", "btn-link")}>
            Tất cả sản phẩm
          </Link>
        </div>
      )}
      {/* ----- End cart total ----- */}
    </div>
  );
}

export default CartDetails;
