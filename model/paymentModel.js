import {Payments,Properties,Customers }from "../db/db.js"

export function getAllPayments(){
    return Payments;
}

export function getAllProperties() {
    return Properties;
}

export function getAllCustomers() {
    return Customers;
}