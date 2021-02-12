let carts = document.querySelectorAll('.add-cart');

let products = [

    {
        model: 'AMD Radeon 5700 XT',
        price: 459,
        image: 'resources/Images/251223-b324043_300x300.jpg',
        inCart: 0,
        tag: 'amd5700xt'
    },
    {
        model: 'ASUS GeForce RTX 3070 8GB DUAL',
        price: 599,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'asus3070dual'
    },
    {
        model: 'MSI GeForce RTX 3070 Ventus 3X OC',
        price: 619,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'msi3070ventus'
    },
    {
        model: 'ASUS GeForce RTX 3070 8GB GDDR6 DUAL OC',
        price: 619,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'asus3070dualoc'
    },
    {
        model: 'GeForce RTX3070 GamingPro',
        price: 639,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'asus3070gpro'
    },
    {
        model: 'ASUS TUF GAMING GeForce RTX™ 3070 OC Edition 8GB GDDR6',
        price: 669,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'asus3070tuf'
    },
    {
        model: 'EVGA GeForce RTX 3070 XC3 BLACK',
        price: 619,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'evga3070xc3'
    },
    {
        model: 'ASUS ROG STRIX RTX3090 O24G GAMING',
        price: 1889,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'asus3090strix'
    },
    {
        model: 'ASUS GeForce RTX 3070 8GB GDDR6 ROG STRIX GAMING',
        price: 719,
        image: 'resources/Images/302003-b303045_300x300.jpg',
        inCart: 0,
        tag: 'asus3070strix'
    },
    
    ];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
         cartNumbers(products[i]);
         totalCost(products[i])
    })
    

}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.Cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.Cart span').textContent = productNumbers + 1;
    }
    else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.Cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null) {
        
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } 
    
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    
    localStorage.setItem('productsInCart', JSON.stringify
    (cartItems));
}

function totalCost(products) {

  let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log("Cost of the clicked item", products.price);
    
    
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);
    
    } else{
        localStorage.setItem("totalCost", products.price);
        console.log(typeof cartCost );
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    console.log(cartItems);
    let productContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products">
                <i class="far fa-times-circle"></i>
            
                <img id="cartImage" src="./images/asus3070dual.jpg">
                <span id="spanner">${item.model}</span>
                
                <div class="price">
                €${item.price},00
                </div>

                <div class="quantity">
                <i class="fas fa-arrow-up"></i>
                ${item.inCart}
                <i class="fas fa-arrow-down"></i>
                </div>

                <div class="totalprice">
                ${item.inCart * item.price}€
                </div>
                 
            </div>
            `
        });

        productContainer.innerHTML += `

        <div class="basketTotalContainer">

        <h4 class="basketTotal">
        Basket Total: ${cartCost}€
        </h4>

        <div class="checkoutButton">
        <button>Checkout</button>
        </div>
            
        </div>


        `;

    }
}


onLoadCartNumbers();
displayCart();