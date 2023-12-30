// Fetch data from the API

// Display products based on category

function displayData(data) {}

function calculateDiscount(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}

function displayProducts(category, products) {
  const container = document.getElementById(category);

  const veera = products[0].category_products;

  const data = veera.map((each) => ({
    id: each.id,
    title: each.title,
    price: each.price,
    vendor: each.vendor,
    compareAtPrice: each.compare_at_price,
    badge: each.badge_text,
    image: each.image,
  }));

  data.forEach((data) => {
    const discount = calculateDiscount(data.price, data.compareAtPrice);
    // console.log(data.badge);

    let nullVal = data.badge === null;
    console.log(nullVal);

    const productCard = `
      <div class="product-card">
      <div class="badge">${nullVal === true ? "" : data.badge}</div>
        <img class="product-image" src="${data.image}" alt="${data.title}">
        <div class="product-info">
          <p class="title">${data.title}<span>*${data.vendor}</span></p>
          <p class="price">Rs ${data.price}.00</p>
          <span class="compare-price">${data.compareAtPrice}.00</span>
          <span class="discount">${discount}% Off</span>
          <button class="add-to-cart">Add to Cart</button>
        </div>
      </div>
    `;
    container.innerHTML += productCard;
    container.classList.add("card");
  });
}
// Calculate discount percentage
fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => response.json())
  .then((data) => {
    const { categories } = data;
    // console.log(categories);
    const menProducts = categories.filter(
      (product) => product.category_name === "Men"
    );

    const womenProducts = categories.filter(
      (product) => product.category_name === "Women"
    );
    const kidsProducts = categories.filter(
      (product) => product.category_name === "Kids"
    );

    displayProducts("men", menProducts);
    displayProducts("women", womenProducts);
    displayProducts("kids", kidsProducts);
  })
  .catch((error) => console.error("Error fetching data:", error));

// Toggle between tabs and show respective products
function showProducts(category) {
  const tabs = ["men", "women", "kids"];

  tabs.forEach((tab) => {
    const container = document.getElementById(tab);
    container.style.display = tab === category ? "flex" : "none";
  });
}
