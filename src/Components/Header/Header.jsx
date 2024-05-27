import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Logo from "../logo/Logo";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logout from "../../Components/logout/Logout";
import styles from "./header.module.css";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Header = (props) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    let newNavItems = [];
    if (!isLoggedIn) {
      newNavItems = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "Login", path: "/login" },
        { label: "My PC", path: "/my-pc" },
        { label: "Wishlist", path: "/wishlist" },
        { label: "Cart", path: "/cart" },
      ];
    } else {
      newNavItems = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "My PC", path: "/my-pc" },
        { label: "Wishlist", path: "/wishlist" },
        { label: "Cart", path: "/cart" },
        { label: "Profile", path: "/profile" },
        { label: "Sell", path: "/sell-your-product" },
        { label: "logout" },
      ];
    }
    setNavItems(newNavItems);
  }, [isLoggedIn]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography className={styles.nav_cross_per} variant="h6" sx={{ my: 2 }}>
        <CloseIcon className={styles.nav_cross} />
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {item.label === "logout" ? (
                <Logout />
              ) : (
                <React.Fragment key={item.label}>
                  {item.label === "Profile" && isLoggedIn ? (
                    <NavLink className={styles.nav_links} to={item.path}>
                      <img
                        src={currentUser.photoURL || "./imgs/userIMG.jpg"}
                        alt="Profile"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    </NavLink>
                  ) : (
                    <NavLink
                      key={item.label}
                      className={styles.nav_links}
                      to={item.path}
                    >
                      {item.label !== "Wishlist" &&
                        item.label !== "Cart" &&
                        item.label}
                      {item.label === "Wishlist" && <FavoriteIcon />}
                      {item.label === "Cart" && <ShoppingCartIcon />}
                    </NavLink>
                  )}
                </React.Fragment>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="#000"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
          >
            {/* <figure className={styles.nav_logo}>
              <Link to="/">
                <img className={styles.logo_img} src="imgs/logo.svg" alt=".." />
                <span className={styles.logo_na}>TechnoMatic</span>
              </Link>
            </figure> */}
            <Logo />
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            {navItems.map((item) =>
              item.label === "logout" ? (
                <Logout key={item.label} />
              ) : (
                <React.Fragment key={item.label}>
                  {item.label === "Profile" ? (
                    isLoggedIn ? (
                      <NavLink className={styles.nav_links} to={item.path}>
                        <img
                          src={currentUser.photoURL || "imgs/userIMG.jpg"}
                          alt="Profile"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                        />
                      </NavLink>
                    ) : (
                      <NavLink className={styles.nav_links} to={item.path}>
                        {item.label}
                      </NavLink>
                    )
                  ) : (
                    <NavLink className={styles.nav_links} to={item.path}>
                      {item.label !== "Wishlist" &&
                        item.label !== "Cart" &&
                        item.label}
                      {item.label === "Wishlist" && <FavoriteIcon />}
                      {item.label === "Cart" && <ShoppingCartIcon />}
                    </NavLink>
                  )}
                </React.Fragment>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
