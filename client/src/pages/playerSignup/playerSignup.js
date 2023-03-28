import { useState } from "react";
import axiosInstance from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { login, logout, isLogin } from "../../store/reducers/authReducer"
import { useDispatch, useSelector } from "react-redux";



const PlayerSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [tel, setTel] = useState("");
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [passValid, setPassValid] = useState(false);
    const [confirmPassValid, setConfirmPassValid] = useState(false);
    const [telValid, setTelValid] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passError, setPassError] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [signupError, setSignupError] = useState("");

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);

    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
        if (value.length > 4 && value.indexOf(' ') !== -1) {
            setNameValid(true)
            setNameError(false)
        }
        else {
            setNameValid(false)
            setNameError(true)
        }
    }
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (regex.test(value)) {
            setEmailValid(true)
            setEmailError(false)
        }
        else {
            setEmailValid(false)
            setEmailError(true)
        }
    }
    const handlePassChange = (event) => {
        const value = event.target.value;
        setPass(value);
        if (value.length >= 8) {
            setPassValid(true)
            setPassError(false)
        }
        else {
            setPassValid(false)
            setPassError(true)
        }
    }
    const handleConfirmPassChange = (event) => {
        const value = event.target.value;
        setConfirmPass(value);
        if (value === pass) {
            setConfirmPassValid(true)
            setConfirmPassError(false)
        }
        else {
            setConfirmPassValid(false)
            setConfirmPassError(true)
        }
    }
    const handleTelChange = (event) => {
        const value = event.target.value;
        setTel(value);
        const regexPhone = /^(011|012|010|015)[0-9]{8}$/;
        if (regexPhone.test(value)) {
            setTelValid(true)
            setTelError(false)
        }
        else {
            setTelValid(false)
            setTelError(true)
        }
    }

    const handleSabmit = (event) => {
        const signupData = { name: name, email: email, password: pass, tel: tel }

        event.preventDefault();

        if (nameValid && emailValid && passValid && confirmPassValid && telValid) {
            console.log("ssssssssssss")
            axiosInstance.post('/player', signupData).then((res) => {
                console.log(res)

                if (res.data.type === "Success") {

                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('type', 'player');
                    dispatch(login({ user: res.data.owner, type: "player" }))
                    console.log(user)
                    navigate('/')


                } else {
                    setSignupError("خطأ فى التسجيل و تأكد من ادخال بريد الكترونى صحيح وغير مسجل من قبل")

                }
            }).catch((err) => {
                console.log(err)
                setSignupError("خطأ فى التسجيل و تأكد من ادخال بريد الكترونى صحيح وغير مسجل من قبل")

            })
        }
    }
    return (
        <>
            <div className="register-main container-fluid py-5">
                <div className="container p-5">
                    <div
                        className="col-12 col-lg-8 bg-white border-1 border-light shadow-lg rounded-4 p-4 m-auto"
                    >
                        <div className="text-center border-bottom">
                            <h3 className="fw-bold">انشاء حساب كلاعب</h3>
                        </div>
                        <form onSubmit={(e) => { handleSabmit(e) }}>
                            <div className="row py-3">
                                <div className="col-12 col-md-6 py-2">

                                    <label for="uname" className="form-label">اسم اللاعب:</label>
                                    <input
                                        type="text"
                                        className={`form-control ${((!nameValid && nameError) ? "is-invalid" : "")} ${((nameValid && !nameError) ? "is-valid" : "")}`}
                                        id="uname"
                                        value={name}
                                        placeholder="اسم اللاعب"
                                        name="uname"
                                        onChange={handleNameChange}
                                        required
                                    />
                                    { }
                                    <div
                                        className="alert alert-danger invalid-feedback text-danger"
                                        role="alert"
                                    >
                                        من فضلك قم بإدخال الاسم بالكامل صحيح
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 py-2">
                                    <label for="email" className="form-label">البريد الالكترونى:</label>
                                    <input
                                        type="email"
                                        className={`form-control ${((!emailValid && emailError) ? "is-invalid" : "")} ${((emailValid && !emailError) ? "is-valid" : "")}`}
                                        id="email"
                                        placeholder="البريد الالكترونى"
                                        name="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                    <div
                                        className="alert alert-danger invalid-feedback text-danger  email-error"
                                        role="alert"
                                    >
                                        قم بإدخال بريد الكترونى صحيح
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 py-2">
                                    <label for="pass" className="form-label">كلمة السر:</label>
                                    <input
                                        type="password"
                                        className={`form-control ${((!passValid && passError) ? "is-invalid" : "")} ${((passValid && !passError) ? "is-valid" : "")}`}
                                        id="pass"
                                        placeholder="كلمة السر"
                                        name="pass"
                                        value={pass}
                                        onChange={handlePassChange}
                                        required
                                    />
                                    <div
                                        className="alert alert-danger invalid-feedback text-danger"
                                        role="alert"
                                    >
                                        كلمة السر يجب ان تكون اكثر من 8 حروف او ارقام.
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 py-2">
                                    <label for="repeatPass" className="form-label"
                                    >تكرار كلمة السر:</label
                                    >
                                    <input
                                        type="password"
                                        className={`form-control ${((!confirmPassValid && confirmPassError) ? "is-invalid" : "")} ${((confirmPassValid && !confirmPassError) ? "is-valid" : "")}`}
                                        id="repeatPass"
                                        placeholder="تكرار كلمة السر"
                                        name="repeatPass"
                                        value={confirmPass}
                                        onChange={handleConfirmPassChange}
                                        required
                                    />
                                    <div
                                        className="alert alert-danger invalid-feedback text-danger"
                                        role="alert"
                                    >
                                        تأكد من تكرار كلمة السر نفسها
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 py-2">
                                    <label for="telNumber" className="form-label">رقم التليفون:</label>
                                    <input
                                        type="tel"
                                        className={`form-control ${((!telValid && telError) ? "is-invalid" : "")} ${((telValid && !telError) ? "is-valid" : "")}`}
                                        id="telNumber"
                                        placeholder="رقم التليفون"
                                        name="telNumber"
                                        value={tel}
                                        onChange={handleTelChange}
                                        required
                                    />
                                    <div
                                        className="alert alert-danger invalid-feedback text-danger"
                                        role="alert"
                                    >
                                        قم بإدخال رقم تليفون صحيح
                                    </div>
                                </div>
                            </div>
                            <div
                                className="d-flex justify-content-center  text-danger"
                            >
                                {signupError}
                            </div>

                            <div className="d-flex justify-content-center">
                                <button className="btn btn-success" type="submit">انشاء حساب</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div></>
    );
};

export default PlayerSignup;