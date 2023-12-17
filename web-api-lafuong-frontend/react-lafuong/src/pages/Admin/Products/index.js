import classNames from "classnames/bind";
import styles from "./Products.module.scss";
import { Breadcrumb, Empty, Pagination, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import images from "@/assets/images";
import productApi from "@/api/productApi";

const cx = classNames.bind(styles);

function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAllProducts = async () => {
      setLoading(true);

      try {
        const response = await productApi.getAll();

        setProducts(response.data?.data ?? []);
        setLoading(false);

        console.log(response.data);
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetAllProducts();
  }, []);

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Sản phẩm</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin"}>Trang chủ</Link>,
              key: "home",
            },
            { title: "Sản phẩm", key: "products" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      {/* ----- Card ----- */}
      <div className={cx("card")}>
        {/* Card header */}
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "px-2", "pb-4")}>
          <h4 className={cx("card-title")}>Tất cả sản phẩm</h4>
          <Link to={"/admin/products/create/0"} className={cx("btn", "btn-modern", "btn-dark")}>
            Tạo sản phẩm
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
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Phân loại</th>
                  <th>Giá bán</th>
                  <th>Giá nhập</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => (
                  <tr
                    onClick={() => {
                      navigate(`/admin/products/update/${product.productId}`);
                    }}
                    className={cx("cursor-pointer")}
                    key={product.productId}
                  >
                    <td>{index + 1}</td>
                    <td className={cx("py-2")}>
                      <img src={product?.image || images.placeholder} alt="" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.type}</td>
                    <td>{product.price}</td>
                    <td>{product.costPrice}</td>
                    <td>{product.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
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

export default Products;
