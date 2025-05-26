// frontend/JS/index.js
const API = "https://grocery-backend-w4vs.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("product-list");
  container.innerHTML = "<p>Loading products...</p>";

  try {
    const res = await fetch(`${API}/api/products`);
    const products = await res.json();
    container.innerHTML = "";

    products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product";
      div.setAttribute("data-id", product._id);
      div.innerHTML = `
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      container.appendChild(div);
    });

    attachAddToCartListeners();
  } catch (err) {
    console.error("Error loading products", err);
    container.innerHTML = "<p>Failed to load products.</p>";
  }
});

function attachAddToCartListeners() {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productId = btn.closest(".product").getAttribute("data-id");
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to add to cart.");
        return;
      }

      try {
        const res = await fetch(`${API}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ productId }),
        });

        const data = await res.json();
        if (res.ok) {
          alert("Added to cart!");
        } else {
          alert(data.error || "Failed to add.");
        }
      } catch (err) {
        console.error("Add to cart failed", err);
      }
    });
  });
}
