import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import { Outlet } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number | string;
  status: string;
}

const Cabinet: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    status: "Open",
  });
  const location = useLocation()
  const navigate = useNavigate()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  const fetchProducts = () => {
    axios
      .get("https://fake-api-dfa7.onrender.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        toast.error("Failed to fetch products!");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [location.pathname,location,navigate]);

  const filteredProducts = products.filter((product) => {
    if (filter === "All") return true;
    return product.status === filter;
  });

  const createProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast.error("All fields are required!");
      return;
    }

    axios
      .post("https://fake-api-dfa7.onrender.com/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ name: "", description: "", price: "", status: "Open" });
        toast.success("Product added!");
      })
      .catch(() => {
        toast.error("Failed to create product!");
      });
  };

  const updateProduct = () => {
    if (!editingProduct) return;

    axios
      .put(
        `https://fake-api-dfa7.onrender.com/products/${editingProduct.id}`,
        editingProduct
      )
      .then((response) => {
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id ? response.data : product
          )
        );
        setEditingProduct(null);
        toast.success("Product updated!");
      })
      .catch(() => {
        toast.error("Failed to update product!");
      });
  };

  const deleteProduct = (id: number) => {
    axios
      .delete(`https://fake-api-dfa7.onrender.com/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        toast.success("Product deleted!");
      })
      .catch(() => {
        toast.error("Failed to delete product!");
      });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Product Management</h2>
      <div className="row">
        <div className="col-md-9">
          <div className="mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <select
              className="form-control mb-2"
              value={newProduct.status}
              onChange={(e) =>
                setNewProduct({ ...newProduct, status: e.target.value })
              }
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
            </select>
            <button className="btn btn-success" onClick={createProduct}>
              Add Product
            </button>
          </div>

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div>
              {filteredProducts.map((product) => (
                <div key={product.id} className="card mb-3">
                  <div className="card-body">
                    {editingProduct?.id === product.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editingProduct.description}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              description: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          className="form-control mb-2"
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              price: e.target.value,
                            })
                          }
                        />
                        <select
                          className="form-control mb-2"
                          value={editingProduct.status}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Complete">Complete</option>
                        </select>
                        <button
                          className="btn btn-primary me-2"
                          onClick={updateProduct}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <h5>{product.name}</h5>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Status: {product.status}</p>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => setEditingProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-md-3">
          <div className="sidebar">
            <h4>Status Filters</h4>
            <div className="list-group">
              <button
                className="list-group-item list-group-item-action"
                onClick={() => setFilter("All")}
              >
                All
              </button>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => setFilter("Open")}
              >
                Open
              </button>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => setFilter("In Progress")}
              >
                In Progress
              </button>
              <button
                className="list-group-item list-group-item-action"
                onClick={() => setFilter("Complete")}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
