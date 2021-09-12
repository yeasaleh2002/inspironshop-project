// Api call start
const loadProducts = () => {
   const url = `https://fakestoreapi.com/products`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();
// Api call end



// show all product in UI start
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p> <b> Rating Count: </b> ${product.rating.count} &nbsp; &nbsp; &nbsp;  <b> Rating: </b> ${product.rating.rate}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
// show all product in UI end


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};


const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  //  const converted = parseInt(element);
   const converted = parseFloat(element);
  return converted;
};


// main price update function start
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;

  document.getElementById(id).innerText = Math.abs(total.toFixed(2));
  
};
// main price update function end


// set innerText function start
const setInnerText = (id, value) => {
  
  
   document.getElementById(id).innerText = Math.abs(value.toFixed(2));
   
};
// set innerText function end



// update delivery charge and total Tax start
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }


  updateTotal();
};
// update delivery charge and total Tax end


 //grandTotal update function start
const updateTotal = () => {
 

    const grandTotal =
   getInputValue("price") + getInputValue("delivery-charge") +
   getInputValue("total-tax"); 
  document.getElementById("total").innerText = grandTotal;
  
}; 
 //grandTotal update function end


