import {updateCartQuantity, addtoCart} from "./cart.js";
import {latestArrival} from './latestArrival.js';



document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-quantity');
    if (cartIcon) {
        const cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;
        cartIcon.textContent = cartQuantity;
    }
});

const productContainerEl = document.querySelector('.product-container');
const showButton = document.getElementById('showAll');
let showAll = false;

function renderProducts() {
    productContainerEl.innerHTML = '';

    const productDisplay = showAll ? latestArrival.length : 4;

    for (let i = 0; i < productDisplay; i++) {
        const product = latestArrival[i];
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" data-product-id="${product.id}" class="product-image">
            <div class="description">
                <h3>${product.name}</h3>
                <div class="star">
                    <i class="fa-solid fa-star icon"></i>
                    <i class="fa-solid fa-star icon"></i>
                    <i class="fa-solid fa-star icon"></i>
                    <i class="fa-solid fa-star icon"></i>
                </div>
                <h4>$${product.price}</h4>
            </div>
            <div class="cart-detail">
                <h5 class="add-to-cart-text" data-product-id="${product.id}">Add to Cart</h5>
                <a href="cart.html"><i class="fa-solid fa-cart-shopping fa-xl cart"></i></a>
            </div>
        `;

        productElement.setAttribute('data-aos', 'fade-up');
        productContainerEl.appendChild(productElement);
    }

    // Click event for product images
    document.querySelectorAll('.product-image').forEach((img) => {
        img.addEventListener('click', () => {
            const productId = img.dataset.productId;
            localStorage.setItem('productCategory', 'latestArrival');

            localStorage.setItem('selectedProductId', Number(productId));
            window.location.href = 'productDetails.html'; // Navigate to productDetails page
        });
        
    });

    // Add to Cart event
    document.querySelectorAll('.add-to-cart-text').forEach((text) => {
        text.addEventListener('click', () => {
            const productId = parseInt(text.dataset.productId);
            addtoCart(productId, 'latestArrival');
            let adddedNumber = 1;
            updateCartQuantity(adddedNumber);
        });
    });
}


    showButton.addEventListener('click', () => {
        showAll = !showAll;
        renderProducts();
        showButton.textContent = showAll ? 'View Less' : 'Show All';
    });

    renderProducts();
    updateCartQuantity(0); // Initial update of cart quantity
