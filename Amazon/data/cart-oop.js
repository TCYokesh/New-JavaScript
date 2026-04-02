import { products } from "./products.js";


export const cartObj = {
    cart: JSON.parse(localStorage.getItem('cart-oop')) || [],
    saveToStorage(){
        localStorage.setItem('cart-oop',JSON.stringify(this.cart));
    },
    updateCartQuantity(){
        let cartQuantity = 0;
        this.cart.forEach((item) => {
            cartQuantity += item.quantity; 
        });
        if (cartQuantity != 0){
            document.querySelector('.js-cartQuantity').innerHTML = cartQuantity;
        }else{
            document.querySelector('.js-cartQuantity').innerHTML = " ";
        }
    },
    removeCart(productId){
        const newCart = [];
        
        this.cart.forEach((cartItem) => {
            if(cartItem.productId !== productId){
                newCart.push(cartItem)
            }
        });
        this.cart = newCart;
        this.saveToStorage();
    },
    getCartQuantity() {
        let cartQuantity = 0;

        this.cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        return cartQuantity;
    },
    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem = this.cart.find(item => item.productId === productId);

        if (!matchingItem) {
            console.warn("No cart item found for productId:", productId);
            return;
        }

        matchingItem.deliveryOptionId = Number(deliveryOptionId);
        this.saveToStorage();

    }
};
