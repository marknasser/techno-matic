import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./changePassword.module.css";

const ChangePassword = () => {
  const { handleSubmit, control, watch, setError, formState } = useForm();
  const { errors } = formState;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  const passwordMatch = (value) => {
    const newPassword = watch("newPassword");
    return newPassword === value || "Passwords do not match";
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "oldPassword":
        setShowOldPassword((prevShowPassword) => !prevShowPassword);
        break;
      case "newPassword":
        setShowNewPassword((prevShowPassword) => !prevShowPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.changepass_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.changepass_content}>
          <div className={styles.formField}>
            <div onClick={() => togglePasswordVisibility("oldPassword")}>
              {showOldPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
            <Controller
              name="oldPassword"
              control={control}
              defaultValue=""
              rules={{ required: "Old Password is required" }}
              render={({ field }) => (
                <>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Old Password"
                    {...field}
                  />
                  {errors.oldPassword && (
                    <p className={styles.error}>{errors.oldPassword.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className={styles.formField}>
            <div onClick={() => togglePasswordVisibility("newPassword")}>
              {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              rules={{ required: "New Password is required" }}
              render={({ field }) => (
                <>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    {...field}
                  />
                  {errors.newPassword && (
                    <p className={styles.error}>{errors.newPassword.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className={styles.formField}>
            <div onClick={() => togglePasswordVisibility("confirmPassword")}>
              {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </div>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm New Password is required",
                validate: passwordMatch,
              }}
              render={({ field }) => (
                <>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    {...field}
                  />
                  {errors.confirmPassword && (
                    <p className={styles.error}>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>
        <button
          type="submit"
          className={`${styles.submit_btn} text-white font-semibold py-2 px-4 rounded shadow-lg w-64 mx-auto `}
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
