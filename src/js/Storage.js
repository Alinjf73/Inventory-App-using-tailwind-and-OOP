const products = [
  {
    id: 1,
    title: "react.js",
    category: "frontend",
    updated: "2021-05-06T15:06:10.411Z",
  },
  {
    id: 2,
    title: "node.js",
    category: "backend",
    createdAt: "2021-10-06T15:06:10.556Z",
  },
  {
    id: 1,
    title: "vue.js",
    category: "frontend",
    createdAt: "2021-11-06T15:06:10.889Z",
  },
];
const categories = [
  {
    id: 1,
    title: "frontend",
    description: "the frontend of apps",
    createdAt: "2021-05-06T15:06:10.411Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of apps",
    createdAt: "2021-09-06T15:06:10.411Z",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = this.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }
    localStorage.setItem("categories", JSON.stringify(savedCategories));
  }
  static getAllProducts(sort = "newest") {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const sortedProducts = savedProducts.sort((a, b) => {
      if (sort === "newest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
      } else if (sort === "oldest") {
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
      }
    });
    return sortedProducts;
  }

  static saveProduct(productToSave) {
    const savedProducts = this.getAllProducts();
    const existedItem = savedProducts.find((p) => p.id === productToSave.id);
    if (existedItem) {
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toLocaleDateString("fa-IR");
      savedProducts.push(productToSave);
    }
    localStorage.setItem("products", JSON.stringify(savedProducts));
  }

  static deleteProduct(id) {
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p) => p.id !== parseInt(id));
    localStorage.setItem("products", JSON.stringify(filteredProducts));
  }
}
