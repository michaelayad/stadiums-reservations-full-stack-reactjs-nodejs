import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import OwnerSignup from "./pages/ownerSignup/ownerSignup.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { login, logout, isLogin } from "./store/reducers/authReducer";
import PlayerSignup from "./pages/playerSignup/playerSignup";
import OwnerLogin from "./pages/ownerLogin/ownerLogin";
import PlayerLogin from "./pages/playerLogin/playerLogin";
import Contact from "./pages/contact/contact";
import axiosInstance from "./axios/axiosInstance";
import Profile from "./pages/profile/profile";
import AllStadiums from "./pages/allStadiums/allStadiums";
import StadiumDetails from "./pages/stadiumDetails/stadiumDetails";
import AddStadium from "./pages/addStadium/addStadium";
import AddHours from "./pages/addHours/addHours";
import Reservation from "./pages/reservation/reservation";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("type");
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    // console.log(token, type)
    if (token && type) {
      let config = {
        headers: {
          token: token,
        },
      };
      axiosInstance
        .get(`/${type}`, config)
        .then((res) => {
          // console.log(res.data);

          dispatch(login({ user: res.data[type], type: type }));
        })
        .catch((err) => { });
    }
    else {
      dispatch(logout());
    }
  }, [token]);
  console.log(user);
  return (
    <div className="App" dir="rtl">
      {/* {user.isAuthenticated ? <></> : <Header />
      } */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/owner-signup" element={!user.isAuthenticated ? <OwnerSignup /> : <Navigate to="/" />} />

        <Route path="/player-signup" element={!user.isAuthenticated ? <PlayerSignup /> : <Navigate to="/" />} />
        <Route path="/owner-login" element={!user.isAuthenticated ? <OwnerLogin /> : <Navigate to="/" />} />
        <Route path="/player-login" element={!user.isAuthenticated ? <PlayerLogin /> : <Navigate to="/" />} />
        <Route path="/Profile" element={user.isAuthenticated ? <Profile /> : <Navigate to="/" />} />
        <Route path="/add-stadium" element={user.isAuthenticated &&user.type==="owner" ? <AddStadium /> : <Navigate to="/" />} />
        <Route path="/add-hours/:id" element={user.isAuthenticated &&user.type==="owner" ? <AddHours /> : <Navigate to="/" />} />
        <Route path="/reservation/:id" element={user.isAuthenticated &&user.type==="player" ? <Reservation /> : <Navigate to="/" />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all-stadiums" element={<AllStadiums />} />
        <Route path="/stadium/:id" element={<StadiumDetails />} />



      </Routes>
      <Footer />
    </div>
  );
}

export default App;
