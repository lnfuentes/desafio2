import { cartModel } from "../models/cart.js";

const cartsModel = cartModel;

class CartsManager {
  getCarts(a) {
    if (a === undefined) {
      return cartsModel.find();
    }
    return cartsModel.find().limit(a);
  }

  getCartById(id) {
    return cartsModel.find({ _id: id });
  }

  addCart(arr) {
    return cartsModel.create(arr);
  }

  async updateCartProducts(cid, pid) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const newProd = { product: pid, quantity: 1 };
    const Nproducts = cart[0].products;

    Nproducts.forEach((element, index) => {
      if (pid === element.product._id.toJSON()) {
        ind = index;
      }
    });

    if (!isNaN(ind)) {
      Nproducts[ind].quantity++;
    } else {
      Nproducts.push(newProd);
    }

    const result = cartsModel
      .find({ _id: cid })
      .updateMany({ products: Nproducts });
    return result;
  }

  deleteCart(id) {
    return cartsModel.deleteOne({ _id: id });
  }

  async deleteCartProduct(cid, pid) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const Nproducts = cart[0].products;
    Nproducts.forEach((element, index) => {
      if (pid === element.product._id.toJSON()) {
        ind = index;
      }
    });

    if (!isNaN(ind)) {
      Nproducts.splice(ind, 1);
      const result = cartsModel
        .find({ _id: cid })
        .updateMany({ products: Nproducts });
      return result;
    }
  }

  updateCart(cid, products) {
    const result = cartsModel
      .find({ _id: cid })
      .updateMany({ products: products });
    return result;
  }

  async updateProductQuantity(cid, pid, qty) {
    let ind;
    const cart = await cartsModel.find({ _id: cid });
    const Nproducts = cart[0].products;
    Nproducts.forEach((element, index) => {
      if (pid === element.product._id.toJSON()) {
        ind = index;
      }
    });

    if (!isNaN(ind)) {
      Nproducts[ind].quantity = qty.quantity;
      const result = cartsModel
        .find({ _id: cid })
        .updateMany({ products: Nproducts });
      return result;
    }
  }

  deleteCartProducts(cid) {
    const result = cartsModel.find({ _id: cid }).updateMany({ products: [] });
    return result;
  }
}

export default { CartsManager };
