import { orderStatus } from "@/enums";

const renderOrderStatus = (orderStatusId) => {
  const result = orderStatus.find((os) => os.orderStatusId === orderStatusId);

  return result;
};

export default renderOrderStatus;
