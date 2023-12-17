import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "@/assets/images";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import icons from "@/assets/icons";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer>
      <div className={cx("footer-wrap")}>
        <Row>
          <Col xs={24} lg={8}>
            <div className={cx("footer-item", "d-flex", "justify-center")}>
              <div>
                <h4 className={cx("text-center", "fs-16", "text-uppercase", "fw-600")}>Menu</h4>
                <ul className={cx("list-style-none", "ps-0")}>
                  <li className={cx("mt-2", "text-center")}>
                    <Link className={cx("fs-20", "text-link")}>Về LaFuong</Link>
                  </li>
                  <li className={cx("mt-2", "text-center")}>
                    <Link className={cx("fs-20", "text-link")}>Sản phẩm</Link>
                  </li>
                  <li className={cx("mt-2", "text-center")}>
                    <Link className={cx("fs-20", "text-link")}>Cách mua hàng</Link>
                  </li>
                  <li className={cx("mt-2", "text-center")}>
                    <Link className={cx("fs-20", "text-link")}>Câu hỏi thường gặp</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={8}>
            <div className={cx("footer-item", "d-flex", "flex-column", "justify-center")}>
              <div>
                <h4 className={cx("text-center", "fs-16", "text-uppercase", "fw-600")}>Hotline</h4>
                <ul className={cx("list-style-none", "ps-0")}>
                  <li className={cx("mt-2", "text-center")}>
                    <a href="tel:0907860330" className={cx("fs-20", "text-link")}>
                      090 786 0330
                    </a>
                  </li>
                </ul>
              </div>
              <div style={{ marginTop: 32 }}>
                <h4 className={cx("text-center", "fs-16", "text-uppercase", "fw-600")}>Địa chỉ</h4>
                <p className={cx("fs-20", "text-center", "px-5", "mt-2")}>Ngõ 91 Nguyễn Chí Thanh, Q.Đống Đa, Hà Nội</p>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={8}>
            <div className={cx("footer-item", "d-flex", "flex-column", "justify-center", "align-items-center")}>
              <div>
                <h4 className={cx("text-center", "fs-16", "text-uppercase", "fw-600")}>Follow us on</h4>
                <ul className={cx("list-style-none", "d-flex", "mt-2", "ps-0")}>
                  <li className={cx("footer-brand")}>
                    <Link>
                      <img src={icons.facebook} alt="" />
                    </Link>
                  </li>
                  <li className={cx("footer-brand")}>
                    <Link>
                      <img src={icons.instagram} alt="" />
                    </Link>
                  </li>
                  <li className={cx("footer-brand")}>
                    <Link>
                      <img src={icons.tiktok} alt="" />
                    </Link>
                  </li>
                </ul>
              </div>
              <p className={cx("fs-20", "px-5", "text-center", "mt-5")}>© 2022 LaFuong Pastry. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </div>
      <div className={cx("footer-end", "px-4", "pb-4")}>
        <img className={cx("footer-logo")} src={images.logo} alt="" />
      </div>
    </footer>
  );
}

export default Footer;
