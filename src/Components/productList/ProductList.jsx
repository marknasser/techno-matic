import "./ProductList.css";

import { useEffect, useState } from "react";

import ProductCardCols from "./../productCardCols/ProductCardCols";
import { productsCol } from "../../config/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function ProductList({ filterData, displayedProducts }) {
  const [data] = useCollectionData(productsCol);
  // console.log(displayedProducts);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(displayedProducts);
  }, [displayedProducts]);

  useEffect(() => {
    if (filterData !== "" && filterData !== "All") {
      const filteredProducts = data.filter(
        (product) => product.category.toLowerCase() === filterData.toLowerCase()
      );
      setProducts(filteredProducts);
    } else if (filterData === "All") {
      setProducts(displayedProducts);
    }
  }, [filterData]);

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products?.map((product) => {
        return (
          <ProductCardCols
            className="card "
            product={product}
            key={product.id}
          />
        );
      })}
    </div>
  );
}
