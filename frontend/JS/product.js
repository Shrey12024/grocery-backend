// frontend/JS/product.js
const API = "https://grocery-backend-w4vs.onrender.com";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productDiv = btn.closest(".product");
      const productId = productDiv.getAttribute("data-id");
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to add items to cart.");
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
});
