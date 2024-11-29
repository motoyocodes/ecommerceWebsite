import { products } from "./products.js";
import {updateCartQuantity, addtoCart } from "./cart.js";


let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;

const cartIcon = document.getElementById('header-cart-quantity');

if (cartIcon) {
    cartIcon.textContent = cartQuantity;
}


document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.querySelector('.product-container');
    
    function renderMenProducts() {
        const menProducts = products.filter(product => product.category === 'Men');
        productContainer.innerHTML = '';

        menProducts.forEach(product => {
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
                    <h4>$${product.price}</h4>
                </div>
            <div class="cart-detail">
                <h5 class="add-to-cart-text" data-product-id="${product.id}">Add to Cart</h5>
                <a href="cart.html"><i class="fa-solid fa-cart-shopping fa-xl cart"></i></a>
            </div>            `;

            productEl.setAttribute('data-aos', 'fade-up');
            productContainer.appendChild(productEl);
        });
    }

    renderMenProducts();

    document.querySelectorAll('.product-image').forEach((img) => {
        img.addEventListener('click', () => {
            const productId = img.dataset.productId;
            localStorage.setItem('selectedProductId', Number(productId));
            localStorage.setItem('productCategory', 'menProducts');
            window.location.href = 'productDetails.html'; // Navigate to productDetails page
        });
        
    });

   // Add to Cart event
   document.querySelectorAll('.add-to-cart-text').forEach((text) => {
    text.addEventListener('click', () => {
        const menproductId = parseInt(text.dataset.productId);
        console.log("Adding to cart, Product ID:", menproductId);
        addtoCart(menproductId, 'menProducts');
        let adddedNumber = 1;
        updateCartQuantity(adddedNumber);

       
    });
    });
});
