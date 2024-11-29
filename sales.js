import { products } from "./products.js";
import {updateCartQuantity, addtoCart } from "./cart.js";


let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;

const cartIcon = document.getElementById('header-cart-quantity');

if (cartIcon) {
    cartIcon.textContent = cartQuantity;
}else{
    console.log('no')
}

document.addEventListener('DOMContentLoaded', () => {

    const productContainer = document.querySelector('.product-container');
    
    function renderSalesProducts() {
         const saleProducts = products.filter(product => product.salescategory === 'sales');
        productContainer.innerHTML = '';

        saleProducts.forEach(product => {
            const productEl = document.createElement('div');
            productEl.classList.add('product');
            productEl.innerHTML = `
                <img src="${product.image}" alt="${product.name}" data-product-id="${product.id}" class="product-image">
                <div class="description">
                    <h3>${product.name}</h3>
                    <div class="star">
                        <i class="fa-solid fa-star icon"></i>
                        <i class="fa-solid fa-star icon"></i>
                        <i class="fa-solid fa-star icon"></i>
                        <i class="fa-solid fa-star icon"></i>
                    </div>

                    <div class="slash-price-container">
                    <div class="slash"></div>
                    <div class="price-container">
                    <h4>$${product.price}</h4>
                    <p class="new-price">$${(product.price / 2).toFixed(2)}</p>
                    </div>
                    </div>
                </div>
                    <div class="cart-detail">
                <h5 class="add-to-cart-text" data-product-id="${product.id}">Add to Cart</h5>
                <a href="cart.html"><i class="fa-solid fa-cart-shopping fa-xl cart"></i></a>
            </div>
            `;
            productEl.setAttribute('data-aos', 'fade-up');

            productContainer.appendChild(productEl);
        });
    }

    renderSalesProducts();
    
    document.querySelectorAll('.product-image').forEach((img) => {
        img.addEventListener('click', () => {
            const productId = img.dataset.productId;
            localStorage.setItem('selectedProductId', Number(productId));

            localStorage.setItem('productCategory', 'salesProduct');
            window.location.href = 'productDetails.html'; // Navigate to productDetails page
        });
        
    });

   // Add to Cart event
   document.querySelectorAll('.add-to-cart-text').forEach((text) => {
    text.addEventListener('click', () => {
        const saleProductsId = parseInt(text.dataset.productId);
        console.log("Adding to cart, Product ID:", saleProductsId);
        addtoCart(saleProductsId, 'salesProduct');
        let adddedNumber = 1;
        updateCartQuantity(adddedNumber);

       
    });
    });
})