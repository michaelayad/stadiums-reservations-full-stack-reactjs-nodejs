import { useState } from "react";
import axiosInstance from '../../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { login, logout, isLogin } from "../../store/reducers/authReducer"
import { useDispatch, useSelector } from "react-redux";


const AddStadium = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [address, setAddress] = useState("");
    const [hourPrice, setHourPrice] = useState("");
    const user = useSelector((state) => state.auth)





    const [titleValid, setTitleValid] = useState(false);
    const [imageURLValid, setImageURLValid] = useState(false);
    const [descriptionValid, setDescriptionValid] = useState(false);
    const [addressValid, setAddressValid] = useState(false);
    const [hourPriceValid, setHourPriceValid] = useState(false);

    const [titleError, setTitleError] = useState(false);
    const [imageURLError, setImageURLError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [hourPriceError, setHourPriceError] = useState(false);
    const token = localStorage.getItem("token");


    console.log(user)
    const [sendError, setSendError] = useState("");

    const navigate = useNavigate()


    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
        if (value.length > 4) {
            setTitleValid(true)
            setTitleError(false)
        }
        else {
            setTitleValid(false)
            setTitleError(true)
        }
    }
    const handleImageURLChange = (event) => {
        const value = event.target.value;
        setImageURL(value);
        if (value.length > 1) {
            setImageURLValid(true)
            setImageURLError(false)
        }
        else {
            setImageURLValid(false)
            setImageURLError(true)
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
    const handleHourPriceChange = (event) => {
        const value = event.target.value;
        setHourPrice(value);
        if (Number(value)) {
            setHourPriceValid(true)
            setHourPriceError(false)
        }
        else {
            setHourPriceValid(false)
            setHourPriceError(true)
        }
    }
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
        if (value.length > 1) {
            setAddressValid(true)
            setAddressError(false)
        }
        else {
            setAddressValid(false)
            setAddressError(true)
        }
    }


    const handleSabmit = (event) => {

        const stadiumData = { title: title, description: description, image: imageURL, hourPrice: hourPrice, address: address }

        event.preventDefault();

        if (titleValid && imageURLValid && addressValid && hourPriceValid && descriptionValid) {
            console.log("ssssssssssss")
            let config = {
                headers: {
                    token: token,
                },
            };
            axiosInstance.post('/stadium', stadiumData, config).then((res) => {
                console.log(res)

                if (res.data.type === "Success") {


                    navigate('/profile')


                } else {
                    setSendError("خطأ فى إضافة الملعب ، حاول مرة اخرى ")

                }
            }).catch((err) => {
                console.log(err)
                setSendError("خطأ فى إضافة الملعب ، حاول مرة اخرى ")

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
                        <h3 className="fw-bold">اضافة ملعب</h3>
                    </div>
                    <form onSubmit={(e) => { handleSabmit(e) }}>
                        <div className="row py-3">
                            <div className="col-12  py-2">
                                <label for="uname" className="form-label">اسم الملعب:</label>
                                <input
                                    type="text"
                                    className={`form-control ${((!titleValid && titleError) ? "is-invalid" : "")} ${((titleValid && !titleError) ? "is-valid" : "")}`}
                                    id="uname"
                                    placeholder="اسم الملعب"
                                    name="uname"
                                    value={title}
                                    onChange={handleTitleChange}
                                    required
                                />
                                <div
                                    className="alert alert-danger invalid-feedback text-danger"
                                    role="alert"
                                >
                                    من فضلك قم بإدخال الاسم بالكامل صحيح
                                </div>
                            </div>
                            <div className="col-12  py-2">
                                <label for="image" className="form-label">رابط صورة الملعب:</label>
                                <input
                                    type="text"
                                    className={`form-control ${((!imageURLValid && imageURLError) ? "is-invalid" : "")} ${((imageURLValid && !imageURLError) ? "is-valid" : "")}`}
                                    id="image"
                                    placeholder="رابط صورة الملعب"
                                    name="image"
                                    value={imageURL}
                                    onChange={handleImageURLChange}
                                    required
                                />
                                <div
                                    className="alert alert-danger invalid-feedback text-danger d-none email-exist"
                                    role="alert"
                                >
                                    قم بإدخال رابط صورة الملعب
                                </div>
                            </div>
                            <div className="col-12 py-2">
                                <label for="suggestion" className="form-label"
                                >تفاصيل الملعب:</label >
                                <textarea
                                    className={`form-control ${((!descriptionValid && descriptionError) ? "is-invalid" : "")} ${((descriptionValid && !descriptionError) ? "is-valid" : "")}`}
                                    rows="5"
                                    id="suggestion"
                                    placeholder="تفاصيل الملعب"
                                    name="suggestion"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    required
                                ></textarea>
                                <div
                                    className="alert alert-danger invalid-feedback text-danger"
                                    role="alert"
                                >
                                    من فضلك قم بإدخال تفاصيل الملعب
                                </div>
                            </div>
                            <div className="col-12  py-2">
                                <label for="hourPrice" className="form-label">سعر الساعة:</label>
                                <input
                                    type="number"
                                    className={`form-control ${((!hourPriceValid && hourPriceError) ? "is-invalid" : "")} ${((hourPriceValid && !hourPriceError) ? "is-valid" : "")}`}
                                    id="hourPrice"
                                    placeholder="سعر الساعة"
                                    name="hourPrice"
                                    value={hourPrice}
                                    onChange={handleHourPriceChange}
                                    required
                                />
                                <div
                                    className="alert alert-danger invalid-feedback text-danger"
                                    role="alert"
                                >
                                    من فضلك قم بإدخال سعر الساعة صحيح
                                </div>
                            </div>
                            <div className="col-12  py-2">
                                <label for="address" className="form-label">عنوان الملعب:</label>
                                <input
                                    type="text"
                                    className={`form-control ${((!addressValid && addressError) ? "is-invalid" : "")} ${((addressValid && !addressError) ? "is-valid" : "")}`}
                                    id="address"
                                    placeholder="عنوان الملعب"
                                    name="address"
                                    value={address}
                                    onChange={handleAddressChange}
                                    required
                                />
                                <div
                                    className="alert alert-danger invalid-feedback text-danger"
                                    role="alert"
                                >
                                    من فضلك قم بإدخال عنوان الموقع صحيح
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

export default AddStadium;
