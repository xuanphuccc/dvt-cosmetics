import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import icons from "@/assets/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mainLayoutSlide from "../mainLayoutSlide";
import { menuStatusSelector } from "@/redux/selector";

const cx = classNames.bind(styles);

function Menu() {
  const dispatch = useDispatch();
  const menuStatus = useSelector(menuStatusSelector);

  const handleCloseMenu = (e) => {
    e.stopPropagation();
    dispatch(mainLayoutSlide.actions.closeMenu());
  };

  return (
    <div className={cx("menu")}>
      <div onClick={handleCloseMenu} className={cx("overlay", { active: menuStatus })}></div>
      <div
        className={cx("menu-wrapper", {
          active: menuStatus,
          close: !menuStatus,
        })}
      >
        {/* ----- Menu header ----- */}
        <div className={cx("px-4", "px-sm-32", "py-4", "d-flex", "justify-space-between", "align-items-center")}>
          <h2 className={cx("font-secondary", "fw-200", "fs-36", "text-italic")}>Menu</h2>
          <img onClick={handleCloseMenu} className={cx("cursor-pointer")} src={icons.times} alt="" />
        </div>
        {/* ----- End Menu header ----- */}

        <div className={cx("mx-32", "py-4")}>
          <ul className={cx("pt-4", "ps-0", "list-style-none")}>
            <li className={cx("")}>
              <Link
                to={"/about"}
                onClick={handleCloseMenu}
                className={cx("fs-24", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
              >
                Về LaFuong
              </Link>
            </li>
            <li className={cx("")}>
              <Link
                to={"/products"}
                onClick={handleCloseMenu}
                className={cx("fs-24", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
              >
                Sản phẩm
              </Link>

              <ul className={cx("pt-4", "ps-4", "list-style-none")}>
                <li className={cx("")}>
                  <Link
                    to={"/products/#cake"}
                    onClick={handleCloseMenu}
                    className={cx("fs-20", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
                  >
                    Bánh sinh nhật
                  </Link>
                </li>
                <li className={cx("")}>
                  <Link
                    to={"/products/#small-cake"}
                    onClick={handleCloseMenu}
                    className={cx("fs-20", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
                  >
                    Bánh ngọt nhỏ
                  </Link>
                </li>
                <li className={cx("")}>
                  <Link
                    to={"/products/#accessory"}
                    onClick={handleCloseMenu}
                    className={cx("fs-20", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
                  >
                    Phụ kiện
                  </Link>
                </li>
              </ul>
            </li>

            <li className={cx("")}>
              <Link
                to={"/instruction"}
                onClick={handleCloseMenu}
                className={cx("fs-24", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
              >
                Cách mua hàng
              </Link>
            </li>

            <li className={cx("")}>
              <Link
                to={"/instruction"}
                onClick={handleCloseMenu}
                className={cx("fs-24", "fw-400", "btn", "btn-link", "hover-show-underline", "ps-0")}
              >
                Câu hỏi thường gặp
              </Link>
            </li>
          </ul>

          <div className={cx("py-32")}>
            <p className={cx("fs-20")}>
              <span>Hotline:</span>
              <a className={cx("text-link", "text-decoration-none")} href="tel:0907860330">
                {" "}
                090 786 0330
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
