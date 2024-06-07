import { Properties,Agents } from "../db/db.js";

export function getAllProperties() {
    return Properties;
}

export function getAllAgents() {
    return Agents;
}

export function addProperty(proId,ageId,type,proAddress,price,perches,status) {
  const newProperty = {
    proId: proId,
    ageId: ageId,
    type: type,
    proAddress: proAddress,
    price: price,
    perches: perches,
    status: status,
  };
  Properties.push(newProperty);
}

export function updateProperty(index, updatedProperty) {
  Properties[index] = updatedProperty;
}

export function deleteProperty(index) {
  Properties.splice(index, 1);
}

export function validateProperty(property) {
  const proIdPattern = /^P\d{3}$/;
  const ageIdPattern = /^S\d{3}$/;
  const addressPattern = /^[A-Za-z0-9\s,.'-]+$/;
  const pricePattern = /^\d{5}$/;
  const perchesPattern = /^\d{2}$/;

  const isProIdValid = proIdPattern.test(property.proId);
  const isAgeIdValid = ageIdPattern.test(property.ageId);
  const isAddressValid = addressPattern.test(property.proAddress);
  const isPriceValid = pricePattern.test(property.price);
  const isPerchValid = perchesPattern.test(property.perches);

  if (!isProIdValid) {
    alert("Invalid Property ID");
    return false;
  }

  if (!isAgeIdValid) {
    alert("Invalid Supplier ID");
    return false;
  }

  if (!isAddressValid) {
    alert("Invalid Address");
    return false;
  }

  if (!isPriceValid) {
    alert("Invalid Price");
    return false;
  }

  if (!isPerchValid) {
    alert("Invalid Perches");
    return false;
  }

  return true;
}
