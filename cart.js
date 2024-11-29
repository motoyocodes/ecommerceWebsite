import { latestArrival } from "./latestArrival.js";
import { products } from "./products.js";

export let cart = [];

let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;

const cartIcon = document.querySelector('.cart-quantity');

if (cartIcon) {
    cartIcon.textContent = cartQuantity;
}


initializeCart();


document.addEventListener("DOMContentLoaded", () => {
    renderCartProduct(productCategory, selectedProductId); // Assuming this function calls renderCartProduct
});

const selectedProductId = parseInt(localStorage.getItem('selectedProductId')); 
const productCategory = localStorage.getItem('productCategory');// Get selected product ID
const selectedColor = localStorage.getItem('selectedColor');// Get selected product ID



function renderCartProduct(category, productId ) {
    
    let cartHTML = `
        <p class="header-title">My Cart</p>
        <div class="cart-detail-container">
            <div class="main-cart-wrapper"> <!-- Wrapper for cart items -->
    `;

       
    cart.forEach(cartitem => {

        let productDetails;
        const { productId, category } = cartitem;

        if (category === 'womenProducts') {
            productDetails = products.find(item => item.id === productId && item.category === 'Women');
            console.log("Adding Women product:", productDetails); // Debug log
        }
        else if (category === 'menProducts') {
            productDetails = products.find(item => item.id === productId && item.category === 'Men');
            console.log("Adding Women product:", productDetails); // Debug log
        }
         else if (category === 'latestArrival') {
            productDetails = latestArrival.find(item => item.id === productId); // Using productId directly
            console.log("Adding Latest Arrival product:", productDetails); // Debug log
        }
         else if (category === 'salesProduct') {
            productDetails = products.find(item => item.id === productId && item.salescategory === 'sales'); // Using productId directly
            console.log("Adding Latest Arrival product:", productDetails); // Debug log
        }
        console.log(cartitem.productId)


        if (productDetails){
            cartHTML += `
                <div class="main-cart js-main-cart-${productDetails.id}">
                    <div class="cart-img">
                        <img src="${productDetails.image}" alt="productDetails.image">
                        
                        <div class="cart-details">
                            <h3>${productDetails.name}</h3>
                            <h5 class="item-price">$${productDetails.price.toFixed(2)}</h5>
                        </div>
                    </div>
                    <div class="second-container">
                        <div class="cart-final-quantity">
                            <i class="fa-solid fa-minus minus-icon" data-product-id="${productDetails.id}" style="color: #000000;"></i>
                            <p class="total-quant">${cartitem.quantity}</p>
                            <i class="fa-solid fa-plus plus-icon" data-product-id="${productDetails.id}" style="color: #000000;"></i>
                        </div>
                        <div class="totalPrice">
                            $${(cartitem.price * cartitem.quantity).toFixed(2)}
                        </div>
                        <div class="delete-button">
                            <i class="fa-solid fa-trash-can delete-icon" data-product-id = "${productDetails.id}" style="color: #000000;"></i>
                        </div>
                    </div>
                </div>`;
                            
        } else {
            console.log('not found');

        }
     

    });

    cartHTML += `
            </div> <!-- Close main-cart-wrapper -->
            <div class="order-summary">
                <h2>Order Summary</h2>
                <div class="subtotal contain">
                    <p>Subtotal</p>
                    <p class="checkout-price"></p>
                </div>
                <div class="tax contain">
                    <p class="tax">Tax</p>
                    <p>$4.00</p>
                </div>
                <div class="after-tax-prices contain">
                    <p>Price after tax</p>
                    <p class="after-tax-price"></p>
                </div>
                <div class="final-checkout-price contain">
                    <h3>Total</h3>
                    <h4 class="final-price"></h4>
                </div>
                <div class="checkout-btn">
                    <button>Checkout</button>
                </div>
                <div class="secure">
                    <i class="fa-solid fa-lock" style="color: #000000;"></i>
                    <h4>Secure Checkout</h4>
                </div>
            </div>
        </div> 

    
         
    `;
    

    const cartContainer =document.getElementById('cart-container') ;
    if (cartContainer) {
        cartContainer.innerHTML = cartHTML;
        console.log('cart rendered')
    }
    else{
        console.log('cant find cartcontainer')
    }

 

    document.querySelectorAll('.delete-icon').forEach((deleteicon) => {
        deleteicon.addEventListener('click', () => {
            const selectedProductId = parseInt(deleteicon.dataset.productId);
            removeFromCart(selectedProductId);
    
            const container = document.querySelector(`.js-main-cart-${selectedProductId}`)
    
            container.remove();

            updateCartQuantity(-1);
            renderSubtotal();
    
        })
      });


      
    document.querySelectorAll('.plus-icon').forEach((plusicon) => {
        plusicon.addEventListener('click', () => {
            const productId = parseInt(plusicon.dataset.productId);
            updateCartItemQuantity(productId, 1);
        })
    })

        document.querySelectorAll('.minus-icon').forEach((plusicon) => {
        plusicon.addEventListener('click', () => {
            const productId = parseInt(plusicon.dataset.productId);
            updateCartItemQuantity(productId, -1);
        })
    })
    
    renderSubtotal();
    renderPopup();
      
}

function renderPopup(){
    const checkoutBtn = document.querySelector('.checkout-btn');
    const cancelIcon = document.querySelector('.cancel-icon');
    const gotItBtn = document.querySelector('.got-it-button');
    const popup =document.getElementById('popup');

   
    checkoutBtn.addEventListener('click', () => {
        popup.classList.add('active');
    })

    cancelIcon.addEventListener('click', () => {
        popup.classList.remove('active');
    })

    gotItBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    })
    
}

function renderSubtotal(){
    let checkoutPrice = document.querySelector('.checkout-price');
    let afterTaxPrice = document.querySelector('.after-tax-price');
    let totalPayment = document.querySelector('.final-price');
    let totalCheckoutPrice = 0;
    let finalTotal = 0;
    const taxNumber = 4;

   
        cart.forEach(cartitem => {
            totalCheckoutPrice += (cartitem.price * cartitem.quantity);
            finalTotal = totalCheckoutPrice + taxNumber;

        })
        if(checkoutPrice){
            console.log('checkout price')
            checkoutPrice.textContent = totalCheckoutPrice.toFixed(2);
            afterTaxPrice.textContent = `$${finalTotal.toFixed(2)}`;
            totalPayment.textContent = `$${finalTotal.toFixed(2)}`;
            
        }
        console.log('checkoutprice not found');
    
 
}

function updateCartItemQuantity(productId, change) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId); // Remove item if quantity goes to 0 or below
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartQuantity();
        renderCartProduct(); // Refresh cart display after updating quantity
    }
}



export function addtoCart(productId, category, quantity = 1, selectedColor) {
    let matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        
        let productDetails;
        if (category === 'womenProducts') {
            productDetails = products.find(item => item.id === productId && item.category === 'Women');
            console.log("Adding Women product:", productDetails); // Debug log
        }
        else if (category === 'menProducts') {
            productDetails = products.find(item => item.id === productId && item.category === 'Men');
            console.log("Adding Women product:", productDetails); // Debug log
        }
         else if (category === 'latestArrival') {
            productDetails = latestArrival.find(item => item.id === productId); // Using productId directly
            console.log("Adding Latest Arrival product:", productDetails); // Debug log
        }
         else if (category === 'salesProduct') {
            productDetails = products.find(item => item.id === productId && item.salescategory === 'sales'); // Using productId directly
            console.log("Adding Latest Arrival product:", productDetails); // Debug log
        }
        

        if (productDetails) {
            cart.push({
                productId: productId,
                quantity: quantity,
                category: category,
                price: productDetails.price,
                color: selectedColor
            });
        } else {
            console.error("Product not found in products or latestArrival:", productId);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(quantity);
}


export function initializeCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart).map(cartItem => {
            const productDetails = latestArrival.find(item => item.id === cartItem.productId);
            return productDetails ? { ...cartItem, price: cartItem.price || productDetails.price } : cartItem;
        });
        // Update cart quantity based on items loaded
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        updateCartQuantity(totalQuantity - cartQuantity); // Adjust quantity difference
    } else {
        cart = [];
        updateCartQuantity(0); // Initialize as empty
    }
}


export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem)
      }
    })

    cart = newCart;

    localStorage.setItem('cart', JSON.stringify(cart));

}

 

export function updateCartQuantity() {
    const cartIcon = document.querySelector('.cart-quantity');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cartIcon) {
        cartIcon.textContent = cartQuantity;
    }
    localStorage.setItem('cartQuantity', cartQuantity);
}


/*function clearCart() {
    localStorage.removeItem("cart");

    // Reset cart quantity in the UI
    const cartIcon = document.querySelector('.cart-quantity');
    if (cartIcon) {
        cartIcon.textContent = "0"; // Set cart icon to zero
    }

    // Optionally, update any other part of the cart UI
    console.log("Cart cleared. All items removed.");
}

// Call clearCart() when you need to clear the cart

clearCart(); */

