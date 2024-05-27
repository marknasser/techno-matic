import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import PageBanner from "./../../Components/pageBanner/PageBanner";
import styles from "./wishList.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useUpdateDoc from "../../hooks/useUpdateDoc";

export default function WishList() {
  // const wishListData = useSelector((state) => state.wishListProducts.wishList);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { update } = useUpdateDoc("users", currentUser?._id || "dummm");
  const navigate = useNavigate();
  // console.log(wishListData);

  const handleCartClick = (product) => {
    if (!currentUser) return navigate("/login");

    let itemId = product.id;
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

  const handleRemove = (product) => {
    const updatedWishlist = currentUser.wishlist.filter(
      (el) => el.id !== product.id
    );
    update({ wishlist: updatedWishlist });
  };

  const trItems = currentUser?.wishlist?.map((product) => {
    return (
      <tr key={product.id} className="table-row" id={product.id}>
        <td className={styles.product_thumbnail}>
          <div className={styles.product_img}>
            <img src={product.image} alt="product img" />
          </div>
          <div className={styles.product_info}>
            <h4 className="title">{product.title?.slice(0, 30)}</h4>
            <p>
              <span>Color :</span> {product.color}
            </p>
            {/* <p>
              <span>Size : </span> SL
            </p> */}
          </div>
        </td>
        <td className={styles.product_price}>${product.price?.toFixed(2)}</td>
        <td className={styles.product_stock}>IN STOCK</td>
        <td className={styles.add_cart}>
          <button onClick={() => handleCartClick(product)}>
            <AddShoppingCartIcon className={styles.icon} />
          </button>
        </td>
        <td className={styles.remove_product}>
          <button onClick={() => handleRemove(product)}>
            <CloseIcon className={styles.icon} />
          </button>
        </td>
      </tr>
    );
  });

  console.log("hereeee", trItems);
  return (
    <div className={styles.wish_list}>
      <PageBanner page={"WishList"} />
      <div className={styles.page_area}>
        <div className={`container mx-auto`}>
          <div className={styles.page_area_content}>
            <div className={styles.tabs_content}>
              <div
                className={`${styles.wishlist_page} ${styles.page} ${styles.page_active}`}
              >
                <div className={styles.table_content}>
                  <table>
                    <thead>
                      <tr>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>STOCK STATUS</th>
                        <th>ADD TO CART</th>
                        <th>REMOVE</th>
                      </tr>
                    </thead>
                    <tbody>{trItems}</tbody>
                  </table>
                  {trItems && trItems.length <= 0 && (
                    <p className="text-center pt-7 text-sm capitalize text-gray-400">
                      Your wishList is currently empty.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
