// frontend/JS/cart.js
const API = "https://grocery-backend-w4vs.onrender.com";

// Load cart items
async function loadCart() {
  const token = localStorage.getItem("token");
  if (!token) return (document.getElementById("cart-items").innerHTML = "<p>Please login to see your cart.</p>");

  try {
    const res = await fetch(`${API}/api/cart`, {
      headers: { Authorization: token },
    });
    const data = await res.json();

    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    if (data.items.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    data.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <p><strong>${item.productId.name}</strong></p>
        <p>Price: ₹${item.productId.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart('${item.productId._id}')">Remove</button>
      `;
      container.appendChild(div);
    });
  } catch (err) {
    console.error("Cart error:", err);
  }
}

// Remove item
async function removeFromCart(productId) {
  const token = localStorage.getItem("token");
  try {
    await fetch(`${API}/api/cart/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productId }),
    });
    loadCart();
  } catch (err) {
    console.error("Remove failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCart);
