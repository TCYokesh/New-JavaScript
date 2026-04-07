const xhr = new XMLHttpRequest();

xhr.addEventListener('load',() => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();


export let products = [];
export function loadProducts(fun){
    const xhr = new XMLHttpRequest();
    
    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response).map((productDetails) => {
            if (productDetails.type === "clothing"){
                return new clothing(productDetails);
            }
            else if (productDetails.type === "appliance"){
                return new appliance(productDetails);
            }
            return new Product(productDetails);
        });
        console.log('load products');
        fun();
    });
    xhr.open('GET','https://supersimplebackend.dev/products');
    xhr.send();
}