import Storage from "./Storage.js";
const title = document.querySelector("#category-title");
const description = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");
const toggleAddCategoryBtn = document.getElementById("toggle-add-category");
const categoryWrapper = document.getElementById("category-wrapper");
const cancelAddCategoryBtn = document.getElementById("cancel-add-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", this.toggleAddCategory);
    cancelAddCategoryBtn.addEventListener("click", this.cancelAddCategory);
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const titleValue = title.value;
    const descriptionValue = description.value;
    if (!titleValue || !descriptionValue) return;
    Storage.saveCategory({ title: titleValue, description: descriptionValue });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    title.value = "";
    description.value = "";
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `<option class="bg-slate-500 text-slate-300" value="">
                  Select a category
                </option>`;
    this.categories.forEach((element) => {
      result += `<option class="bg-slate-500 text-slate-300" value=${element.id}>
                  ${element.title}
                </option>`;
    });
    const categoriesDOM = document.getElementById("product-category");
    categoriesDOM.innerHTML = result;
  }

  toggleAddCategory() {
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }

  cancelAddCategory() {
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}

export default new CategoryView();
