import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Product Not Found</h2>;
  return (
    <div style={{ padding: "40px" }}>
      <img
        src={product.images?.[0]}
        alt={product.name}
        width="400"
        style={{ objectFit: "cover" }}
      />
      <h1>{product.name}</h1>
      <h2>${product.price}</h2>
      <p>{product.description}</p>
      <p>Stock : {product.stock}</p>
    </div>
  );
};

export default ProductDetails;
