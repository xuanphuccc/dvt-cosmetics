import classNames from "classnames/bind";
import styles from "./CartDelivery.module.scss";
import icons from "@/assets/icons";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import mainLayoutSlide from "../../mainLayoutSlide";
import Select from "@/components/Select";
import { useEffect, useMemo, useState } from "react";
import { Checkbox, DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import cartSlice from "../cartSlice";
import shippingMethodApi from "@/api/shippingMethodApi";
import { cartSelector } from "@/redux/selector";
import currencyConvert from "@/services/currencyConvert";
import mapApi from "@/api/mapApi";
import orderApi from "@/api/orderApi";
import Validator from "@/validator/validator";

const cx = classNames.bind(styles);

function CartDelivery() {
  // Form inputs
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState({
    date: dayjs(Date.now()).add(1, "day"),
    dateString: dayjs(Date.now()).add(1, "day").format("YYYY-MM-DD"),
  });
  const [deliveryTime, setdeliveryTime] = useState({});
  const [addressOptions, setAddressOptions] = useState([]);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");

  // Error messages
  const [customerNameError, setCustomerNameError] = useState("");
  const [customerPhoneNumberError, setCustomerPhoneNumberError] = useState("");
  const [deliveryDateError, setDeliveryDateError] = useState("");
  const [deliveryTimeError, setdeliveryTimeError] = useState("");
  const [deliveryAddressError, setDeliveryAddressError] = useState("");

  // Default shipping method
  const [defaultShippingMethod, setDefaultShippingMethod] = useState({});

  // Global
  const dispatch = useDispatch();
  const cartInfor = useSelector(cartSelector);
  const navigate = useNavigate();

  // ----- Handle cart controls -----
  const handleCloseCart = () => {
    dispatch(mainLayoutSlide.actions.closeCart());
    dispatch(mainLayoutSlide.actions.openCartDetail());
  };

  const handleChangeStepToCart = () => {
    dispatch(mainLayoutSlide.actions.openCartDetail());
  };
  // ----- End handle cart controls -----

  // ----- Handle get default shipping method -----
  useEffect(() => {
    const handleGetDefaultShippingMethod = async () => {
      try {
        const response = await shippingMethodApi.getDefault();

        console.log(response.data);

        setDefaultShippingMethod(response.data?.data ?? {});
      } catch (error) {
        console.warn(error);
      }
    };

    handleGetDefaultShippingMethod();
  }, []);
  // ----- End handle get default shipping method -----

  // ----- Handle search address -----
  const handleSearchAddress = useMemo(() => {
    return debounce((value) => {
      if (value) {
        const getSearchAddress = async () => {
          try {
            const response = await mapApi.searchAutocomplete(value);

            setAddressOptions(
              response.data?.addresses?.map((item) => ({
                label: (item.placeLabel ? item.placeLabel + ", " : "") + item.formattedAddress,
                value: item,
              })),
            );
          } catch (error) {
            console.warn(error);
          }
        };
        getSearchAddress();
      }
    }, 400);
  }, []);
  // ----- End Handle search address -----

  // ----- Handle input change -----
  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);

    // Clear error
    setCustomerNameError("");
  };

  const handleCustomerPhoneNumberChange = (e) => {
    setCustomerPhoneNumber(e.target.value);

    // Clear error
    setCustomerPhoneNumberError("");
  };

  const handleDeliveryDateChange = (date, dateString) => {
    setDeliveryDate({
      date,
      dateString,
    });

    // Clear error
    setDeliveryDateError("");
  };

  const handleDeliveryTimeChange = (value) => {
    setdeliveryTime(value);

    // Clear error
    setdeliveryTimeError("");
  };

  const handleAddressInputChange = (value) => {
    // Search address
    handleSearchAddress(value);

    // Clear error
    setDeliveryAddressError("");

    // Clear selected address
    dispatch(cartSlice.actions.clearAddress());
  };

  const handleSelectAddressChange = async (value) => {
    if (value.value) {
      try {
        // Get distance
        const response = await mapApi.routeDistance({
          latitude: value.value.latitude,
          longitude: value.value.longitude,
        });

        const distance = response.data?.routes?.motorbike?.distance?.value / 1000 || 0;

        const data = {
          address: value.label,
          distance: distance,
          shippingCost: 0,
        };

        // ** Calculate shipping cost:
        // initCharge = 16.000 đ
        // initDistance = 2 km
        // additionalCharge = 5.500 đ (if distance > initDistance)
        // distance = 4 km
        // shippingCost = initCharge + (distance - initDistance) * additionalCharge
        // => shippingCost = 16.000 + (4 - 2) * 5.500
        if (data.distance > defaultShippingMethod.initialDistance) {
          data.shippingCost =
            defaultShippingMethod.initialCharge +
            (Math.ceil(data.distance) - defaultShippingMethod.initialDistance) * defaultShippingMethod.additionalCharge;
        } else {
          data.shippingCost = defaultShippingMethod.initialCharge;
        }

        // Save data to redux
        dispatch(cartSlice.actions.setDeliveryInfor(data));

        // Clear error
        setDeliveryAddressError("");
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const handleDeliveryNotesChange = (e) => {
    setDeliveryNotes(e.target.value);
  };

  const handleIsPresentChange = (e) => {
    setIsGift(e.target.checked);
  };

  const handleRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const handleRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };
  // ----- End handle input change -----

  // ----- Handle validate input -----
  const handleValidateCustomerName = () => {
    return Validator({
      setErrorMessage: setCustomerNameError,
      rules: [Validator.isRequired(customerName, "Vui lòng nhập tên người đặt")],
    });
  };

  const handleValidateCustomerPhone = () => {
    return Validator({
      setErrorMessage: setCustomerPhoneNumberError,
      rules: [Validator.isRequired(customerPhoneNumber, "Vui lòng nhập số điện thoại")],
    });
  };

  const handleValidateDeliveryDate = () => {
    return Validator({
      setErrorMessage: setDeliveryDateError,
      rules: [Validator.isRequired(deliveryDate.dateString, "Vui lòng chọn ngày giao")],
    });
  };

  const handleValidateDeliveryTime = () => {
    return Validator({
      setErrorMessage: setdeliveryTimeError,
      rules: [Validator.isRequired(deliveryTime.value, "Vui lòng chọn khung giờ giao")],
    });
  };

  const handleValidateDeliveryAddress = () => {
    return Validator({
      setErrorMessage: setDeliveryAddressError,
      rules: [Validator.isRequired(cartInfor.address, "Vui lòng chọn địa chỉ")],
    });
  };
  // ----- End handle validate input -----

  // ----- Handle order -----
  const handleOrder = async () => {
    const data = {
      customerName: customerName,
      customerPhoneNumber: customerPhoneNumber,
      deliveryDate: deliveryDate.dateString,
      deliveryTime: deliveryTime.value,
      address: cartInfor.address,
      distance: cartInfor.distance,
      deliveryNotes: deliveryNotes,
      isGift: isGift,
      recipientName: isGift ? recipientName : customerName,
      recipientPhoneNumber: isGift ? recipientPhoneNumber : customerPhoneNumber,
      items: cartInfor.items,
    };

    // Create order
    if (
      handleValidateCustomerName() &&
      handleValidateCustomerPhone() &&
      handleValidateDeliveryDate() &&
      handleValidateDeliveryTime() &&
      handleValidateDeliveryAddress() &&
      data.distance >= 0 &&
      data.items?.length > 0
    ) {
      try {
        const response = await orderApi.create(data);

        console.log(response.data);

        // Save delivery information to redux
        dispatch(cartSlice.actions.setDeliveryInfor(data));

        // Close cart
        dispatch(mainLayoutSlide.actions.closeCart());
        dispatch(mainLayoutSlide.actions.openCartDetail());

        // Nagigate to order confirm
        navigate("/confirm");
      } catch (error) {
        console.warn(error);
      }
    }
  };
  // ----- Handle order -----

  return (
    <div className={cx("w-100", "d-flex", "flex-column")}>
      {/* ----- Header ----- */}
      <div className={cx("px-4", "px-sm-32", "py-4", "d-flex", "justify-space-between", "align-items-center")}>
        <h2 className={cx("font-secondary", "fw-200", "fs-36", "text-italic")}>Giao hàng</h2>
        <img onClick={handleCloseCart} className={cx("cursor-pointer")} src={icons.times} alt="" />
      </div>
      {/* ----- End Header ----- */}

      {/* ----- Delivery form ----- */}
      <div className={cx("px-4", "px-sm-32", "pb-32", "scroll-y")}>
        <div className={cx("form-group", { error: customerNameError })}>
          <label className={cx("form-label")} htmlFor="name">
            Tên người đặt
          </label>
          <input
            value={customerName}
            onChange={handleCustomerNameChange}
            onBlur={handleValidateCustomerName}
            id="name"
            className={cx("form-control", "w-100")}
            type="text"
          />
          <p className="error-text">{customerNameError}</p>
        </div>

        <div
          className={cx("form-group", {
            error: customerPhoneNumberError,
          })}
        >
          <label className={cx("form-label")} htmlFor="phone">
            Số điện thoại người đặt
          </label>
          <input
            value={customerPhoneNumber}
            onChange={handleCustomerPhoneNumberChange}
            onBlur={handleValidateCustomerPhone}
            id="phone"
            className={cx("form-control", "w-100")}
            type="text"
          />
          <p className="error-text">{customerPhoneNumberError}</p>
          <p className={cx("fs-12", "font-primary", "pt-1")}>
            Vui lòng điền chính xác số điện thoại để LaFuong liên hệ xác nhận đơn hàng.
          </p>
        </div>

        <div className={cx("form-group", { error: deliveryDateError })}>
          <label className={cx("form-label")} htmlFor="phone">
            Ngày giao
          </label>
          <div className={cx("form-control-group")} style={{ padding: "0px 6px" }}>
            <DatePicker
              value={deliveryDate.date}
              onChange={handleDeliveryDateChange}
              onBlur={handleValidateDeliveryDate}
              format={"YYYY-MM-DD"}
              className={cx("date-picker")}
              size="large"
              bordered={false}
              placeholder="Chọn ngày giao"
            />
          </div>
          <p className="error-text">{deliveryDateError}</p>
          <p className={cx("fs-12", "font-primary", "pt-1")}>
            Nếu cần đặt bánh gấp trong ngày, xin liên hệ hotline: 090 786 0330
          </p>
        </div>

        <div className={cx("form-group", { error: deliveryTimeError })}>
          <label className={cx("form-label")} htmlFor="">
            Khung giờ giao
          </label>

          <Select
            value={deliveryTime}
            onChange={handleDeliveryTimeChange}
            onBlur={handleValidateDeliveryTime}
            options={[
              { label: "11h15 - 13h00", value: "11h15 - 13h00" },
              { label: "13h00 - 15h00", value: "13h00 - 15h00" },
              { label: "15h00 - 17h00", value: "15h00 - 17h00" },
              { label: "18h00 - 20h00", value: "18h00 - 20h00" },
            ]}
            placeholder="Chọn khung giờ giao"
            readOnly={true}
          />
          <p className="error-text">{deliveryTimeError}</p>
        </div>

        <div
          className={cx("form-group", {
            error: deliveryAddressError,
          })}
        >
          <label className={cx("form-label")} htmlFor="address">
            Giao tới địa chỉ
          </label>
          <Select
            onChange={handleSelectAddressChange}
            onSearch={handleAddressInputChange}
            onBlur={handleValidateDeliveryAddress}
            options={addressOptions}
            placeholder="Nhập địa chỉ giao hàng"
            icon={<Unicons.UilSearch size="20" />}
          />
          <p className="error-text">{deliveryAddressError}</p>
        </div>

        <div className={cx("form-group")}>
          <label className={cx("form-label")} htmlFor="note">
            Ghi chú giao hàng (tuỳ chọn)
          </label>
          <input
            value={deliveryNotes}
            onChange={handleDeliveryNotesChange}
            id="note"
            className={cx("form-control", "w-100")}
            type="text"
            placeholder="Ghi chú toà, đường,..."
          />
        </div>

        {/* Is present input */}
        <div className={cx("form-group", "pt-2", "pb-2")}>
          <Checkbox checked={isGift} onChange={handleIsPresentChange} id="checkbox" />
          <label className={cx("form-label", "ms-2")} htmlFor="checkbox">
            Bạn muốn tặng bánh cho người khác?
          </label>
        </div>
        {/* End Is present input */}

        {isGift && (
          <div>
            <div className={cx("form-group")}>
              <label className={cx("form-label")} htmlFor="receiverName">
                Tên người nhận
              </label>
              <input
                value={recipientName}
                onChange={handleRecipientNameChange}
                id="receiverName"
                className={cx("form-control", "w-100")}
                type="text"
              />
            </div>

            <div className={cx("form-group")}>
              <label className={cx("form-label")} htmlFor="receiverPhone">
                Số điện thoại người nhận
              </label>
              <input
                value={recipientPhoneNumber}
                onChange={handleRecipientPhoneNumberChange}
                id="receiverPhone"
                className={cx("form-control", "w-100")}
                type="text"
              />
            </div>
          </div>
        )}
      </div>
      {/* ----- End Delivery form ----- */}

      {/* ----- Total and order ----- */}
      <div className={cx("px-4", "px-sm-32", "pt-2", "pb-5", "border-top", "mt-auto")}>
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "pt-2", "pb-0")}>
          <span className={cx("fs-14", "font-primary", "fw-600", "text-uppercase")}>Tổng tiền sản phẩm</span>
          <span className={cx("font-primary", "fs-16")}>{currencyConvert(cartInfor.itemsTotal)}</span>
        </div>
        <div className={cx("d-flex", "justify-space-between", "align-items-center", "pt-2")}>
          <span className={cx("fs-14", "font-primary", "fw-600", "text-uppercase")}>
            Phí vận chuyển {cartInfor.distance > 0 && cartInfor.distance?.toFixed(2) + "km"}
          </span>
          <span className={cx("font-primary", "fs-16")}>
            {cartInfor.shippingCost ? currencyConvert(cartInfor.shippingCost) : "Tính phí vận chuyển"}
          </span>
        </div>

        {cartInfor.shippingCost ? (
          <div className={cx("d-flex", "justify-space-between", "align-items-center", "pt-2", "pb-0")}>
            <span className={cx("fs-14", "font-primary", "fw-600", "text-uppercase")}>Tổng cộng</span>
            <span className={cx("font-primary", "fs-16")}>
              {currencyConvert(cartInfor.itemsTotal + cartInfor.shippingCost)}
            </span>
          </div>
        ) : (
          false
        )}

        <div className={cx("w-100", "d-flex", "align-items-center", "pt-4")}>
          <button onClick={handleChangeStepToCart} className={cx("btn", "btn-icon")}>
            <img src={icons.arrowLeft} alt="" />
          </button>
          <button onClick={handleOrder} className={cx("btn", "btn-dark", "w-100")}>
            Đặt hàng
          </button>
        </div>
      </div>
      {/* ----- End Total and order ----- */}
    </div>
  );
}

export default CartDelivery;
