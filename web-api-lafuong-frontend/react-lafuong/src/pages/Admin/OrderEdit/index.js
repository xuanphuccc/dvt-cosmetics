import classNames from "classnames/bind";
import styles from "./CategoryEdit.module.scss";
import { Breadcrumb, Button, Col, Input, Row, Spin, Popconfirm, Select, Empty } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import images from "@/assets/images";
import { useEffect, useMemo, useState } from "react";
import orderApi from "@/api/orderApi";
import productApi from "@/api/productApi";
import Validator from "@/validator/validator";
import { orderStatus } from "@/enums";
import { v4 as uuidv4 } from "uuid";

const cx = classNames.bind(styles);

function CategoryEdit() {
  const [loading, setLoading] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [formData, setFormData] = useState({
    orderId: null,
    customerName: null,
    customerPhone: null,
    address: null,
    shippingFee: 0,
    orderStatus: 1,
    items: [],
  });

  // Error messages
  const [formError, setFormError] = useState({
    customerName: null,
    customerPhone: null,
    address: null,
    shippingFee: null,
    orderStatus: 1,
  });

  const navigate = useNavigate();
  const { action, id } = useParams();

  useEffect(() => {
    setOrderStatuses(orderStatus.map((item) => ({ label: item.name, value: item.orderStatusId })));

    const getProductsData = async () => {
      try {
        const response = await productApi.getAll();
        const data = response.data.data;

        setProductOptions(
          data.map((product) => ({
            ...product,
            label: `${product.name} | ${product.type} | ${product.price}`,
            value: product.productId,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getProductsData();
  }, []);

  // ----- Handle input change -----
  const handleCustomerNameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      customerName: e.target.value,
    }));
  };

  const handleCustomerPhoneChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      customerPhone: e.target.value,
    }));
  };

  const handleAddressChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      address: e.target.value,
    }));
  };

  const handleShippingFeeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      shippingFee: e.target.value,
    }));
  };

  const handleOrderStatusChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      orderStatus: value,
    }));
  };

  const handleProductOptionChange = (value) => {
    console.log(value);
    setSelectedProductId(value);
  };

  const handleAddProduct = () => {
    if (selectedProductId) {
      const selectedProduct = productOptions.find((product) => product.productId === selectedProductId);

      if (selectedProduct) {
        if (formData.items.some((item) => item.productId === selectedProductId)) {
          // Case đã tồn tại sản phẩm trong giỏ hàng
          // Tăng số lượng của sản phẩm đã tồn tại
          const existProduct = formData.items.find((item) => item.productId === selectedProductId);
          existProduct.qty++;

          setFormData((prev) => ({
            ...prev,
            items: [...formData.items],
          }));
        } else {
          // Case chưa tồn tại sản phẩm trong giỏ hàng
          // Thêm sản phẩm mới vào giỏ
          selectedProduct.qty = 1;
          setFormData((prev) => ({
            ...prev,
            items: [...formData.items, selectedProduct],
          }));
        }
      }
    }
  };

  const handleRemoveProduct = (productId) => {
    if (productId) {
      setFormData((prev) => ({
        ...prev,
        items: formData.items.filter((item) => item.productId !== productId),
      }));
    }
  };

  const orderTotal = useMemo(() => {
    return (
      formData.items.reduce((prev, cur) => {
        return prev + cur.price * cur.qty;
      }, 0) + Number(formData.shippingFee)
    );
  }, [formData.items, formData.shippingFee]);
  // ----- End Handle input change -----

  // ----- Handle validate input -----
  const handleValidateCustomerName = () => {
    // return Validator({
    //   setErrorMessage: setCategoryNameError,
    //   rules: [Validator.isRequired(categoryName, "Vui lòng nhập tên danh mục")],
    // });

    return true;
  };

  const handleValidateCustomerPhone = () => {
    // return Validator({
    //   setErrorMessage: setCategoryNameError,
    //   rules: [Validator.isRequired(categoryName, "Vui lòng nhập tên danh mục")],
    // });

    return true;
  };

  const handleValidateAddress = () => {
    // return Validator({
    //   setErrorMessage: setCategoryNameError,
    //   rules: [Validator.isRequired(categoryName, "Vui lòng nhập tên danh mục")],
    // });

    return true;
  };

  const handleValidateShippingFee = () => {
    // return Validator({
    //   setErrorMessage: setCategoryNameError,
    //   rules: [Validator.isRequired(categoryName, "Vui lòng nhập tên danh mục")],
    // });

    return true;
  };

  const handleValidateOrderStatus = () => {
    // return Validator({
    //   setErrorMessage: setCategoryNameError,
    //   rules: [Validator.isRequired(categoryName, "Vui lòng nhập tên danh mục")],
    // });

    return true;
  };
  // ----- End handle validate input -----

  // ----- Handle create -----
  const generateData = async () => {
    return formData;
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (
      handleValidateCustomerName() &&
      handleValidateCustomerPhone() &&
      handleValidateAddress() &&
      handleValidateShippingFee() &&
      handleValidateOrderStatus()
    ) {
      setLoading(true);

      try {
        const data = await generateData();

        const response = await orderApi.create(data);

        console.log(response);

        setTimeout(() => {
          setLoading(false);
          navigate("/admin/orders");
        }, 400);
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    }
  };
  // ----- End Handle create -----

  // ----- Handle update -----
  useEffect(() => {
    const handleGetCategoryForUpdate = async () => {
      if (action === "update" && id) {
        try {
          const response = await orderApi.get(id);
          const order = response.data?.data ?? {};
          console.log(order);

          setFormData((prev) => ({
            ...prev,
            orderId: order.orderId,
            customerName: order.customerName,
            customerPhone: order.customerPhone,
            address: order.address,
            shippingFee: order.shippingFee,
            orderTotal: order.orderTotal,
            orderStatus: order.orderStatus,
            items: order.items,
          }));
        } catch (error) {
          console.warn(error);
        }
      }
    };
    handleGetCategoryForUpdate();
  }, [action, id]);

  // Update category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (
      action === "update" &&
      id &&
      handleValidateCustomerName() &&
      handleValidateCustomerPhone() &&
      handleValidateAddress() &&
      handleValidateShippingFee() &&
      handleValidateOrderStatus()
    ) {
      setLoading(true);

      try {
        const data = await generateData();

        const response = await orderApi.update(id, data);

        console.log(response);

        setTimeout(() => {
          setLoading(false);
          navigate("/admin/orders");
        }, 400);
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    }
  };
  // ----- End Handle update -----

  // ----- Handle delete -----
  const handleDeleteCategory = async (e) => {
    e.preventDefault();

    if (action === "update" && id) {
      setLoading(true);

      try {
        const response = await orderApi.delete(id);

        console.log(response);

        setTimeout(() => {
          setLoading(false);
          navigate("/admin/orders");
        }, 400);
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    }
  };
  // ----- End Handle delete -----

  return (
    <div>
      {/* ----- Page header ----- */}
      <div className={cx("d-flex", "pb-5", "align-items-center", "justify-space-between")}>
        <h1 className={cx("font-primary", "fw-700")}>Tạo đơn hàng</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin/orders"}>Đơn hàng</Link>,
              key: "orders",
            },
            { title: "Tạo đơn hàng", key: "order-create" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          {/* ----- Card ----- */}
          <div className={cx("card")}>
            {/* Card header */}
            <h4 className={cx("card-title", "pb-2")}>Thông tin đơn hàng</h4>
            {/* End card header */}

            <form>
              <div
                className={cx("form-group", {
                  error: formError.customerName,
                })}
              >
                <label className={cx("form-label", "pt-0", "pb-1")} htmlFor="">
                  Tên khách hàng
                </label>
                <Input
                  value={formData.customerName}
                  onChange={handleCustomerNameChange}
                  onBlur={handleValidateCustomerName}
                  placeholder="Nhập tên khách hàng"
                  status={formError.customerName && "error"}
                />
                <p className={cx("error-text")}>{formError.customerName}</p>
              </div>

              <div
                className={cx("form-group", {
                  error: formError.customerPhone,
                })}
              >
                <label className={cx("form-label", "pt-0", "pb-1")} htmlFor="">
                  Số điện thoại
                </label>
                <Input
                  value={formData.customerPhone}
                  onChange={handleCustomerPhoneChange}
                  onBlur={handleValidateCustomerPhone}
                  placeholder="Nhập số điện thoại"
                  status={formError.customerPhone && "error"}
                />
                <p className={cx("error-text")}>{formError.customerPhone}</p>
              </div>

              <div
                className={cx("form-group", {
                  error: formError.address,
                })}
              >
                <label className={cx("form-label", "pt-0", "pb-1")} htmlFor="">
                  Địa chỉ
                </label>
                <Input
                  value={formData.address}
                  onChange={handleAddressChange}
                  onBlur={handleValidateAddress}
                  placeholder="Nhập địa chỉ"
                  status={formError.address && "error"}
                />
                <p className={cx("error-text")}>{formError.address}</p>
              </div>

              <div
                className={cx("form-group", {
                  error: formError.shippingFee,
                })}
              >
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Phí vận chuyển
                </label>
                <Input
                  value={formData.shippingFee}
                  onChange={handleShippingFeeChange}
                  onBlur={handleValidateShippingFee}
                  type="number"
                  placeholder="Nhập phí vận chuyển"
                  status={formError.shippingFee && "error"}
                />
                <p className={cx("error-text")}>{formError.shippingFee}</p>
              </div>
            </form>
          </div>
          {/* ----- End card ----- */}

          {/* ----- Card ----- */}
          <div className={cx("card", "mt-4")}>
            {/* Card header */}
            <h4 className={cx("card-title", "pb-2")}>Sản phẩm</h4>
            {/* End card header */}

            <div className={cx("form-group")}>
              <label className={cx("form-label", "pt-0", "pb-1", "d-block")} htmlFor="">
                Chọn sản phẩm
              </label>

              <div className="d-flex">
                <Select
                  onChange={handleProductOptionChange}
                  value={selectedProductId}
                  className={cx("w-100", "me-4")}
                  options={productOptions}
                  placeholder="Chọn sản phẩm"
                />

                <Button onClick={handleAddProduct}>+ Thêm sản phẩm</Button>
              </div>
            </div>

            <div className={cx("w-100", "overflow-x-auto", "pt-4")}>
              <table className={cx("table", "table-hover", "bordered-header-only")}>
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Phân loại</th>
                    <th>Giá bán</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items?.map((item, index) => (
                    <tr className={cx("")} key={index}>
                      <td className={cx("py-2")}>
                        <img src={item?.image || images.placeholder} alt="" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td>
                        <Button
                          danger
                          onClick={() => {
                            handleRemoveProduct(item.productId);
                          }}
                        >
                          Xoá
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {formData.items.length === 0 && !loading && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>

            <h4 className={cx("card-title", "pt-5")}>Tổng tiền: {orderTotal} đ</h4>

            <div className={cx("pt-5")}>
              <Spin spinning={loading}>
                {action === "update" ? (
                  <>
                    <button onClick={handleUpdateCategory} className={cx("btn", "btn-modern", "btn-dark")}>
                      Cập nhật
                    </button>
                    <Popconfirm
                      title="Xoá danh mục"
                      description="Bạn có chắc chắn muốn xoá danh mục"
                      onConfirm={handleDeleteCategory}
                      okText="Đồng ý"
                      cancelText="Hủy"
                    >
                      <button onClick={(e) => e.preventDefault()} className={cx("btn", "btn-modern", "btn-warning")}>
                        Xoá
                      </button>
                    </Popconfirm>
                  </>
                ) : (
                  <button onClick={handleCreateCategory} className={cx("btn", "btn-modern", "btn-dark")}>
                    Tạo đơn hàng
                  </button>
                )}
                <Link to={"/admin/orders"} className={cx("btn", "btn-modern")}>
                  Huỷ
                </Link>
              </Spin>
            </div>
          </div>
          {/* ----- End card ----- */}
        </Col>
        <Col xs={24} md={8}>
          {/* ----- Card ----- */}
          <div className={cx("card")}>
            {/* Card header */}
            <div className={cx("pb-2")}>
              <h4 className={cx("fs-16", "fw-600", "font-primary")}>Trạng thái</h4>
            </div>
            {/* End card header */}

            <div className={cx("form-group")}>
              <Select
                onChange={handleOrderStatusChange}
                value={formData.orderStatus}
                className={cx("w-100", "me-4")}
                options={orderStatuses}
                placeholder="Chọn trạng thái"
              />
            </div>
          </div>
          {/* ----- End card ----- */}
        </Col>
      </Row>
    </div>
  );
}

export default CategoryEdit;
