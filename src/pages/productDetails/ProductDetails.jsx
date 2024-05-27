import { useState, useEffect, useMemo } from "react";

import { useParams } from "react-router-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { productsCol } from "../../config/firebase/firebase";
import { query, where } from "firebase/firestore";
import ReactStars from "react-rating-stars-component";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CircularProgress from "@mui/material/CircularProgress";

import PageBanner from "../../Components/pageBanner/PageBanner";
import style from "./ProductDetails.module.css";

export default function ProductDetails() {
  const [galleryActive, setGalleryActive] = useState(0);
  const [product, setProduct] = useState();
  const [productImages, setProductImages] = useState();
  const [productQty, setProductQty] = useState(1);
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const { id } = useParams();
  const singleProduct = useMemo(
    () => query(productsCol, where("id", "==", parseInt(id))),
    [id]
  );
  const [productsArr, loading] = useCollectionData(singleProduct);

  useEffect(() => {
    productsArr && setProduct(productsArr[0]);
    product && setProductImages([product.image, ...product["thumb-images"]]);
  }, [product, productsArr]);
  const colorsArr = product?.color?.split(" / ");
  const priceAfterDisc =
    product?.price - (product?.discount_percentage / 100) * product?.price;

  const colors = colorsArr?.map((hexColor) => {
    return (
      <button
        className={style.color}
        key={hexColor}
        style={{ backgroundColor: hexColor }}
      ></button>
    );
  });

  const productGallery = productImages?.map((img, index) => {
    return (
      <a key={index} onClick={() => galleryActivate(index)}>
        <figure>
          <img
            className={galleryActive === index ? style.active : ""}
            src={img}
          />
        </figure>
      </a>
    );
  });

  const increaseQuantity = () => {
    setProductQty((prev) => (prev += 1));
  };
  const decreaseQuantity = () => {
    if (productQty > 1) {
      setProductQty((prev) => (prev -= 1));
    }
  };

  const galleryActivate = (index) => {
    setGalleryActive(index);
  };
  const nextGalleryImg = () => {
    setGalleryActive((prev) => {
      if (prev < productImages.length - 1) {
        return ++prev;
      } else {
        return 0;
      }
    });
  };
  const previousGalleryImg = () => {
    setGalleryActive((prev) => {
      if (prev > 0) {
        return --prev;
      } else {
        return 5;
      }
    });
  };
  return (
    <section id="product_details">
      <PageBanner page={"Single Product"} />
      <div className="container mx-auto">
        <div className={style.product_card}>
          {loading ? (
            <div className={style.loading}>
              <CircularProgress style={{ color: "#c87065" }} />
            </div>
          ) : (
            <>
              <figure className={style.product_img}>
                <img
                  src={productImages && productImages[galleryActive]}
                  alt=""
                />
              </figure>
              <div className={style.product_details}>
                <div className={style.product_info}>
                  <div className={style.title_rate}>
                    <h3 className={style.product_title}>{product?.title}</h3>
                    <div className={style.product_rating}>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={20}
                        color="#d9d9d9"
                        activeColor="#c87065"
                        isHalf={true}
                        value={4}
                      />
                      <span>( {product?.rating_count} Rating )</span>
                    </div>
                  </div>
                  <div className={style.product_prices}>
                    <h3 className={style.product_price}>
                      $ {priceAfterDisc?.toFixed(2)}
                    </h3>
                    <h3 className={style.product_old_price}>
                      $ {product?.price}
                    </h3>
                  </div>
                </div>

                {product?.category === "case" && (
                  <div className={style.category_details}>
                    <h3>
                      Front USB : {product?.specifications?.front_Panel_USB}
                    </h3>
                    <h3>
                      Max GPU Length :{" "}
                      {product?.specifications?.maximum_Video_Card_Length}
                    </h3>
                    <h3>
                      Dimensions : {product?.specifications?.dimensions[0]}
                    </h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "mouse" && (
                  <div className={style.category_details}>
                    <h3>Max DPI : {product?.maximum_dpi}</h3>
                    <h3>Manufacturer : {product?.manufacturer}</h3>
                  </div>
                )}
                {product?.category === "keyboard" && (
                  <div className={style.category_details}>
                    <h3>Style : {product?.style}</h3>
                    <h3>Switch Type : {product?.switch_type}</h3>
                    <h3>Connection Type : {product?.connection_type}</h3>
                    <h3>Manufacturer : {product?.manufacturer}</h3>
                  </div>
                )}
                {product?.category === "monitor" && (
                  <div className={style.category_details}>
                    <h3>Screen Size : {product?.screen_size}</h3>
                    <h3>Resolution : {product?.resolution}</h3>
                    <h3>Frames : {product?.refresh_rate}</h3>
                    <h3>Widescreen : {product?.specifications?.Widescreen}</h3>
                    <h3>
                      Built-in Speakers :{" "}
                      {product?.specifications["Built-in Speakers"]}
                    </h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "speaker" && (
                  <div className={style.category_details}>
                    <h3>
                      Power : {product?.specifications["Power (Front, Each)"]}
                    </h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "powerSupply" && (
                  <div className={style.category_details}>
                    <h3>Wattage : {product?.wattage}</h3>
                    <h3>Efficiency Rating : {product?.efficiency_rating}</h3>
                    <h3>Length : {product?.specifications["Length"]}</h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "motherboard" && (
                  <div className={style.category_details}>
                    <h3>Socket : {product?.socket}</h3>
                    <h3>Memory Max : {product?.memory_max}</h3>
                    <h3>Memory Slots : {product?.memory_slots}</h3>
                    <h3>Efficiency Rating : {product?.efficiency_rating}</h3>
                    <h3>Chipset : {product?.specifications["Chipset"]}</h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "memory" && (
                  <div className={style.category_details}>
                    <h3>Speed : {product?.speed}</h3>
                    <h3>Price Per gb : {product["price_/_gb"]}</h3>
                    <h3>Voltage : {product?.specifications["Voltage"]}</h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "hardDesk" && (
                  <div className={style.category_details}>
                    <h3>Capacity : {product?.capacity}</h3>
                    <h3>Interface : {product?.interface}</h3>
                    <h3>Type : {product?.type}</h3>
                    <h3>Price Per gb : {product["price_/_gb"]}</h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "cpu" && (
                  <div className={style.category_details}>
                    <h3>Core Count : {product?.core_count}</h3>
                    <h3>
                      Integrated Graphics : {product?.integrated_graphics}
                    </h3>
                    <h3>Socket : {product?.socket}</h3>
                    <h3>
                      Includes Cooler :{" "}
                      {product?.specifications["Includes_Cooler"]}
                    </h3>
                    <h3>
                      Simultaneous Multithreading :{" "}
                      {product?.specifications["simultaneous-multithreading"]}
                    </h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "fan" && (
                  <div className={style.category_details}>
                    <h3>RPM : {product?.rpm[0]}</h3>

                    <h3>AirFlow : {product?.airflow[0]}</h3>
                    <h3>
                      Includes Cooler :{" "}
                      {product?.specifications["Static_pressure"]}
                    </h3>

                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}
                {product?.category === "gpu" && (
                  <div className={style.category_details}>
                    <h3>Chipset : {product?.chipset}</h3>

                    <h3>Interface : {product?.specifications["Interface"]}</h3>
                    <h3>
                      Manufacturer : {product?.specifications?.manufacturer}
                    </h3>
                  </div>
                )}

                {product?.color && (
                  <div className={style.colors}>
                    <span>Color</span>
                    {colors}
                  </div>
                )}

                <div className={style.actions}>
                  <div className={style.quantity}>
                    <button onClick={decreaseQuantity} className="decrease_btn">
                      -
                    </button>
                    <span>|</span>
                    <span className={style.product_qty}>{productQty}</span>
                    <span>|</span>
                    <button onClick={increaseQuantity} className="increase_btn">
                      +
                    </button>
                  </div>
                  <div className={style.buttons}>
                    <button className="favorite">
                      {<FavoriteBorderIcon sx={{ fontSize: 20 }} />}
                    </button>
                    <span>|</span>
                    <button className="more">
                      {<ZoomInIcon sx={{ fontSize: 20 }} />}
                    </button>
                    <span>|</span>
                    <button className="refresh">
                      {<AutorenewIcon sx={{ fontSize: 20 }} />}
                    </button>
                    <span>|</span>
                    <button className="add_to_cart">
                      {<AddShoppingCartIcon sx={{ fontSize: 20 }} />}
                    </button>
                  </div>
                </div>
                <div className={style.product_gallery}>
                  <button>
                    {<KeyboardArrowLeftIcon onClick={previousGalleryImg} />}
                  </button>
                  <div className={style.gallery}>{productGallery}</div>
                  <button>
                    {<KeyboardArrowRightIcon onClick={nextGalleryImg} />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
