class Cart {
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage(localStorageKey) {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
        this.addToCart(); 
    }

    addToCart(productId, quantity = 1) {
        const matchingItem = this.cartItem.find(item => item.productId === productId);

        if (matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItem.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: 2
            });
        }

        this.saveToStorage();
        this.updateCartQuantity();
    }

    updateCartQuantity() {
        const cartQuantity = this.cartItem.reduce((sum, item) => sum + item.quantity, 0);
        const el = document.querySelector('.js-cartQuantity');

        if (el) {
            el.innerHTML = cartQuantity || "0";
        }
    }

    removeCart(productId) {
        this.cartItem = this.cartItem.filter(item => item.productId !== productId);
        this.saveToStorage();
        this.updateCartQuantity();
    }

    getCartQuantity() {
        return this.cartItem.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        const matchingItem = this.cartItem.find(item => item.productId === productId);

        if (!matchingItem) {
            console.warn("No cart item found for productId:", productId);
            return;
        }

        matchingItem.deliveryOptionId = Number(deliveryOptionId);
        this.saveToStorage();

    }
}

const cart = new Cart('cart-oop');
console.log(cart);