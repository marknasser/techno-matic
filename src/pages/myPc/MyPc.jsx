/* eslint-disable react-hooks/rules-of-hooks */
import PageBanner from "../../Components/pageBanner/PageBanner";
import CheckoutPopup from "../../Components/checkoutPopup/CheckoutPopup";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import style from "./MyPc.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCardRows from "../../Components/productCardRows/ProductCardRows";
import { useEffect, useState } from "react";
import { removeFromPc, initDbData } from "../../Redux/Slices/myPcDataSlice";
import { removeFromCart } from "../../Redux/Slices/myPcCartSlice";
import { open, close } from "../../Redux/Slices/myPcCheckoutPopup";
import { userCol, auth } from "../../config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { getDocs, query, setDoc, where } from "firebase/firestore";
import { useMemo } from "react";

export default function MyPc() {
  const dispatch = useDispatch();
  const myPcData = useSelector((state) => state.myPcData.myPcData);
  const myPcCart = useSelector((state) => state.myPcCart.myPcCart);
  const myPcCheckoutPopup = useSelector(
    (state) => state.myPcCheckoutPopup.open
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceAfterDisc, setTotalPriceAfterDisc] = useState(0);
  const [userId, setUserId] = useState("");
  const [user] = useAuthState(auth);
  const currentUser = useMemo(
    () => user && query(userCol, where("uid", "==", user.uid)),
    [user]
  );
  // useEffect(() => {
  //   fetch("/computer_parts-data.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       data.map((product) => {
  //         addDoc(productsCol, product);
  //       });
  //     });
  // }, []);
  // const [products] = useCollectionData(productsCol);
  // console.log(products);
  const [currentUserData] = useCollectionData(currentUser);
  useEffect(() => {
    if (currentUserData) {
      dispatch(initDbData(currentUserData[0]?.myPc));
    }
    console.log(currentUserData);
    console.log(currentUser);
  }, [dispatch, userId]);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     if (user) {
  //       try {
  //         const querySnapshot = await getDocs(
  //           query(userCol, where("uid", "==", user.uid))
  //         );

  //         const currentUserData = querySnapshot.docs[0]?.data();

  //         dispatch(initDbData(currentUserData?.myPc));
  //         console.log(currentUserData);
  //       } catch (error) {
  //         console.error("Error fetching user data:", error);
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, [user]);
  useEffect(() => {
    const updateUser = async () => {
      setUserId(user?.uid);
      if (user && userId) {
        try {
          const querySnapshot = await getDocs(
            query(userCol, where("uid", "==", userId))
          );
          const currentUser = querySnapshot.docs[0];

          if (currentUser) {
            const userDocRef = currentUser.ref;

            const updatedUserData = {
              myPc: myPcData,
            };

            await setDoc(userDocRef, updatedUserData, { merge: true });
          } else {
            console.error("User not found");
          }
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
    };

    updateUser();
  }, [myPcCart, myPcData, user, userId]);

  useEffect(() => {
    setTotalPrice(0);
    myPcCart?.map((product) => {
      setTotalPrice((prev) => prev + product.totalPrice.current);
    });
  }, [myPcCart]);
  useEffect(() => {
    setTotalPriceAfterDisc(totalPrice - totalPrice * 0.15);
  }, [totalPrice]);

  const removeProduct = (category) => {
    dispatch(removeFromCart(myPcData[category]));
    dispatch(removeFromPc(category));
  };
  const popupClose = () => {
    dispatch(close());
  };

  return (
    <section id="my-pc">
      <PageBanner page={"Collect Your PC"} />
      <div className="container mx-auto">
        <div className={style.pc_parts}>
          <div className={style.left}>
            <figure>
              <img src="/public/imgs/pc parts/Speakers.png" alt="" />
              {myPcData?.speaker === "" ? (
                <Link to="/my-pc-select/speaker">
                  <AddIcon />
                </Link>
              ) : (
                <span className={style.selectedProduct}>
                  {myPcData?.speaker}
                  <button onClick={() => removeProduct("speaker")}>
                    <HighlightOffIcon />
                  </button>
                </span>
              )}
            </figure>
          </div>
          <div className={style.mid}>
            <figure>
              <img src="/public/imgs/pc parts/Monitor.png" alt="" />

              {myPcData?.monitor === "" ? (
                <Link to="/my-pc-select/monitor">
                  <AddIcon />
                </Link>
              ) : (
                <span className={style.selectedProduct}>
                  {myPcData?.monitor}
                  <button onClick={() => removeProduct("monitor")}>
                    <HighlightOffIcon />
                  </button>
                </span>
              )}
            </figure>
            <div className={style.bottom}>
              <figure>
                <img src="/public/imgs/pc parts/Keyboard.png" alt="" />

                {myPcData?.keyboard === "" ? (
                  <Link to="/my-pc-select/keyboard">
                    <AddIcon />
                  </Link>
                ) : (
                  <span className={style.selectedProduct}>
                    {myPcData?.keyboard}
                    <button onClick={() => removeProduct("keyboard")}>
                      <HighlightOffIcon />
                    </button>
                  </span>
                )}
              </figure>
              <figure>
                <img src="/public/imgs/pc parts/Mouse.png" alt="" />

                {myPcData?.mouse === "" ? (
                  <Link className={style.mouse_add} to="/my-pc-select/mouse">
                    <AddIcon />
                  </Link>
                ) : (
                  <span className={style.selectedProduct}>
                    {myPcData?.mouse}
                    <button onClick={() => removeProduct("mouse")}>
                      <HighlightOffIcon />
                    </button>
                  </span>
                )}
              </figure>
            </div>
          </div>
          <div className={style.right}>
            <figure>
              <img src="/public/imgs/pc parts/Case.png" alt="" />

              <Link to="/my-pc-select/case-hardware">
                <AddIcon />
              </Link>
            </figure>
          </div>
        </div>
        {myPcCart?.length > 0 && (
          <div className={style.added}>
            <h2>Your PC</h2>
            {myPcCart.map((product) => {
              return <ProductCardRows key={product.id} product={product} />;
            })}
            <div className={style.checkout}>
              {myPcCart.length > 11 ? (
                <button onClick={() => dispatch(open())}>Checkout</button>
              ) : (
                <button
                  disabled
                  title="You Must Collect All of Your Pc Components"
                >
                  Checkout
                </button>
              )}

              {myPcCart.length > 11 && (
                <span className={style.old_total_price}>
                  <span className={style.price_label}>Old Total Price</span>${" "}
                  {totalPrice.toFixed(2)}
                </span>
              )}

              <span className={style.total_price}>
                <span className={style.price_label}>Total Price</span>${" "}
                {myPcCart.length > 11
                  ? totalPriceAfterDisc.toFixed(2)
                  : totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}
        <CheckoutPopup
          onClose={popupClose}
          selectedValue="hello"
          totalPrice={totalPriceAfterDisc}
          open={myPcCheckoutPopup}
        />
      </div>
    </section>
  );
}
