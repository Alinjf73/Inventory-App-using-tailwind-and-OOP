import Storage from "./Storage.js";
const title = document.querySelector("#product-title");
const quantity = document.querySelector("#product-quantity");
const addNewProductBtn = document.querySelector("#add-new-product");
const selectedCategory = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const titleValue = title.value;
    const quantityValue = quantity.value;
    const categoryValue = selectedCategory.value;
    if (!titleValue || !quantityValue || !categoryValue) return;
    Storage.saveProduct({
      title: titleValue,
      quantity: quantityValue,
      category: categoryValue,
    });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    title.value = "";
    quantity.value = "";
    selectedCategory.value = "";
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductsList(products) {
    const productsList = document.getElementById("products-list");
    let result = "";
    products.forEach((element) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == element.category
      );
      result += `<div class="flex items-center justify-between mb-4">
          <span class="text-slate-400">${element.title}</span>
          <div class="flex items-center gap-x-3">
            <span class="text-slate-400">${element.createdAt}</span>
            <span
              class="block px-3 py-0.5 text-slate-400 border border-slate-400 rounded-2xl text-sm"
              >${selectedCategory.title}</span
            >
            <span
              class="flex items-center justify-center bg-slate-500 text-slate-300 w-7 h-7 rounded-full border-2 border-slate-300 font-bold"
              >${element.quantity}</span
            >
            <button
              class="delete-product border border-red-400 text-red-400 px-2 py-0.5 rounded-2xl" data-product-id= ${element.id}
            >
              delete
            </button>
          </div>
        </div>`;
    });
    productsList.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}

export default new ProductView();
