import { addtoCart, updateCartQuantity } from "./cart.js";
import { latestArrival } from "./latestArrival.js";
import { products } from "./products.js";

let cartQuantity = parseInt(localStorage.getItem('cartQuantity')) || 0;

const cartIcon = document.querySelector('.cart-quantity');
if (cartIcon) {
    cartIcon.textContent = cartQuantity;
}


const selectedProductId = parseInt(localStorage.getItem('selectedProductId')); 
const productCategory = localStorage.getItem('productCategory');// Get selected product ID

let matchingProduct;
    if (productCategory === 'womenProducts') {
        matchingProduct = products.find(item => item.id === selectedProductId && item.category === 'Women');
    }else if (productCategory === 'menProducts') {
        matchingProduct = products.find(item => item.id === selectedProductId && item.category === 'Men');
    }
    else if(productCategory === 'latestArrival') {
        matchingProduct = latestArrival.find(item => item.id === selectedProductId);
    }
    else if(productCategory === 'salesProduct') {
        matchingProduct = products.find(item => item.id === selectedProductId && item.salescategory === 'sales');
    }

if (matchingProduct) {
    const productDetailsHTML = `
        <div class="main-container">
            <div class="product-image-container">
                <img src="${matchingProduct.image}" alt="${matchingProduct.name} class="product-image">
            </div>
            <div class="description-container">
                <h1>${matchingProduct.name}</h1>
                <h2>$${matchingProduct.price}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>

                <div class="options">
                    <label for="color-select">Color</label>
                    <select id="color-select">
                        <option value="" disabled selected>Select</option>
                        <option value="R">Red</option>
                        <option value="B">Black</option>
                        <option value="W">White</option>
                        <option value="G">Green</option>
                    </select>

                   <div class="color-warning">
                   <i class="fa-solid fa-triangle-exclamation fa-xl warn-icon"></i>
                   <p class="color-warning-text">Select Color</p>
                   </div>
                   

                    <label for="size-select">Size</label>
                    <select id="size-select">
                        <option value="" disabled selected>Select</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">Extra Large</option>
                    </select>

                    <div class="size-warning">
                   <i class="fa-solid fa-triangle-exclamation fa-xl warn-icon"></i>
                   <p class="size-warning-text">Select Size</p>
                   </div>

                    <label for="quantity">Quantity</label>
                    <input type="number" id="quantity" value="1" min="1">
                </div>

                <div class="buttons">
                    <button id="add-to-cart" class="button">Add to Cart</button>
                    <button id="buy-now" class="button">Buy Now</button>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.product-detail-container').innerHTML = productDetailsHTML;

    document.getElementById('add-to-cart').addEventListener('click', () => {
        const color = document.getElementById('color-select').value;
        const size = document.getElementById('size-select').value;
        const quantity = parseInt(document.getElementById('quantity').value, 10);
    
        const colorWarning = document.querySelector('.color-warning');
        const sizeWarning = document.querySelector('.size-warning');

       if(!color){
        colorWarning.classList.add('active');
        return;
       }
       else{
        colorWarning.classList.remove('active');
       }

       if(!size){
        sizeWarning.classList.add('active');
        return;
       }
       else{
        sizeWarning.classList.remove('active');
       }

       const selectedColor = color ? colorSelect.value : null;

       if (selectedColor) {
        addtoCart(selectedProductId, productCategory, quantity, selectedColor);
        updateCartQuantity();
       }
       
    }); 

    function hideWarning(warningElement) {
        warningElement.classList.remove('active');
    }

    // Event Listener for Color Selection
    const colorSelect = document.getElementById('color-select');
    const colorWarning = document.querySelector('.color-warning');

    if (colorSelect) {
      
        colorSelect.addEventListener('change', () => {
            hideWarning(colorWarning);
        });
       
    }

    // Event Listener for Size Selection
    const sizeSelect = document.getElementById('size-select');
    const sizeWarning = document.querySelector('.size-warning');

    if (sizeSelect) {
        sizeSelect.addEventListener('change', () => {
            hideWarning(sizeWarning);
        });
    }

    document.getElementById('buy-now').addEventListener('click', () => {
        window.location.href = 'cart.html'; // Optional: Navigate to cart after adding
    });
}
else {
    console.warn('Product not found');

}
