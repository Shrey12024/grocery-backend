// frontend/JS/cart.js
const API = "https://grocery-backend-w4vs.onrender.com";

// Load cart items
async function loadCart() {
  const token = localStorage.getItem("token");
  const cartCount = document.getElementById("cart-count");
  if (!token) {
    if (cartCount) cartCount.textContent = "0";
    return (document.getElementById("cart-items").innerHTML = "<p>Please login to see your cart.</p>");
  }

  try {
    const res = await fetch(`${API}/api/cart`, {
      headers: { Authorization: token },
    });
    const data = await res.json();

    const container = document.getElementById("cart-items");
    if (cartCount) cartCount.textContent = data.items.length;

    container.innerHTML = "";
    if (data.items.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    data.items.forEach((item) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
          <p><strong>${item.productId.name}</strong></p>
          <p>Price: ₹${item.productId.price}</p>
          <label>Quantity:
            <input type="number" value="${item.quantity}" min="1" style="width: 50px;" onchange="updateQuantity('${item.productId._id}', this.value)" />
          </label>
          <br>
          <button onclick="removeFromCart('${item.productId._id}')">Remove</button>
        </div>
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

// Update item quantity
async function updateQuantity(productId, quantity) {
  const token = localStorage.getItem("token");
  try {
    await fetch(`${API}/api/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    loadCart();
  } catch (err) {
    console.error("Quantity update failed:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadCart);
