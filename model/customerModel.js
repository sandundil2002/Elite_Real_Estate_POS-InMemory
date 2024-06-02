import { Customers } from "../db/db.js";

export function getAllCustomer() {
  return Customers;
}

export function addCustomer(cusId,appId,cusName,cusAddress,cusMobile,cusEmail) {
  const newCustomer = {
    cusId: cusId,
    appId:appId,
    cusName:cusName,
    cusAddress: cusAddress,
    cusMobile:cusMobile,
    cusEmail: cusEmail
};
  Customers.push(newCustomer);
}
