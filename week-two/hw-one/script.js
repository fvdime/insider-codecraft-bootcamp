const user = {
  name: prompt("What is your name?"),
  age: parseInt(prompt("How old are you?")),
  job: prompt("What is your job?")
};

console.log(`Welcome ${user.name} <3`);
console.log ("User information: ", user);

// SHOPPING CART
const cart = [];

// ADD
const addProduct = () => {
  let productName = prompt("Enter the product name:");
  let productPrice = parseFloat(prompt("Enter the product price:"));

  if (!isNaN(productPrice) && productName) {
      cart.push({ name: productName, price: productPrice });
      console.log(`${productName} added to the cart. The price is ${productPrice}`);
  } else {
      console.log("Invalid product details.");
  }
}

// LIST
const listCart = () => {
  if (cart.length === 0) {
      console.log("Your cart is empty.");
  } else {
      console.log("Your cart:");
      cart.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name} - $${product.price.toFixed(2)}`);
      });
  }
}

// TOTAL PRICE
const totalPrice = () => {
  let total = cart.reduce((sum, product) => sum + product.price, 0);
  console.log(`Total Price: $${total.toFixed(2)}`);
}

// REMOVE
const removeProduct = () => {
  listCart();
  if (cart.length > 0) {
      let index = parseInt(prompt("Enter the number of the product to remove:")) - 1;

      if (index >= 0 && index < cart.length) {
          let removedProduct = cart.splice(index, 1);
          console.log(`${removedProduct[0].name} removed from the cart.`);
      } else {
          console.log("Invalid product number.");
      }
  }
}

// OPTIONS
while (true) {
  let action = prompt("Choose an action: add, list, total, remove, or exit").toLowerCase();

  if (action === "add") {
      addProduct();
  } else if (action === "list") {
      listCart();
  } else if (action === "total") {
      totalPrice();
  } else if (action === "remove") {
      removeProduct();
  } else if (action === "exit") {
      console.log("Exiting...");
      break;
  } else {
      console.log("Invalid action. Try again.");
  }
}