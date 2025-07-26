const products = [
  { id: 1, name: "Herbal Tea", price: 199, image: "https://via.placeholder.com/200x180" },
  { id: 2, name: "Organic Honey", price: 299, image: "https://via.placeholder.com/200x180" },
  { id: 3, name: "Amla Juice", price: 249, image: "https://via.placeholder.com/200x180" },
  { id: 4, name: "Neem Powder", price: 149, image: "https://via.placeholder.com/200x180" },
  { id: 5, name: "Aloe Vera Gel", price: 199, image: "https://via.placeholder.com/200x180" }
];

const productGrid = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart");

function renderProducts() {
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCount.textContent = cart.length;
}

function addToCart(id) {
  const cart = getCart();
  cart.push(id);
  setCart(cart);
  alert("Added to cart!");
}

function showCart() {
  const cart = getCart();
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Cart is empty</li>";
  } else {
    cart.forEach(id => {
      const product = products.find(p => p.id === id);
      const li = document.createElement("li");
      li.textContent = `${product.name} - ₹${product.price}`;
      cartItems.appendChild(li);
    });
  }

  cartModal.style.display = "block";
}

function clearCart() {
  localStorage.removeItem("cart");
  setCart([]);
  cartItems.innerHTML = "<li>Cart is empty</li>";
}

window.onload = () => {
  renderProducts();
  setCart(getCart());
};
