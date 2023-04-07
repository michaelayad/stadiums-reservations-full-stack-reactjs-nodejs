/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { login, logout, isLogin } from "../../store/reducers/authReducer";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo4.png'
const Header = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        dispatch(logout());
    }
    return (<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <div className="d-flex">
                        <img
                            src={logo}
                            alt=""
                            width="50"
                            height="40"
                            className="d-inline-block align-text-top"
                        />
                        <h4>ملاعبنا</h4>
                    </div>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">الصفحة الرئيسية</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/all-stadiums">كل الملاعب</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">عن الموقع</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">شكاوى واقتراحات</Link>
                        </li>
                        {
                            user.isAuthenticated && <li className="nav-item" id="sign-out">
                                <Link className="nav-link" to="/profile"  >الحساب</Link>
                            </li>
                        }
                        {
                            user.isAuthenticated && <li className="nav-item" id="sign-out">
                                <a className="nav-link" onClick={handleLogout}  >تسجيل خروج</a>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
        {!user.isAuthenticated && <ul className="nav bg-light justify-content-center " id="register">
            <li className="nav-item">
                <Link
                    className="nav-link text-secondary "
                    aria-current="page"
                    to="/owner-signup"
                    dir="rtl"
                >انضم كصاحب الملعب</Link
                >
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link text-secondary "
                    aria-current="page"
                    to="/owner-login"
                >تسجيل دخول كصاحب ملعب</Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link text-secondary "
                    aria-current="page"
                    to="/player-signup"
                >انضم كلاعب</Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link text-secondary "
                    aria-current="page"
                    to="/player-login"
                >تسجيل دخول كلاعب</Link>
            </li>
        </ul>}

    </div>);
}

export default Header;