import { useEffect, useState } from "react";
import adminService from "../../services/adminService";
import EditProductModal from "./EditProductModal";

const ProductsWidget = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await adminService.getAllProducts();
      setProducts(data?.products || data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleUpdateSuccess = () => {
    fetchProducts();
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Products</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold">
            Add Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Stock</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {product.images && product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td className="py-3">{product.category?.name || "N/A"}</td>
                    <td className="py-3">${product.price?.toFixed(2) || "0.00"}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          product.stock > 5
                            ? "bg-green-100 text-green-800"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3">
                      {product.isFeatured && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                          Featured
                        </span>
                      )}
                      {product.isNewArrival && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold ml-1">
                          New
                        </span>
                      )}
                    </td>
                    <td className="py-3 flex gap-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default ProductsWidget;
