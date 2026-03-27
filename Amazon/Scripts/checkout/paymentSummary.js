import { cart, updateDeliveryOption, getCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryoptions.js";

export function renderPaymentSummary() {

    function calculateTotals() {
        let totalPrice = 0;
        let totalQuantity = 0;
        let shipping = 0;

        cart.forEach(cartItem => {
            const product = getProduct(cartItem.productId);
            totalPrice += product.price * cartItem.quantity;
            totalQuantity += cartItem.quantity;

            const option = getDeliveryOption(cartItem.deliveryOptionId);
            if (option && option.price > 0) {
                shipping += option.price; // add per product
            }
        });

        const tax = (totalPrice + shipping) * 0.1;

        return { totalPrice, shipping, tax, totalQuantity };
    }

    function renderSummaryHTML() {
        const { totalPrice, shipping, tax, totalQuantity } = calculateTotals();

        const paymentSummaryHTML = `
        <div class="payment-summary">
            <div class="payment-summary-title">Order Summary</div>

            <div class="payment-summary-row">
                <div>Items (${totalQuantity}):</div>
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
        </div>
        `;

        const summaryContainer = document.querySelector('.js-payment-summary');
        if (summaryContainer) {
            summaryContainer.innerHTML = paymentSummaryHTML;
        }
    }

    // Initial render
    renderSummaryHTML();

    // Listen to delivery option changes and recalc totals
    document.querySelectorAll('.delivery-option-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = e.target.dataset.productId;
            const selectedOptionId = Number(e.target.value);

            updateDeliveryOption(productId, selectedOptionId);

            const cartItem = cart.find(item => item.productId === productId);
            if (cartItem) cartItem.deliveryOptionId = selectedOptionId;

            renderSummaryHTML(); // recalc totals including per-product shipping
        });
    });

    // Update cart quantity at top
    const updateTop = document.querySelector('.js-cartQuantity-top');
    if (updateTop) updateTop.innerHTML = `${getCartQuantity()} Items`;
}