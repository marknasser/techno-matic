import { useState } from "react";
import { useSelector } from "react-redux";
import UserData from "../../Components/usersData/UserData";
import EditUserData from "../../Components/editUserData/EditUserData";
import ChangePassword from "../../Components/changePass/ChangePassword";
import UserProducts from "../../Components/userProducts/UserProducts";
import { Card, Typography, List, ListItem } from "@material-tailwind/react";
import styles from "./profile.module.css";

const Profile = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [activeButton, setActiveButton] = useState("UserData");
  const [activeTab, setActiveTab] = useState("UserData");

  const handleEditClickUserBtn = () => {
    setActiveButton("UserData");
    setActiveTab("UserData");
  };

  const handleEditClickEditBtn = () => {
    setActiveButton("EditUserData");
    setActiveTab("EditUserData");
  };

  const handleEditClickChangePassBtn = () => {
    setActiveButton("ChangePass");
    setActiveTab("ChangePass");
  };

  const handleMyProductsClick = () => {
    setActiveButton("MyProducts");
    setActiveTab("MyProducts");
  };

  return (
    <div className={styles.profile_container}>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 flex-col">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            <span className="text-base md:text-base lg:text-lg xl:text-xl">
              {currentUser.displayName}
            </span>
          </Typography>
        </div>
        <List>
          <ListItem
            className={
              activeButton === "UserData"
                ? styles.active_select
                : styles.not_active_select
            }
            onClick={handleEditClickUserBtn}
          >
            User Data
          </ListItem>
          {currentUser.providedBy !== "gmail" && (
            <>
              <ListItem
                className={
                  activeButton === "EditUserData"
                    ? styles.active_select
                    : styles.not_active_select
                }
                onClick={handleEditClickEditBtn}
              >
                Edit User Data
              </ListItem>
              <ListItem
                className={
                  activeButton === "ChangePass"
                    ? styles.active_select
                    : styles.not_active_select
                }
                onClick={handleEditClickChangePassBtn}
              >
                Change Password
              </ListItem>
            </>
          )}
          <ListItem
            className={
              activeButton === "MyProducts"
                ? styles.active_select
                : styles.not_active_select
            }
            onClick={handleMyProductsClick}
          >
            My Products
          </ListItem>
        </List>
      </Card>
      <div className={styles.profile_content}>
        {activeTab === "EditUserData" && currentUser.providedBy !== "gmail" ? (
          <EditUserData user={currentUser} />
        ) : activeTab === "ChangePass" && currentUser.providedBy !== "gmail" ? (
          <ChangePassword />
        ) : activeTab === "MyProducts" ? (
          <UserProducts user={currentUser._id} />
        ) : (
          <UserData user={currentUser} />
        )}
      </div>
    </div>
  );
};

export default Profile;
