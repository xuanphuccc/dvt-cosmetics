import classNames from "classnames/bind";
import styles from "./ProductEdit.module.scss";
import { Breadcrumb, Button, Col, Image, Input, Row, Spin, Popconfirm } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import TextEditor from "@/components/TextEditor";
import images from "@/assets/images";
import { useEffect, useRef, useState } from "react";
import productApi from "@/api/productApi";
import { uploadFile } from "@/firebase/service";
import Validator from "@/validator/validator";

const cx = classNames.bind(styles);

function ProductEdit() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productId: null,
    name: null,
    description: null,
    image: null,
    qty: null,
    price: null,
    costPrice: null,
    type: null,
  });

  // Error messages
  const [formError, setFormError] = useState({
    name: null,
    qty: null,
    price: null,
    costPrice: null,
  });

  const inputImageRef = useRef();
  const navigate = useNavigate();
  const { action, id } = useParams();

  // ----- Handle input change -----
  const handleProductNameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleProductDescChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const handlePriceChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      price: e.target.value,
    }));
  };

  const handleCostPriceChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      costPrice: e.target.value,
    }));
  };

  const handleQtyChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      qty: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
        productImgPreview: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };
  // ----- End Handle input change -----

  // ----- Handle validate input -----
  const handleValidateProductName = () => {
    // return Validator({
    //   setErrorMessage: setProductNameError,
    //   rules: [Validator.isRequired(productName, "Vui lòng nhập tên sản phẩm")],
    // });

    return true;
  };

  const handleValidateQty = () => {
    // return Validator({
    //   setErrorMessage: setProductNameError,
    //   rules: [Validator.isRequired(productName, "Vui lòng nhập tên sản phẩm")],
    // });

    return true;
  };

  const handleValidatePrice = () => {
    // return Validator({
    //   setErrorMessage: setProductNameError,
    //   rules: [Validator.isRequired(productName, "Vui lòng nhập tên sản phẩm")],
    // });

    return true;
  };

  const handleValidateCostPrice = () => {
    // return Validator({
    //   setErrorMessage: setProductNameError,
    //   rules: [Validator.isRequired(productName, "Vui lòng nhập tên sản phẩm")],
    // });

    return true;
  };
  // ----- End handle validate input -----

  // ----- Handle create -----
  const generateData = async () => {
    if (formData.image && typeof formData.image != "string") {
      // Upload image and get image url
      const uploadedImage = await uploadFile(formData.image, "images/categories");
      formData.image = uploadedImage.url;
    }

    return formData;
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    console.log(await generateData());
    if (handleValidateProductName() && handleValidateQty() && handleValidatePrice() && handleValidateCostPrice()) {
      setLoading(true);
      try {
        const data = await generateData();
        const response = await productApi.create(data);
        console.log(response);

        setTimeout(() => {
          setLoading(false);
          navigate("/admin/products");
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
    const handleGetProductForUpdate = async () => {
      if (action === "update" && id) {
        try {
          const response = await productApi.get(id);
          const product = response.data?.data ?? {};
          console.log(product);

          setFormData((prev) => ({
            ...prev,
            name: product.name,
            description: product.description,
            image: product.image,
            productImgPreview: product.image,
            qty: product.qty,
            price: product.price,
            costPrice: product.costPrice,
            type: product.type,
            hasOrders: product.hasOrders,
          }));
        } catch (error) {
          console.warn(error);
        }
      }
    };

    handleGetProductForUpdate();
  }, [action, id]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (
      action === "update" &&
      id &&
      handleValidateProductName() &&
      handleValidateQty() &&
      handleValidatePrice() &&
      handleValidateCostPrice()
    ) {
      setLoading(true);
      try {
        const data = await generateData();
        const response = await productApi.update(id, data);
        console.log("response: ", response);

        setTimeout(() => {
          setLoading(false);
          navigate("/admin/products");
        }, 400);
      } catch (error) {
        console.warn(error);
        setLoading(false);
      }
    }
  };
  // ----- End Handle update -----

  // ----- Handle delete -----
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    if (action === "update" && id) {
      setLoading(true);
      try {
        const response = await productApi.delete(id);
        console.log("response: ", response);

        setTimeout(() => {
          setLoading(false);
          navigate("/admin/products");
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
        <h1 className={cx("font-primary", "fw-700")}>Tạo Sản phẩm</h1>
        <Breadcrumb
          className={cx("d-none", "d-md-block")}
          items={[
            {
              title: <Link to={"/admin/products"}>Sản phẩm</Link>,
              key: "categories",
            },
            { title: "Tạo sản phẩm", key: "category-create" },
          ]}
        />
      </div>
      {/* ----- Page header ----- */}

      <form className={cx("w-100")}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            {/* ----- Card ----- */}
            <div className={cx("card")}>
              {/* Card header */}
              <h4 className={cx("card-title", "pb-2")}>Sản phẩm</h4>
              {/* End card header */}

              <div
                className={cx("form-group", {
                  error: formError.name,
                })}
              >
                <label className={cx("form-label", "pt-0", "pb-1")} htmlFor="">
                  Tên sản phẩm <span className={cx("required-mark")}>*</span>
                </label>
                <Input
                  value={formData.name}
                  onChange={handleProductNameChange}
                  onBlur={handleValidateProductName}
                  placeholder="Nhập tên sản phẩm"
                  status={formError.name && "error"}
                />
                <p className={cx("error-text")}>{formError.name}</p>
              </div>

              <div className={cx("form-group")}>
                <label className={cx("form-label", "pt-0", "pb-1")} htmlFor="">
                  Loại sản phẩm <span className={cx("required-mark")}>*</span>
                </label>
                <Input
                  value={formData.type}
                  onChange={handleTypeChange}
                  onBlur={() => {}}
                  placeholder="Nhập loại sản phẩm"
                  status={"" && "error"}
                />
                <p className={cx("error-text")}>{}</p>
              </div>

              <Row gutter={[16]}>
                <Col span={12}>
                  <div
                    className={cx("form-group", {
                      error: formError.price,
                    })}
                  >
                    <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                      Giá bán <span className={cx("required-mark")}>*</span>
                    </label>
                    <Input
                      value={formData.price}
                      onChange={handlePriceChange}
                      onBlur={handleValidatePrice}
                      type="number"
                      placeholder="Nhập giá bán"
                      status={formError.price && "error"}
                    />
                    <p className={cx("error-text")}>{formError.price}</p>
                  </div>
                </Col>

                <Col span={12}>
                  <div
                    className={cx("form-group", {
                      error: formError.costPrice,
                    })}
                  >
                    <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                      Giá nhập <span className={cx("required-mark")}>*</span>
                    </label>
                    <Input
                      value={formData.costPrice}
                      onChange={handleCostPriceChange}
                      onBlur={handleValidateCostPrice}
                      type="number"
                      placeholder="Nhập giá nhập"
                      status={formError.costPrice && "error"}
                    />
                    <p className={cx("error-text")}>{formError.costPrice}</p>
                  </div>
                </Col>
              </Row>

              <div
                className={cx("form-group", {
                  error: formError.qty,
                })}
              >
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Số lượng <span className={cx("required-mark")}>*</span>
                </label>
                <Input
                  value={formData.qty}
                  onChange={handleQtyChange}
                  onBlur={handleValidateQty}
                  type="number"
                  placeholder="Nhập số lượng"
                  status={formError.qty && "error"}
                />
                <p className={cx("error-text")}>{formError.qty}</p>
              </div>

              <div className={cx("form-group")}>
                <label className={cx("form-label", "pt-2", "pb-1")} htmlFor="">
                  Mô tả
                </label>
                <TextEditor onChange={handleProductDescChange} editorState={formData.description} height={200} />
              </div>

              <div className={cx("pt-5")}>
                <Spin spinning={loading}>
                  {action === "update" ? (
                    <>
                      <button onClick={handleUpdateProduct} className={cx("btn", "btn-modern", "btn-dark")}>
                        Cập nhật
                      </button>
                      <Popconfirm
                        title="Xoá sản phẩm"
                        description="Bạn có chắc chắn muốn xoá sản phẩm"
                        onConfirm={handleDeleteProduct}
                        okText="Đồng ý"
                        cancelText="Hủy"
                        disabled={formData.hasOrders}
                      >
                        <button
                          disabled={formData.hasOrders}
                          onClick={(e) => e.preventDefault()}
                          className={cx("btn", "btn-modern", "btn-warning")}
                        >
                          Xoá
                        </button>
                      </Popconfirm>
                    </>
                  ) : (
                    <button onClick={handleCreateProduct} className={cx("btn", "btn-modern", "btn-dark")}>
                      Tạo sản phẩm
                    </button>
                  )}
                  <Link to={"/admin/products"} className={cx("btn", "btn-modern")}>
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
              <h4 className={cx("card-title", "pb-2")}>Ảnh sản phẩm</h4>
              {/* End card header */}

              <div className={cx("form-group")}>
                <input
                  onChange={handleImageChange}
                  ref={inputImageRef}
                  type="file"
                  multiple
                  accept="image/png, image/gif, image/jpeg"
                  name=""
                  id=""
                  hidden
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    if (inputImageRef.current) {
                      inputImageRef.current.click();
                    }
                  }}
                  icon={<Unicons.UilUpload size="14" />}
                >
                  <span className={cx("ps-2")}>Tải ảnh lên</span>
                </Button>

                <p className={cx("error-text")}>{}</p>

                {/* Products images preview */}
                <div className={cx("mt-4")}>
                  <Image src={formData.productImgPreview || images.placeholder} className={cx("product-img")} />
                </div>
                {/* End Products images preview */}
              </div>
            </div>
            {/* ----- End card ----- */}
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default ProductEdit;
