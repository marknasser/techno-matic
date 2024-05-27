/* eslint-disable react/prop-types */
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReactStars from "react-rating-stars-component";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import style from "./ProductCardCols.module.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useUpdateDoc from "../../hooks/useUpdateDoc";

export default function ProductCardCols({ product }) {
  const [isAddedWish, setIsAddedWish] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { update } = useUpdateDoc("users", currentUser?._id || "dummm");
  const navigate = useNavigate();

  const [wishList, setWishList] = useState(
    currentUser ? currentUser?.wishlist : []
  );

  useEffect(() => {
    setWishList(currentUser?.wishlist);
    wishList?.map((el) => {
      if (el.id == product?.id) {
        setIsAddedWish(true);
      }
    });
  }, []);

  const wishIcon = isAddedWish ? (
    <FavoriteIcon sx={{ fontSize: 20 }} style={{ color: "#e52424" }} />
  ) : (
    <FavoriteBorderIcon sx={{ fontSize: 20 }} />
  );

  const handleWishClick = () => {
    if (!currentUser) return navigate("/login");

    let itemId = product?.id;
    const exit = currentUser?.wishlist?.find((el) => el.id == itemId);

    if (!exit) {
      update({ wishlist: [...currentUser?.wishlist, product] });
    } else {
      setIsAddedWish(false);
      const updatedWishlist = currentUser?.wishlist?.filter(
        (el) => el.id !== exit.id
      );
      update({ wishlist: updatedWishlist });
    }

    setIsAddedWish(!isAddedWish);
  };

  const handleCartClick = () => {
    if (!currentUser) return navigate("/login");

    let itemId = product?.id;
    const exit = currentUser?.cart.find((el) => el.id == itemId);

    if (!exit) {
      update({ cart: [...currentUser?.cart, { ...product, count: 1 }] });
    } else {
      const updatedCart = currentUser.cart.map((item) =>
        item.id == itemId ? { ...item, count: +item.count + 1 } : item
      );
      update({ cart: updatedCart });
    }
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div className={`${style.product_card} card`} id={product?.id}>
      <figure className={style.product_img}>
        <span className={style.product_status}>New</span>
        <div className={style.product_prices}>
          <h3 className={style.product_price}>$ {product?.price}</h3>
        </div>
        <img src={product?.image} alt="" />
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
                activeColor="#C87065"
                isHalf={true}
                value={3.5}
              />
            </div>
          </div>
        </div>

        <div className={style.actions}>
          <div className={style.buttons}>
            <button className="favorite" onClick={handleWishClick}>
              {wishIcon}
            </button>
            <span>|</span>
            <Link to={`/product-details/${product.id}`} className="more">
              {<ZoomInIcon sx={{ fontSize: 20 }} />}
            </Link>
            <span>|</span>

            <button className="add_to_cart" onClick={handleCartClick}>
              {<AddShoppingCartIcon sx={{ fontSize: 20 }} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
