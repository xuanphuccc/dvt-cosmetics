import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import { Breadcrumb, Spin, Pagination, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import orderApi from "@/api/orderApi";
import renderOrderStatus from "@/services/renderOrderStatus";

const cx = classNames.bind(styles);

function Orders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllOrders = async () => {
      setLoading(true);

      try {
        const response = await orderApi.getAll();

        setOrders(response.data?.data ?? []);
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetAllOrders();
  }, []);

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Đơn hàng</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin"}>Trang chủ</Link>,
              key: "home",
            },
            { title: "Đơn hàng", key: "orders" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      {/* ----- Card ----- */}
      <div className={cx("card")}>
        {/* Card header */}
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "px-2", "pb-4")}>
          <h4 className={cx("card-title")}>Tất cả đơn hàng</h4>
          <Link to={"/admin/orders/create/0"} className={cx("btn", "btn-modern", "btn-dark")}>
            Tạo đơn hàng
          </Link>
        </div>
        {/* End card header */}

        {/* Table */}
        <Spin spinning={loading}>
          <div className={cx("w-100", "overflow-x-auto")}>
            <table className={cx("table", "table-hover", "bordered-header-only")}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order, index) => (
                  <tr
                    onClick={() => {
                      navigate(`/admin/orders/update/${order.orderId}`);
                    }}
                    className={cx("cursor-pointer")}
                    key={order.orderId}
                  >
                    <td>{order.orderId}</td>
                    <td className={cx("py-4")}>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td>{order.orderTotal}</td>
                    <td>
                      <Tag color={renderOrderStatus(order.orderStatus)?.color}>
                        {renderOrderStatus(order.orderStatus)?.name}
                      </Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Spin>
        {/* End table */}

        {/* Paging */}
        <div className={cx("mt-4", "d-flex", "justify-end", "align-items-center", "pagination")}>
          <Pagination current={1} onChange={() => {}} total={1} size="small" simple />
        </div>
      </div>
      {/* ----- End card ----- */}
    </div>
  );
}

export default Orders;
