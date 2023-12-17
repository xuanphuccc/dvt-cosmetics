import classNames from "classnames/bind";
import styles from "./MainLayout.module.scss";
import { useEffect } from "react";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";
import Modal from "@/components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { selectedCartItemSelector, wishesModalStatusSelector } from "@/redux/selector";
import mainLayoutSlide from "./mainLayoutSlide";
import cartSlice from "./Cart/cartSlice";

const cx = classNames.bind(styles);

function MainLayout({ children }) {
  const dispatch = useDispatch();
  const isOpenWishesModal = useSelector(wishesModalStatusSelector);
  const selectedCartItem = useSelector(selectedCartItemSelector);

  const location = useLocation();

  // ----- Handle auto scroll top -----
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [location]);
  // ----- End handle auto scroll top -----

  // ----- Handle wishes modal -----
  const handleCloseWishesModal = () => {
    dispatch(mainLayoutSlide.actions.closeWishesModal());
  };

  const handleWishesInputChange = (e) => {
    if (e.target.value.length <= 35) {
      dispatch(mainLayoutSlide.actions.wishesInputChange(e.target.value));
    }
  };

  const handleSetCartItemWishes = () => {
    dispatch(cartSlice.actions.setItemWishes(selectedCartItem));

    handleCloseWishesModal();
  };
  // ----- End handle wishes modal -----

  return (
    <div className={cx("main-layout")}>
      <Header />
      <Menu />
      <Cart />
      <Modal
        open={isOpenWishesModal}
        onOk={handleSetCartItemWishes}
        onCancel={handleCloseWishesModal}
        title="Viết lời chúc trên bánh"
      >
        <div className={cx("form-group")}>
          <input
            value={selectedCartItem.wishes}
            onChange={handleWishesInputChange}
            className={cx("form-control", "w-100")}
            type="text"
            placeholder="Nhập lời chúc mong muốn..."
          />
          <p className={cx("fs-12", "mt-1", "font-primary")}>Tối đa 35 ký tự</p>
        </div>
      </Modal>
      <div className={cx("content-wrapper")}>{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
