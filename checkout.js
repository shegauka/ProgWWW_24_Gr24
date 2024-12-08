document.addEventListener("DOMContentLoaded", function () {
  console.log("Checkout script is running");

  const cartItem = JSON.parse(localStorage.getItem("cart"));

  if (cartItem) {
    console.log("Cart item found:", cartItem);

    document.getElementById("productName").textContent = cartItem.name;
    document.getElementById("price").textContent = `${cartItem.price}€`;
    document.getElementById("total").textContent = `${cartItem.price}€`;
  } else {
    console.log("No cart item found in localStorage");
    alert("Your cart is empty!");
    window.location.href = "product-page.html";
  }
});
function Customer(name, email, cardNumber) {
  this.name = name;
  this.email = email;
  this.cardNumber = cardNumber;
}

function Order(productName, price, total) {
  this.productName = productName;
  this.price = price;
  this.total = total;
}

function PromoCode(code, discount) {
  this.code = code;
  this.discount = discount;
}

function validateName(name) {
  if (!name.match(/^[a-zA-Z\s]+$/)) {
    throw "Emri mund te permbaje vetem emra dhe hapesire.";
  }
}

function validateEmail(email) {
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    throw "Formati i emailit nuk eshte valid.";
  }
}

function validateCardNumber(cardNumber) {
  if (!/^\d{16}$/.test(cardNumber)) {
    throw "Numri karteles duhet te kete 16 numra.";
  }
}

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    const name = document.getElementById("customerName").value;
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const promoCode = document.getElementById("promoCode").value;

    validateName(name);
    validateEmail(email);
    validateCardNumber(cardNumber);

    const customer = new Customer(name, email, cardNumber);
    const order = new Order(
      document.getElementById("productName").textContent,
      parseFloat(document.getElementById("price").textContent),
      parseFloat(document.getElementById("total").textContent)
    );

    if (promoCode) {
      const discount = promoCode.match(/DISCOUNT(\d+)/i);
      if (discount) {
        const discountValue = Math.min(parseFloat(discount[1]), order.total);
        order.total -= discountValue;
        alert(`Kuponi u aplikua! Totali i ri: ${order.total.toFixed(2)}€`);
      } else {
        throw "Kuponi nuk eshte i sakte.";
      }
    }

    alert("Blerja u be me sukses!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
  } catch (error) {
    alert(`Error: ${error}`);
  }
});

const currentDate = new Date();
console.log("Current Date:", currentDate.toString());
