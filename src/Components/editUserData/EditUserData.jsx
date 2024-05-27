import { useForm, Controller } from "react-hook-form";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import useUpdateDoc from "../../hooks/useUpdateDoc";
import { useSelector } from "react-redux";
import styles from "./editUserData.module.css";

function EditProfile({ user }) {
  const { handleSubmit, control, setError, formState } = useForm();
  const { errors } = formState;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { update } = useUpdateDoc("users", currentUser._id);
  const onSubmit = (data) => {
    update({
      displayName: data.name,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address,
      photoURL: data.photo,
    });
  };
  return (
    <div className={styles.editProfile_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.editProfile_content}>
          <div className={styles.formField}>
            <div>
              <FaceIcon />
            </div>
            <Controller
              name="name"
              control={control}
              defaultValue={user.displayName || "add user name"}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <>
                  <input type="text" {...field} />
                  {errors.name && (
                    <p className={styles.error}>{errors.name.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className={styles.formField}>
            <div>
              <EmailIcon />
            </div>
            <Controller
              name="email"
              control={control}
              defaultValue={user.email || "add email"}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <>
                  <input type="text" {...field} />
                  {errors.email && (
                    <p className={styles.error}>{errors.email.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className={styles.formField}>
            <div>
              <PhoneIcon />
            </div>
            <Controller
              name="phone"
              control={control}
              defaultValue={user.phoneNumber || "add a phone number"}
              rules={{ required: "Phone is required" }}
              render={({ field }) => (
                <>
                  <input type="text" {...field} />
                  {errors.phone && (
                    <p className={styles.error}>{errors.phone.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className={styles.formField}>
            <div>
              <LocationOnIcon />
            </div>
            <Controller
              name="address"
              control={control}
              defaultValue={user.address || "add new address"}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <>
                  <input type="text" {...field} />
                  {errors.address && (
                    <p className={styles.error}>{errors.address.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className={styles.formField}>
            <div>
              <CameraAltIcon />
            </div>
            <Controller
              name="photo"
              control={control}
              defaultValue={user.photoURL || "add your photo URL"}
              rules={{ required: "Photo is required" }}
              render={({ field }) => (
                <>
                  <input type="text" {...field} />
                  {errors.photo && (
                    <p className={styles.error}>{errors.photo.message}</p>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
