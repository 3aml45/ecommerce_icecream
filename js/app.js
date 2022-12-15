const menuContainer = document.getElementById("shopContent");
const cartIcon = document.getElementById("verCarrrito");
const modalContainer = document.getElementById("modalContainer");
const navbarCartCounter = document.getElementById("navbarCartCounter");


const storageCart = JSON.parse(localStorage.getItem('cart'));
let cart = storageCart || [];
let counter = 0;
storageCart && storageCart.forEach((ele)=>{
  counter += ele.amount;
})
navbarCartCounter.innerText = counter

menu.forEach((product) => {
  const content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}" alt="product-img">
    <h3>${product.name}</h3>
    <p class='price'>${product.price}</p>
  `;
  const buy = document.createElement("button");
  buy.className = "buy";
  buy.innerText = "buy";
  content.append(buy);
  menuContainer.append(content);

  buy.addEventListener("click", () => {
    const foundId = cart.find((ele) => ele.id === product.id);
    if (!foundId) {
      cart.push({
        id: product.id,
        img: product.img,
        name: product.name,
        price: product.price,
        amount: product.amount,
      });
    } else {
      cart.forEach((ele) => {
        if (ele.id === product.id) {
          ele.amount++;
        }
      });
    }
    updateNavbarCartCounter();
    if (modalContainer.style.display === "flex") {
      showCart();
    }
    saveLocal();
  });
});

// save item
const saveLocal = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// get item
