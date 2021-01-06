import Socket from "../util/Socket";
import { billingEPs } from "../Config.json";

const { cartInsertEP, cartUpdateEP, cartDeleteEP, cartRetrieveEP, cartClearEP, orderPlaceEP, orderRetrieveEP } = billingEPs;

async function cartInsert(email, movieId, quantity) {
  const payLoad = {
    email: email,
    movie_id: movieId,
    quantity: quantity
  };
  return await Socket.POST(cartInsertEP, payLoad);
}

async function cartUpdate(email, movieId, quantity) {
  const payLoad = {
    email: email,
    movie_id: movieId,
    quantity: quantity
  };
  return await Socket.POST(cartUpdateEP, payLoad);
}

async function cartDelete(email, movieId) {
  const payLoad = {
    email: email,
    movie_id: movieId
  };
  return await Socket.POST(cartDeleteEP, payLoad);
}

async function cartRetrieve(email) {
  const payLoad = {
    email: email
  };
  console.log("in cart retrieve")
  return await Socket.POST(cartRetrieveEP, payLoad);
}

async function cartClear(email) {
  const payLoad = {
    email: email
  };
  return await Socket.POST(cartClearEP, payLoad);
}

async function orderPlace(email) {
  const payLoad = {
    email: email
  };
  return await Socket.POST(orderPlaceEP, payLoad);
}

async function orderRetrieve(email) {
  const payLoad = {
    email: email
  };
  return await Socket.POST(orderRetrieveEP, payLoad);
}

export default {
  cartInsert, cartUpdate, cartDelete, cartRetrieve, cartClear, orderPlace, orderRetrieve
};
