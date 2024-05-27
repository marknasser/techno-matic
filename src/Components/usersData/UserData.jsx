import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FaceIcon from "@mui/icons-material/Face";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import styles from "./userData.module.css";

const UserData = ({ user }) => {
  const defaultPhotoURL = "imgs/userIMG.jpg";
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_left_content}>
        <img
          src={user.photoURL || defaultPhotoURL}
          alt={user.displayName}
          className={styles.user_photo}
        />
        <div className={styles.profile_left_content_w_i}>
          <div className={styles.profile_left_content_ele}>
            <div className={styles.profile_left_content_ele_svg}>
              <FaceIcon />
            </div>
            <p>
              <span> {user.displayName || "no user name "}</span>
            </p>
          </div>
          <div className={styles.profile_left_content_ele}>
            <div className={styles.profile_left_content_ele_svg}>
              <EmailIcon />
            </div>
            <p>
              <span> {user.email || "no email"}</span>
            </p>
          </div>
          <div className={styles.profile_left_content_ele}>
            <div className={styles.profile_left_content_ele_svg}>
              <PhoneIcon />
            </div>
            <p>
              <span> {user.phoneNumber || "no phone number"}</span>
            </p>
          </div>
          <div className={styles.profile_left_content_ele}>
            <div className={styles.profile_left_content_ele_svg}>
              <LocationOnIcon />
            </div>
            <p>
              <span> {user?.address || "no adress"}</span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.profile_right_content}>
        <p>
          <span className={styles.ele_svg}>
            <FavoriteIcon />
          </span>
          <span>{user.wishlist.length || "0"}</span>
        </p>
        <p>
          <span className={styles.ele_svg}>
            <ShoppingCartIcon />
          </span>
          <span>{user.cart.length || "0"}</span>
        </p>
      </div>
    </div>
  );
};

export default UserData;
