import React, { useEffect, useMemo } from "react";
import { addDoc, query, where, getDocs } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { userCol, auth } from "../../config/firebase/firebase";
import { useSignInWithGoogle, useAuthState } from "react-firebase-hooks/auth";
import { signup } from "../../Redux/Store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const myPc = {
  monitor: "",
  mouse: "",
  keyboard: "",
  speaker: "",
  caseHardWare: {
    case: "",
    ramOne: "",
    ramTwo: "",
    ramThree: "",
    ramFour: "",
    vga: "",
    powerSupply: "",
    board: "",
    cpu: "",
    hardDesk: "",
    secondaryHardDesk: "",
    fan: "",
  },
};
function SignupWithGmail({ text = "Sign Up" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const isUserExist = useMemo(
    () => user && query(userCol, where("uid", "==", user.uid)),
    [user]
  );

  const [users] = useCollectionData(isUserExist);

  const addNewDoc = async () => {
    const newUser = {
      uid: user?.uid,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      address: user?.address || null,
      providedBy: "gmail",
      wishlist: [],
      cart: [],
      myPc: myPc,
    };
    const docref = await addDoc(userCol, newUser);
    dispatch(
      signup({ token: user.accessToken, user: { _id: docref.id, ...newUser } })
    );
  };

  useEffect(() => {
    if (!!user && !!users && users.length === 0) {
      console.log("new acc with Gmail has been created");
      addNewDoc();
    }
    if (!!user && !!users && users.length > 0) {
      getDocs(isUserExist).then((querySnapshot) => {
        dispatch(
          signup({
            token: user.accessToken,
            user: { _id: querySnapshot.docs[0].id, ...users[0] },
          })
        );
        navigate("/");
      });
    }
  }, [user, users]);
  return (
    <button
      type="button"
      onClick={() => signInWithGoogle()}
      className="w-4/5 flex justify-center items-center rounded-2xl  shadow-lg hover:shadow-xl bg-slate-400 "
      style={{ margin: "auto" }}
    >
      <figure className="w-14">
        <img src="/imgs/prand/gmail-1.png" alt="" className="w-full" />
      </figure>
      <span className="font-semibold">{text} With Google</span>
    </button>
  );
}

export default SignupWithGmail;
