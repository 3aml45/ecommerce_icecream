const showCart = () => {
  // console.log(cart);
  modalContainer.innerHTML = "";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `<h1 class='modal-header-title'>Cart.</h1>`;
  modalContainer.append(modalHeader);

  const modalButton = document.createElement("h1");
  modalButton.innerText = "x";
  modalButton.className = "modal-header-button";

  modalButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });
  modalHeader.append(modalButton);

  cart.forEach((product) => {
    const cartContent = document.createElement("div");
    cartContent.className = "modal-content";
    cartContent.innerHTML = `
      <img src="${product.img}" alt="product-img">
      <h3>${product.name}</h3>
      <p class='price'>${product.price}</p>
      <p class='subtract-amount-btn' id='subtractAmountBtn'>-</p>
      <p>Amount: ${product.amount}</p>
      <p class='add-amount-btn' id='addAmountBtn'>+</p>
      <p>total: ${product.amount * product.price}</p>

    `;
    modalContainer.append(cartContent);

    const delBtn = document.createElement("span");
    delBtn.className = "delete-product";
    delBtn.innerText = "❌";
    cartContent.append(delBtn);

    delBtn.addEventListener("click", () => delProduct(product.id));

    cartContent
      .querySelector(".subtract-amount-btn")
      .addEventListener("click", () => subAmountBtnHandler(product.id));
    cartContent
      .querySelector(".add-amount-btn")
      .addEventListener("click", () => addAmountBtnHandler(product.id));
  });

  const total = cart.reduce((acc, el) => acc + el.price * el.amount, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `total count: ${total}`;
  modalContainer.append(totalBuying);

  const delAllCart = document.createElement("div");
  delAllCart.className = "delete-all-cart";
  delAllCart.innerText = "Delete All Cart";
  modalContainer.append(delAllCart);

  delAllCart.addEventListener("click", () => {
    cart = [];
    saveLocal();
    // localStorage.setItem('cart', JSON.stringify(cart));
    updateNavbarCartCounter();
    showCart();
  });

  modalContainer.style.display = "flex";
};

cartIcon.addEventListener("click", showCart);

const delProduct = (id) => {
  const foundId = cart.find((element) => element.id === id);
  cart = cart.filter((cartId) => {
    return cartId != foundId;
  });
  saveLocal();
  // lsDeleteItem(id)
  updateNavbarCartCounter();
  showCart();
};

const updateNavbarCartCounter = () => {
  const cartItemsCounter = cart.reduce(
    (acc, element) => acc + element.amount,
    0
  );
  // let cartItemsCounter = 0;
  // cart.forEach((ele) => {
  //   cartItemsCounter = cartItemsCounter + ele.amount;
  // });
  navbarCartCounter.innerText = cartItemsCounter;
};

const lsDeleteItem = (id) => {
  const items = JSON.parse(localStorage.getItem("cart"));
  const currentItems = items.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(currentItems));
};

const subAmountBtnHandler = (id) => {
  const itemFound = cart.find((ele) => ele.id === id);
  cart.forEach((ele) => {
    if (ele.id === itemFound.id) {
      if (ele.amount > 1) {
        ele.amount--;
        saveLocal();
        updateNavbarCartCounter();
        showCart();
      } else {
        delProduct(id);
      }
    }
  });
};
const addAmountBtnHandler = (id) => {
  const itemFound = cart.find((ele) => ele.id === id);
  cart.forEach((ele) => {
    if (ele.id === itemFound.id) {
      ele.amount++;
    }
  });
  saveLocal();
  updateNavbarCartCounter();
  showCart();
};
