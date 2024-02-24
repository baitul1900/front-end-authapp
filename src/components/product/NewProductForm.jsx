import  { useState, useEffect } from "react";
import { brandList, categoryList, createProduct } from "../../store/authStore";
import { toast } from "react-hot-toast";

const NewProductForm = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    Des: "",
    price: "",
    image: "",
    categoryID: "",
    brandID: "",
  });

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const brandsData = await brandList();
        const categoriesData = await categoryList();
        setBrands(brandsData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching brands and categories:", error);
      }
    };

    fetchBrandsAndCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      toast.success("Product created successfully!");
      // Clear form fields after successful submission
      setFormData({
        title: "",
        Des: "",
        price: "",
        image: "",
        categoryID: "",
        brandID: "",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="Des" value={formData.Des} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" step="0.01" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category" name="categoryID" value={formData.categoryID} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>{category.categoryName}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">Brand</label>
          <select className="form-select" id="brand" name="brandID" value={formData.brandID} onChange={handleChange} required>
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>{brand.brandName}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
    </div>
  );
};

export default NewProductForm;
