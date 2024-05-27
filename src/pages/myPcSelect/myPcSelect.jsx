/* eslint-disable react-hooks/rules-of-hooks */
import { useMemo } from "react";

import { Link, useParams } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import { productsCol } from "../../config/firebase/firebase";

import PageBanner from "../../Components/pageBanner/PageBanner";
import ProductCardRows from "../../Components/productCardRows/ProductCardRows";
import CaseList from "../../Components/caseList/CaseList";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";

import style from "./myPcSelect.module.css";

export default function MyPcSelect() {
  const { category } = useParams();

  const hardwareItems = [
    "case",
    "motherboard",
    "powerSupply",
    "fan",
    "cpu",
    "gpu",
    "hardDesk",
    "ramOne",
    "ramTwo",
    "ramThree",
    "ramFour",
  ];

  const [products, loading, error] = useCollectionData(productsCol);
  const { register, watch } = useForm();
  const searchQuery = watch("searchQuery", "");

  const filterProducts = (product) => {
    const productCategory = product.category;
    const searchCategory = category;

    const isMemoryCategory =
      ["ramOne", "ramTwo", "ramThree", "ramFour"].includes(searchCategory) &&
      productCategory === "memory";

    const isRegularCategory =
      !["ramOne", "ramTwo", "ramThree", "ramFour"].includes(searchCategory) &&
      productCategory === searchCategory;

    return (
      (isMemoryCategory || isRegularCategory) &&
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredProducts = useMemo(() => {
    if (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }

    if (!products) {
      return [];
    }

    return products.filter(filterProducts);
  }, [products, category, searchQuery, error]);

  return (
    <section id="mypc_select">
      <PageBanner page={category} />
      <Link
        className={style.backToMyPc}
        to={
          hardwareItems.includes(category)
            ? "/my-pc-select/case-hardware"
            : "/my-pc"
        }
      >
        <ArrowBackIcon />{" "}
        {hardwareItems.includes(category)
          ? "Back To Case Components"
          : "Back To My PC"}
      </Link>

      {category === "case-hardware" ? (
        <CaseList />
      ) : (
        <div className="product_list">
          <div className="container mx-auto w-4/5">
            <h1 className={style.title}>
              Select Your {category[0]?.toUpperCase() + category?.slice(1)}
            </h1>
            <form className={style.form}>
              <input
                type="text"
                {...register("searchQuery")}
                placeholder={`Search for ${category}s`}
              />
            </form>
          </div>
          <List className={style.products_list} sx={{ pt: 0 }}>
            {loading ? (
              <div className={style.loading}>
                <CircularProgress style={{ color: "#c87065" }} />
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCardRows
                  key={product.id}
                  product={product}
                  type={"mypc"}
                  dataCatigory={category}
                />
              ))
            )}
          </List>
          {error && (
            <div className={style.error}>
              <p>There was an error fetching data. Please try again later.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
