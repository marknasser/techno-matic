import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPc from "./pages/myPc/MyPc";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Profile from "./pages/profile/Profile";
import Shop from "./pages/shop/Shop";
import Signup from "./pages/signup/Signup";
import WishList from "./pages/wishList/WishList";
import MyPcSelect from "./pages/myPcSelect/myPcSelect";
import Protection from "./Components/protection/Protection";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor } from "./Redux/Store/store";
import store from "./Redux/Store/store";
import SellUserProduct from "./pages/sellUserProduct/SellUserProduct";
import About from "./pages/about/About";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Header />
          <div className="flex flex-col min-h-screen gap-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/profile"
                element={
                  <Protection>
                    <Profile />
                  </Protection>
                }
              />
              <Route
                path="/cart"
                element={
                  <Protection>
                    <Cart />
                  </Protection>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <Protection>
                    <WishList />
                  </Protection>
                }
              />
              <Route
                path="/my-pc"
                element={
                  <Protection>
                    <MyPc />
                  </Protection>
                }
              />
              <Route
                path="/my-pc-select/:category"
                element={
                  <Protection>
                    <MyPcSelect />
                  </Protection>
                }
              />
              <Route
                path="/sell-your-product"
                element={
                  <Protection>
                    <SellUserProduct />
                  </Protection>
                }
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
