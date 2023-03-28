import { useState } from "react";
import axiosInstance from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { login, logout, isLogin } from "../../store/reducers/authReducer"
import { useDispatch, useSelector } from "react-redux";


const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [sendError, setSendError] = useState("");

    const navigate = useNavigate()


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
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
        if (value.length >= 4) {
            setDescriptionValid(true)
            setDescriptionError(false)
        }
        else {
            setDescriptionValid(false)
            setDescriptionError(true)
        }
    }


    const handleSabmit = (event) => {
        const signupData = { name: name, email: email, description: description }

        event.preventDefault();

        if (nameValid && emailValid && descriptionValid) {
            console.log("ssssssssssss")
            axiosInstance.post('/contact', signupData).then((res) => {
                console.log(res)

                if (res.data.type === "Success") {


                    navigate('/')


                } else {
                    setSendError("خطأ فى إرسال اقتراحك ، حاول مرة اخرى ")

                }
            }).catch((err) => {
                console.log(err)
                setSendError("خطأ فى إرسال اقتراحك ، حاول مرة اخرى ")

            })
        }
    }
    return (<>
        <div className="register-main container-fluid py-5">
            <div className="container p-5">
                <div
                    className="col-12 col-lg-8 bg-white border-1 border-light shadow-lg rounded-4 p-4 m-auto"
                >
                    <div className="text-center border-bottom">
                        <h3 className="fw-bold">ارسال شكوى او اقتراح</h3>
                    </div>
                    <form onSubmit={(e) => { handleSabmit(e) }}>
                        <div className="row py-3">
                            <div className="col-12 col-md-6 py-2">
                                <label for="uname" className="form-label">الاسم بالكامل:</label>
                                <input
                                    type="text"
                                    className={`form-control ${((!nameValid && nameError) ? "is-invalid" : "")} ${((nameValid && !nameError) ? "is-valid" : "")}`}
                                    id="uname"
                                    placeholder="الاسم بالكامل"
                                    name="uname"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                />
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
                                    className="alert alert-danger invalid-feedback text-danger d-none email-exist"
                                    role="alert"
                                >
                                    البريد الالكترونى مسجل بالفعل
                                </div>
                            </div>
                            <div className="col-12 py-2">
                                <label for="suggestion" className="form-label"
                                >الشكوى او الاقتراح:</label >
                                <textarea
                                    className={`form-control ${((!descriptionValid && descriptionError) ? "is-invalid" : "")} ${((descriptionValid && !descriptionError) ? "is-valid" : "")}`}
                                    rows="5"
                                    id="suggestion"
                                    placeholder="الشكوى او الاقتراح"
                                    name="suggestion"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    required
                                ></textarea>
                                <div
                                    className="alert alert-danger invalid-feedback text-danger"
                                    role="alert"
                                >
                                    من فضلك قم بإدخال الشكوى او الاقتراح
                                </div>
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-center  text-danger"
                        >
                            {sendError}
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-success" type="submit">ارسال</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);

}

export default Contact;
