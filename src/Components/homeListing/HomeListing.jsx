import ProductCardCols from "../productCardCols/ProductCardCols";
import { productsCol } from "../../config/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styles from "./homeListing.module.css";

const HomeListing = () => {
  const [products] = useCollectionData(productsCol);

  const filteredProducts = products
    ? products.filter((product) => !product.userDescription)
    : [];

  const displayedProducts = filteredProducts.slice(0, 8).map((product) => {
    return <ProductCardCols product={product} key={product.id} />;
  });

  return (
    <section className={styles.homeListing_container}>
      <h2>Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts}
      </div>
    </section>
  );
};

export default HomeListing;
