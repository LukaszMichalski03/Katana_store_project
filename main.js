const parallax = document.getElementById("parallax");
window.addEventListener("scroll", function () {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
});

//koszyk//
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
//open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};
//close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};
//cart JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
//function making
function ready() {
  //remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[0];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  var addCart = document.getElementsByClassName("add_button");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.onclick = (event) => {
      var button = event.target;
      var item = button.parentElement;
      var price = item.getElementsByClassName("price")[0].innerText;
      var btittle = button.parentElement.parentElement.parentElement;
      var tittle =
        btittle.getElementsByClassName("cart-item-tittle")[0].innerText;

      var imgsrc = button.parentElement.parentElement;
      var productImg = imgsrc.getElementsByClassName("cart-img")[0].src;

      addProductToCart(tittle, price, productImg);
      updateTotal();
    };
    // button.addEventListener("click", addCartClicked);
  }
  //buy item from cart button
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("Zamówienie zostało zrealizowane. Dziękujemy!");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}

function addProductToCart(tittle, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == tittle) {
      alert("Ten przedmiot został już dodany do karty! ");
      return;
    }
  }
  var cartBoxContent = `
          <img  src="${productImg}" alt="" class="cart-image" />
          <div class="detail-box">
            <div class="cart-product-title">${tittle}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity" />
          </div>
          <!-- remove cart-->
          <i class="bx bxs-trash-alt cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}
//add to cart

//function addCartClicked(event) {
//var button = event.target;
//var shopProducts = button.parentElement;
// var tittle =
// shopProducts.getElementsByClassName("cart-item-tittle")[0].innerText;

//alert(tittle);
//}

//remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

//quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//update total
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("zł", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //if price ma grosze
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerText = total + "zł";
}
////////
