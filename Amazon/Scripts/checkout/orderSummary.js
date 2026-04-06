import {cart, removeCart, saveToStorage} from '../../data/cart.js';
import {products} from '../../data/products.js';
import { getCartQuantity, updateDeliveryOption } from '../../data/cart.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions,getDeliveryOption } from '../../data/deliveryoptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

saveToStorage(cart);
export function renderOrderSummary(){
let cartSummaryHTML ='';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchinProduct = products.find(product => product.id === productId);
    const selectedOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId) || deliveryOptions[0];

    const today = dayjs();
    const deliveryDate = today.add(selectedOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=
    `<div class="cart-item-container js-cart-item-container-${matchinProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchinProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">${matchinProduct.name}</div>
                <div class="product-price">₹${matchinProduct.price}</div>
                <div class="product-quantity">
                    <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                    <span class="update-quantity-link link-primary js-update" data-product-id="${matchinProduct.id}">Update</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchinProduct.id}">Delete</span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">Choose a delivery option:</div>
                ${deliveryOptionsHTML(matchinProduct, cartItem)}
            </div>
        </div>
    </div>`;
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


    document.querySelectorAll('.delivery-option-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = e.target.dataset.productId;
            const selectedOptionId = Number(e.target.value);
            updateDeliveryOption(productId, selectedOptionId);    

            const cartItem = cart.find(item => item.productId === productId);
            if (!cartItem) return;

            cartItem.deliveryOptionId = Number(selectedOptionId);
            saveToStorage(cart);

            const selectedOption = deliveryOptions.find(option => option.id === selectedOptionId);
            if (!selectedOption) return;

            const today = dayjs();
            const newDeliveryDate = today.add(selectedOption.deliveryDays, 'days');
            const newDateString = newDeliveryDate.format('dddd, MMMM D');

            const deliveryDateDiv = document.querySelector(`.js-cart-item-container-${productId} .delivery-date`);
            if (deliveryDateDiv) {
                deliveryDateDiv.textContent = `Delivery date: ${newDateString}`;
            }
        });
    });

    let totalPrice = 0;
    let Quantity = 0;

    const hasPaidShipping = cart.some(item => {
    const option = deliveryOptions.find(o => o.id === Number(item.deliveryOptionId));
    return option && option.price > 0;
    });

    let shipping;
    shipping = hasPaidShipping ? 49 : 0;

    cart.forEach((cartItem) => {
        const matchingProduct = products.find(p => p.id === cartItem.productId);
        if (!matchingProduct) return;

        totalPrice += matchingProduct.price * cartItem.quantity;
        Quantity += cartItem.quantity;
    });

    const tax = (totalPrice + shipping) * 0.1;

    let orderSummaryHTML = `
    <div class="payment-summary">
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
        <div>Items (${Quantity}):</div>
        <div class="payment-summary-money">₹${totalPrice}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipping">₹${shipping}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">₹${totalPrice + shipping}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">₹${tax.toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">₹${(totalPrice + shipping + tax).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    </div>`;

    document.querySelector('.js-payment-summary').innerHTML = orderSummaryHTML;

    let updateTop = document.querySelector('.js-cartQuantity-top');
    if (updateTop){
        updateTop.innerHTML = `${getCartQuantity()} Items`;
    }
    document.querySelectorAll('.js-delete-link').forEach((link) => {
        link.addEventListener('click',() => {
            const productId = link.dataset.productId;
            console.log("Before:", getCartQuantity());
            removeCart(productId);
            console.log("Before:", getCartQuantity());

            updateTop = document.querySelector('.js-cartQuantity-top');
            if(updateTop){
                updateTop.innerHTML = `${getCartQuantity()} Items`;
            }
            const firstChild = document.querySelector('.payment-summary-row div:first-child');
            if (firstChild) {
                firstChild.innerHTML = `Items (${getCartQuantity()})`;
            }
            
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            console.log(container);
            container.remove();
            renderPaymentSummary();
            
        })
    });
    document.querySelectorAll('.js-update').forEach((alias) => {
        alias.addEventListener('click',() => {
            let productId = alias.dataset.productId;
            let cartItem = cart.find(item => item.productId === productId);
            cartItem.quantity += 1;
            saveToStorage(cart);
            renderPaymentSummary();

            const quantityLabel = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`);
            if (quantityLabel) {
                quantityLabel.textContent = cartItem.quantity;
            }
            saveToStorage(cart);
            updateTop = document.querySelector('.js-cartQuantity-top');
            if(updateTop){
                updateTop.innerHTML = `${getCartQuantity()} Items`;
            }
            const firstChild = document.querySelector('.payment-summary-row div:first-child');
            if (firstChild) {
                firstChild.innerHTML = `Items (${getCartQuantity()})`;
            }
        })
    });


    function deliveryOptionsHTML(matchingProduct, cartItem) {
    let HTML = '';
    deliveryOptions.forEach((deliveryOption, index) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const PriceString = deliveryOption.price === 0 ? 'FREE' : `₹${deliveryOption.price}`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId

        HTML += `
        <div class="delivery-option js-delivery-option">
            <input type="radio"
            name="delivery-option-${matchingProduct.id}"
            value="${deliveryOption.id}"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id ="${deliveryOption.id}"
            class="delivery-option-input"
            ${isChecked ? 'checked' : ''}>
            <label for="delivery-option-${matchingProduct.id}-${deliveryOption.id}">
            <div class="delivery-option-date">
                ${dateString}
            </div>
            <div class="delivery-option-price">
                ${PriceString} - Shipping
            </div>
            </label>
        </div>`;
    });
    return HTML;
    }
    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId)
        });
    });
}