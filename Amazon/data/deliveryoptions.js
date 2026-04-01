import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"
import { cart } from "./cart.js";
import { products } from "./products.js";

export const deliveryOptions = [{
    id: 1,
    deliveryDays: 7,
    price: 0
},{
    id: 2,
    deliveryDays: 3,
    price: 49
}];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    deliveryOptions.forEach ((Option) => {
        if (Option.id === deliveryOptionId){
            deliveryOption = Option;
        }
    });
    return deliveryOption || deliveryOptions[0];
}

export function delivery(){
    getdeliveryOption();
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchinProduct = products.find(product => product.id === productId);
        const selectedOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId) || deliveryOptions[0];
    
        const today = dayjs();
        const deliveryDate = today.add(selectedOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
    });
}