import { useState } from "react";
import axiosInstance from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { login, logout, isLogin } from "../../store/reducers/authReducer"
import { useDispatch, useSelector } from "react-redux";



const OwnerLogin = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);


    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
    }
    const handlePassChange = (event) => {
        const value = event.target.value;
        setPass(value);
    }



    const handleSabmit = (event) => {
        const signupData = { email: email, password: pass }

        event.preventDefault();


        console.log("ssssssssssss")
        axiosInstance.post('/owner/login', signupData).then((res) => {
            // console.log(res)

            if (res.data.type === "Success") {

                localStorage.setItem('token', res.data.token);
                localStorage.setItem('type', 'owner');
                dispatch(login({ user: res.data.owner, type: "owner" }))
                console.log(user)
                navigate('/')


            } else {
                setLoginError(" خطأ فى البريد الالكترونى او الرقم السرى")

            }
        }).catch((err) => {
            // console.log(err)
            setLoginError(" خطأ فى البريد الالكترونى او الرقم السرى")

        })

    }
    return (
        <>
            <div className="register-main container-fluid py-5">
                <div className="container p-5">
                    <div
                        className="col-12 col-lg-8 bg-white border-1 border-light shadow-lg rounded-4 p-4 m-auto"
                    >
                        <div className="text-center border-bottom">
                            <h3 className="fw-bold">تسجيل دخول كصاحب استاد</h3>
                        </div>
                        <form onSubmit={(e) => { handleSabmit(e) }}>
                            <div className="row py-3">
                                <div className="col-12 col-md-6 py-2">
                                    <label for="email" className="form-label">البريد الالكترونى:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="البريد الالكترونى"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />

                                </div>
                                <div className="col-12 col-md-6 py-2">
                                    <label for="pass" className="form-label">كلمة السر:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="pass"
                                        placeholder="كلمة السر"
                                        name="pass"
                                        value={pass}
                                        onChange={handlePassChange}
                                        required
                                    />

                                </div>
                            </div>
                            <div
                                className="d-flex justify-content-center  text-danger"
                            >
                                {loginError}
                            </div>
                            
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-success" type="submit">تسجيل دخول</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OwnerLogin;