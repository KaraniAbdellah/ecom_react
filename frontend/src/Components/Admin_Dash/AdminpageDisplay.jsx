import axios from "axios";

export default function ProductDisplay({ products, setProducts, onUpdate }) {
  // Update product function
  const handleUpdate = (product) => {
    console.log("Updating product:", product);
    // Call the parent component's update handler
    onUpdate(product);
    
    // Fixed URL - Need to add "/" before the ID and remove "deleteProduct" from the path
    axios.put(`http://127.0.0.1:5000/product/updateProduct/${product._id}`, product)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  // Delete product function
  const handleDelete = (productId) => {
    setProducts(products.filter(prod => prod._id !== productId));
    
    // Fixed URL - Need to add "/" before the ID
    axios.delete(`http://127.0.0.1:5000/product/deleteProduct/${productId}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-12 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Product Details
      </h2>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p>
      ) : (
        products.map((prod) => (
          <div
            key={prod._id}
            className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4 mb-4"
          >
            <img
              src={prod.image}
              alt={prod.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {prod.title} | {prod.category}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {prod.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-orange-600">DH {prod.price}</p>
              <p className="text-sm text-gray-600">Stock: {prod.quantity}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(prod)}
                className="p-2 text-blue-800 hover:bg-orange-50 rounded-lg transition"
                title="Update product"
              >
                {/* Update icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                title="Delete product"
              >
                {/* Delete icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}