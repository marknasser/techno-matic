import { Stack } from "@mui/material";
import { userCol, auth } from "../../config/firebase/firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Redux/Store/auth-slice";

import SignupWithGmail from "../../Components/signupGmail/SignupWithGmail";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const isUserExist = useMemo(
    () => user && query(userCol, where("uid", "==", user.user.uid)),
    [user]
  );

  const [users] = useCollectionData(isUserExist);

  useEffect(() => {
    if (!!user && !error && !!users && users.length > 0) {
      getDocs(isUserExist).then((querySnapshot) => {
        dispatch(
          signup({
            token: user.user.accessToken,
            user: { _id: querySnapshot.docs[0].id, ...users[0] },
          })
        );
        navigate("/");
      });
    }
  }, [user, error, users]);

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
          REGISTERED CUSTOMERS
        </h1>
        <p className="text-xs md:text-base text-neutral-400">
          If you have an account with us, Please login!
        </p>
        <input
          className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
          placeholder="Enter Your Email"
          required
          style={{ background: "#efefef" }}
          {...register("email", { required: true })}
        />
        <input
          className="w-full p-3 pl-3 outline-none text-neutral-400 text-xs md:text-base"
          type="password"
          placeholder="Enter Your Password"
          required
          style={{ background: "#efefef" }}
          {...register("password", { required: true })}
        />

        <button
          type="submit"
          style={{ background: "#C87065", margin: "40px auto 0" }}
          className="text-white px-7 py-2 text-xs sm:text-sm md:text-base"
          disabled={loading}
        >
          {!loading ? "LOGIN" : "loading ..."}
        </button>
        <p style={{ margin: "20px auto" }}>
          Create An Account ?!
          <a
            className="text-blue-700 font-bold cursor-pointer underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </a>
        </p>
        <SignupWithGmail text="LogIn" />
      </Stack>
    </form>
  );
}
