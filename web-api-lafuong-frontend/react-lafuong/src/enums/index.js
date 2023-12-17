const orderStatusEnum = {
  /// <summary>
  /// Đã tạo đơn hàng
  /// </summary>
  CREATED: 1,

  /// <summary>
  /// Đang vận chuyển
  /// </summary>
  DELIVERY: 2,

  /// <summary>
  /// Đã hoàn thành
  /// </summary>
  COMPLETED: 3,

  /// <summary>
  /// Đã huỷ đơn hàng
  /// </summary>
  CANCELLED: 4,
};

const orderStatus = [
  {
    orderStatusId: 1,
    name: "Đã tạo đơn hàng",
    step: 0,
    color: "orange",
  },
  {
    orderStatusId: 2,
    name: "Đang vận chuyển",
    step: 1,
    color: "blue",
  },
  {
    orderStatusId: 3,
    name: "Đã hoàn thành",
    step: 2,
    color: "cyan",
  },
  {
    orderStatusId: 4,
    name: "Đã huỷ đơn hàng",
    step: -1,
    color: "default",
  },
];

export { orderStatus, orderStatusEnum };
