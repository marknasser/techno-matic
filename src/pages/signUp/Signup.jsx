import { addDoc, query, where } from "firebase/firestore";
import { auth, userCol } from "../../config/firebase/firebase";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useEffect, useMemo } from "react";

import SignupWithGmail from "../../Components/signupGmail/SignupWithGmail";
import { Stack } from "@mui/material";
import { signup } from "../../Redux/Store/auth-slice";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userAuth] = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const addNewDocument = async () => {
    const newUser = {
      uid: userAuth?.uid,
      photoURL: watch("photoURL") || "",
      displayName: watch("displayName") || "",
      phoneNumber: watch("phoneNumber") || "",
      address: watch("address") || "",
      providedBy: "email",
      email: userAuth?.email,
      wishlist: [],
      cart: [],
      myPc: myPc,
    };
    const newDocRef = await addDoc(userCol, newUser);
    dispatch(
      signup({
        token: userAuth.accessToken,
        user: { _id: newDocRef.id, ...newUser },
      })
    );
    navigate("/");
  };

  useEffect(() => {
    if (!error && userAuth && user) {
      console.log("new acc with email@pass has been created");
      addNewDocument();
    }
  }, [userAuth, error]);

  const onSubmitForm = (data) => {
    createUserWithEmailAndPassword(data.email, data.password);
  };

  return (
    <form
      className="p-3 md:p-10 bg-white w-1/2 m-auto mt-24 "
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="start"
        spacing={2}
      >
        <h1 className="text-xs sm:text-sm md:text-lg text-neutral-700 font-bold">
          NEW CUSTOMERS
        </h1>
        <p className="text-xs md:text-base text-neutral-400">
          If you have an account with us, Please login!
        </p>
        <input
          className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
          placeholder="Enter Your Name"
          style={{ background: "#efefef" }}
          {...register("displayName", { required: true, maxLength: 20 })}
        />
        <input
          className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
          placeholder="Enter Your Email"
          style={{ background: "#efefef" }}
          {...register("email", { required: true })}
        />
        <input
          className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
          type="password"
          placeholder="Enter Your Password"
          style={{ background: "#efefef" }}
          {...register("password", { required: true })}
        />
        <p>(OPTIONAL)</p>
        <div className="flex flex-col lg:flex-row gap-3">
          <input
            className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
            placeholder="Your Photo Link"
            {...register("photoURL")}
            style={{ background: "#efefef" }}
            type="text"
          />
          <input
            className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
            placeholder="Your Phone"
            style={{ background: "#efefef" }}
            {...register("phoneNumber")}
          />
          <input
            className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
            placeholder="Your address"
            style={{ background: "#efefef" }}
            {...register("address")}
          />
        </div>
        <button
          type="submit"
          style={{ background: "#C87065", margin: "40px auto 0" }}
          className="text-white px-7 py-2 text-xs sm:text-sm md:text-base"
          disabled={loading}
        >
          {!loading ? "SIGNUP" : "loading ..."}
        </button>
        <p style={{ margin: "20px auto" }}>
          Already have an account ?!
          <a
            className="text-blue-700 font-bold cursor-pointer underline"
            onClick={() => navigate("/login")}
          >
            LogIn
          </a>
        </p>
        <SignupWithGmail />
      </Stack>
    </form>
  );
}
