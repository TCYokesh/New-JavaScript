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