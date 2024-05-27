import ReactCardSlider from "react-card-slider-component";
import styles from "./homeSlider.module.css";
import { productsCol } from "../../config/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useNavigate } from "react-router-dom";

const HomeSlider = () => {
  const navigate = useNavigate();
  const [products] = useCollectionData(productsCol);

  const filteredProducts = products
    ? products.filter((product) => !product.userDescription)
    : [];

  const updatedProducts = filteredProducts.map((product) => ({
    ...product,
    clickEvent: () => {
      navigate(`/product-details/${product.id}`);
    },
  }));

  const displayedProducts = updatedProducts.slice(30, 45);

  return (
    <div className={styles.productList_container}>
      <h2 className={styles.productList_title}>Featured Products</h2>
      <ReactCardSlider slides={displayedProducts} />
    </div>
  );
};

export default HomeSlider;
