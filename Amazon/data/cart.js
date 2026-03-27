import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity; 
  });
  if (cartQuantity != 0){
    document.querySelector('.js-cartQuantity').innerHTML = cartQuantity;
  }else{
    document.querySelector('.js-cartQuantity').innerHTML = " ";
  }
}

export function removeCart(productId){
    const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem)
        }
    });

    cart = newCart;

    saveToStorage();
}

export function getCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (!matchingItem) {
    console.warn("No cart item found for productId:", productId);
    return;
  }

  matchingItem.deliveryOptionId = Number(deliveryOptionId); // keep IDs consistent
  saveToStorage(cart);
  
}
