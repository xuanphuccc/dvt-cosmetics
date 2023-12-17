import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
import * as Unicons from "@iconscout/react-unicons";
import images from "@/assets/images";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
  const [menuStatus, setMenuStatus] = useState(false);

  const location = useLocation();

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setMenuStatus((prev) => !prev);
  };

  useEffect(() => {
    const handleCloseMenu = () => {
      setMenuStatus(false);
    };
    window.addEventListener("click", handleCloseMenu);

    return () => {
      window.removeEventListener("click", handleCloseMenu);
    };
  }, []);

  return (
    <div>
      <nav className={cx("header")}>
        {/* Menu icon */}
        <span onClick={handleToggleMenu} className={cx("header-menu-icon")}>
          <Unicons.UilBars size="20" />
        </span>

        {/* Small logo */}
        <div className={cx("brand-mini-wrap")}>
          <img className={cx("brand-logo")} src={images.logo2} alt="" />
        </div>

        <div className={cx("brand-wrap")}>
          <img className={cx("brand-logo")} src={images.logo2} alt="" />
        </div>
        <div className={cx("d-flex", "align-items-center")}>
          <div className={cx("d-flex", "align-items-center", "pe-2", "pe-lg-5")}>
            <img className={cx("account-avatar")} src={images.user} alt="" />
            <div className={cx("ps-2", "user-infor-group")}>
              <p className={cx("fs-14", "fw-600")}>Michael Dell</p>
              <p className={cx("text-light-gray", "fs-12")}>Crystal cosmetics</p>
            </div>
          </div>
          {/* <span className={cx("header-icon", "me-5")}>
            <Unicons.UilBell size="20" />
          </span> */}
        </div>
      </nav>

      <div className={cx("main-content-wrap")}>
        <nav className={cx("sidebar", { active: menuStatus })}>
          <div className={cx("px-32", "w-100")}>
            <ul className={cx("sidebar-nav")}>
              <li
                className={cx("sidebar-nav-item", {
                  active: location.pathname === "/admin",
                })}
              >
                <Link to={"/admin"} className={cx("sidebar-nav-link")}>
                  <span className={cx("sidebar-nav-icon")}>
                    <Unicons.UilEstate size="20" />
                  </span>
                  <span>Tổng quan</span>
                </Link>
              </li>

              <li
                className={cx("sidebar-nav-item", {
                  active: location.pathname.includes("/admin/orders"),
                })}
              >
                <Link to={"/admin/orders"} className={cx("sidebar-nav-link")}>
                  <span className={cx("sidebar-nav-icon")}>
                    <Unicons.UilBill size="20" />
                  </span>
                  <span>Đơn hàng</span>
                </Link>
              </li>

              <li
                className={cx("sidebar-nav-item", {
                  active: location.pathname.includes("/admin/products"),
                })}
              >
                <Link to={"/admin/products"} className={cx("sidebar-nav-link")}>
                  <span className={cx("sidebar-nav-icon")}>
                    <Unicons.UilBox size="20" />
                  </span>
                  <span>Sản phẩm</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* <div className={cx("px-32", "pb-32", "mt-auto", "w-100")}>
            <button className={cx("sidebar-btn")}>
              <span className={cx("sidebar-btn-icon")}>
                <Unicons.UilSignOutAlt size="20" />
              </span>
              <span>Đăng xuất</span>
            </button>
          </div> */}
        </nav>

        {/* ----- Main content ----- */}
        {/* Content render here */}
        <div className={cx("main-content")}>{children}</div>
        {/* ----- End Main content ----- */}
      </div>
    </div>
  );
}

export default AdminLayout;
