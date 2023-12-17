import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { Col, Row } from "antd";
import * as Unicons from "@iconscout/react-unicons";

const cx = classNames.bind(styles);

function Dashboard() {
  const reportData = {
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  };

  return (
    <div>
      <h1 className={cx("font-primary", "fw-700", "pb-5")}>Tổng quan</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <div style={{ background: "#e7eefe" }} className={cx("dashboard-item", "px-4", "py-4")}>
            <div className={cx("d-flex", "align-items-center")}>
              <span style={{ background: "#0d47f5" }} className={cx("dashboard-item-icon", "me-2")}>
                <Unicons.UilBill size="16" />
              </span>
              <p className={cx("fs-16", "fw-600", "font-primary")}>Đơn đã bán</p>
            </div>
            <div className={cx("fs-36", "fw-600", "font-primary", "pt-1")}>{reportData.totalOrders}</div>
            <p className={cx("d-flex", "align-items-center")}>
              <span className={cx("me-1")}>
                <Unicons.UilArrowGrowth size="14" />
              </span>
              <span className={cx("fs-12", "font-primary")}>9.0%</span>
            </p>
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div style={{ background: "#ffefe2" }} className={cx("dashboard-item", "px-4", "py-4")}>
            <div className={cx("d-flex", "align-items-center")}>
              <span style={{ background: "#d1814c" }} className={cx("dashboard-item-icon", "me-2")}>
                <Unicons.UilMoneybag size="16" />
              </span>
              <p className={cx("fs-16", "fw-600", "font-primary")}>Doanh thu</p>
            </div>
            <div className={cx("fs-36", "fw-600", "font-primary", "pt-1")}>{reportData.totalRevenue}M</div>
            <p className={cx("d-flex", "align-items-center")}>
              <span className={cx("me-1")}>
                <Unicons.UilArrowGrowth size="14" />
              </span>
              <span className={cx("fs-12", "font-primary")}>9.0%</span>
            </p>
          </div>
        </Col>
        <Col xs={24} lg={8}>
          <div style={{ background: "#eae4ff" }} className={cx("dashboard-item", "px-4", "py-4")}>
            <div className={cx("d-flex", "align-items-center")}>
              <span style={{ background: "#b66dff" }} className={cx("dashboard-item-icon", "me-2")}>
                <Unicons.UilHome size="16" />
              </span>
              <p className={cx("fs-16", "fw-600", "font-primary")}>Khách hàng</p>
            </div>
            <div className={cx("fs-36", "fw-600", "font-primary", "pt-1")}>{reportData.totalCustomers}</div>
            <p className={cx("d-flex", "align-items-center")}>
              <span className={cx("me-1")}>
                <Unicons.UilArrowGrowth size="14" />
              </span>
              <span className={cx("fs-12", "font-primary")}>9.0%</span>
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
