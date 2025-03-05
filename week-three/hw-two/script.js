const init = () => {
  buildHTML();
  buildCSS();
  setEvents();
};

const buildHTML = () => {
  const app = $("#app");
  app.html(`
    <div class="container">
      <h1>₊✩‧₊˚౨Product List ৎ˚₊✩‧₊</h1>
      <button id="listProductsBtn">List Products</button>
      <div id="productContainer" class="product-container"></div>
    </div>
  `);
};

const buildCSS = () => {
  $("<style>").text(`
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100%;
    }

    .container {
      background: #fff;
      padding: 32px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      text-align: center;
      min-width: 600px;
    }

    h1 {
      margin-bottom: 20px;
    }

    #listProductsBtn {
      padding: 10px 20px;
      width: 100%;
      background-color:rgb(14, 14, 14);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 20px;
      font-size: 1.2em;
      transition: all ease 0.3s;
    }

    #listProductsBtn:hover {
      background-color:rgb(54, 54, 54);
    }

    .product-container {
      height: auto;
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .product-card {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      transition: all ease 0.5s;
    }

    .product-card:hover {
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
    }

    .product-card a {
      text-decoration: none;
      color: inherit;
    }

    .product-card h3 {
      margin: 0 0 10px;
      font-size: 1.2em;
      color: #000;
    }

    .product-card img {
      height: 50vh;
    }

    .product-card p {
      margin: 0 0 16px;
      font-size: 1.1em;
    }

    .product-card a:nth-child(2) {
      display: inline-block;
      padding: 8px 16px;
      background-color:rgb(14, 14, 14);
      color: white;
      border-radius: 4px;
      text-decoration: none;
    }

    .product-card a:nth-child(2):hover {
      background-color:rgb(54, 54, 54);
    }

    @media (min-width: 768px) {
      .product-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1250px) {
      .product-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
}
  `).appendTo("head");
};

const setEvents = () => {
  $("#listProductsBtn").click(function () {
    $("#productContainer").empty();

    // fetch with ajax
    $.ajax({
      url: "product.json",
      method: "GET",
      dataType: "json",
      success: function (data) {
        data.forEach(function (product) {
          const productCard = `
            <div class="product-card">
              <a href="${product.link}" target="_blank">
              <img src="${product.image}" alt="product-image"/>
              <h3>${product.name}</h3>
              <p>$${product.price.toFixed(2)}</p>
              <a href="${product.link}" target="_blank">View Product</a>
              </a>
            </div>
          `;
          $("#productContainer").append(productCard);
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching product data:", error);
      },
    });
  });
};

$(document).ready(init);