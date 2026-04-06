import { cart, saveToStorage, updateCartQuantity, addToCart } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryoptions.js";
import {products} from '../data/products.js';
 
updateCartQuantity();

let productsHTML = ''

products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
            
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ₹${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
  });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;
    updateCartQuantity();
    document.querySelectorAll('select').forEach((select) => {
      select.value = "1";
    });
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;

          let productContainer = button.closest('.product-container');
          const quantitySelector = productContainer.querySelector(`[class^="js-quantity-selector-"]`);
          const quantity = Number(quantitySelector.value);
          addToCart(productId,quantity);
          productContainer = button.closest('.product-container');
          const addedMessage = productContainer.querySelector('.added-to-cart');
          if (addedMessage) {
              addedMessage.style.opacity = '1';

            setTimeout(() => {
              addedMessage.style.opacity = '0';
            }, 2000);
          }
        });
    });