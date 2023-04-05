import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { login, logout, isLogin } from "../../store/reducers/authReducer";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
    const user = useSelector((state) => state.auth);
    const { isShow, setIsShow } = useState(false);
    const [stadiums, setStadiums] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (isLoading && user.type === "owner") {
            let config = {
                headers: {
                    token: token,
                },
            };
            axiosInstance
                .get(`/stadium/by-owner`, config)
                .then((res) => {
                    // console.log(res.data);
                    setIsLoading(false);
                    setStadiums(res.data.stadiums);
                    console.log(res.data.stadiums);
                    axiosInstance
                        .get(`/reservation/by-owner`, config)
                        .then((res) => {
                            // console.log(res.data);
                            setReservations(res.data.reservations);
                            console.log(res.data.reservations);
                        })
                        .catch((err) => { });
                })
                .catch((err) => { });
        }
    });
    return (
        <>
            <div className="container py-4">
                <div className="d-flex flex-row justify-content-center">
                    <h1 className="text-success">الحساب الشخصى</h1>
                    <h3 className="mx-3 bg-success px-2 text-white rounded-4">
                        {" "}
                        {user.type === "owner" ? "صاحب ملعب" : "لاعب"}
                    </h3>
                </div>
                <div className="d-flex flex-row">
                    <h3>الإسم : </h3>
                    <h3 className="text-success px-3">{user.user.name}</h3>
                </div>
                <div className="d-flex flex-row">
                    <h3>البريد الالكترونى : </h3>
                    <h3 className="text-success px-3">{user.user.email}</h3>
                </div>
                <div className="d-flex flex-row">
                    <h3>رقم المحمول : </h3>
                    <h3 className="text-success px-3">{user.user.tel}</h3>
                </div>
                {user.type === "owner" ? (
                    <div className={`d-flex flex-row justify-content-center`}>
                        <Link to="/add-stadium" className="btn btn-success fs-4">
                            اضافة ملعب
                        </Link>
                    </div>
                ) : (
                    <></>
                )}
                {user.type === "owner" ? (
                    <div className={`col-12 py-4 `}>
                        <h3>الملاعب الخاصة بك</h3>
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>اسم الملعب</th>
                                    <th>الذهاب الى صفحة الملعب</th>
                                    <th>اضافة ساعة متاحة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stadiums.map((stadium, index) => {
                                    return (
                                        <tr key={stadium.id}>
                                            <td>{index + 1}</td>
                                            <td>{stadium.title}</td>
                                            <td>
                                                <Link
                                                    to={`/stadium/${stadium.id}`}
                                                    className="btn btn-success"
                                                >
                                                    تفاصيل الملعب
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/add-hours/${stadium.id}`}
                                                    className="btn btn-success"
                                                >
                                                    اضافة ساعات متاحة
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <></>
                )}
                {user.type === "owner" ? (
                    <div className={`col-12 py-4 `}>
                        <h2>حجوزات الملاعب الخاصة بك (مطلوب تأكيد الحجز فى حالة الدفع )</h2>
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>اسم الملعب</th>
                                    <th>اسم اللاعب</th>
                                    <th>رقم تليفون اللاعب</th>
                                    <th>اليوم</th>
                                    <th>الساعة</th>
                                    <th>تأكيد الحجز</th>
                                    <th>إلغاء الحجز </th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => {
                                    if (!reservation.isValid) {
                                        return (
                                            <tr key={reservation.id}>
                                                <td>{reservation.stadium.title}</td>
                                                <td>{reservation.player.name}</td>
                                                <td>{reservation.player.tel}</td>
                                                <td>{reservation.day}</td>
                                                <td>{reservation.hour}</td>

                                                <td>
                                                    <button className="btn btn-success">
                                                        تأكيد الحجز{" "}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger">
                                                        إلغاء الحجز{" "}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <></>
                )}
                {user.type === "owner" ? (
                    <div className={`col-12 py-4 `}>
                        <h2> جميع حجوزات الملاعب الخاصة بك</h2>
                        <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>اسم الملعب</th>
                                    <th>اسم اللاعب</th>
                                    <th>رقم تليفون اللاعب</th>
                                    <th>اليوم</th>
                                    <th>الساعة</th>

                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation, index) => {
                                    if (reservation.isValid) {
                                        return (
                                            <tr key={reservation.id}>
                                                <td>{reservation.stadium.title}</td>
                                                <td>{reservation.player.name}</td>
                                                <td>{reservation.player.tel}</td>
                                                <td>{reservation.day}</td>
                                                <td>{reservation.hour}</td>
                                            </tr>
                                        );
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};
export default Profile;
