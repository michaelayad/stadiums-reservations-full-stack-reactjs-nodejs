import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { useSelector } from "react-redux";




const StadiumDetails = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.auth);
    const [stadium, setStadium] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState([]);
    const [hours, setHours] = useState([]);
    const [day, setDay] = useState([]);
    const [hour, setHour] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoading) {
            axiosInstance
                .get(`/stadium/${id}`)
                .then((res) => {
                    // console.log(res.data);
                    setIsLoading(false)
                    setStadium(res.data.stadium);
                    console.log(res.data.stadium);

                })
                .catch((err) => { });
        }
    });

    useEffect(() => {
        if (!isLoading) {
            // console.log(stadium)
            if (stadium && stadium.availableHours) {
                const days = stadium.availableHours.map((hour) => hour.day);
                const uniqueDays = [...new Set(days)];
                setDays(uniqueDays);
                // console.log(uniqueDays);
            }
        }

    }, [isLoading, stadium])
    const handleDay = (event) => {
        const value = event.target.value
        if (value) {
            console.log(value);
            const h = [];
            if (stadium && stadium.availableHours) {
                stadium.availableHours.forEach(hour => {
                    if (hour.day === value) {
                        h.push(hour.hour);
                    }
                });
                setHours(h);

                console.log(h);
            }
            setDay(value);
            setHour("");
        }
    }
    const handleHour = (event) => {
        const value = event.target.value
        if (value) {
            console.log(value)
            setHour(value);
        }
    }
    const handleReserva = () => {
        if (hour && day) {
            console.log(hour, day);
            navigate(`/reservation/${stadium.id}?day=${day}&hour=${hour}`, { state: { "day": day, "hour": hour } })

        }
    }
    return (<>
        <div className="container-fluid">
            <div className="container py-5">
                <div className="d-flex flex-row">
                    <h4>اسم الملعب :</h4>
                    <h4 className="text-success px-3 stadium-title">{stadium?.title}</h4>
                </div>
                <div className="d-flex flex-row">
                    <h4>عنوان الملعب :</h4>
                    <h4 className="text-success px-3 stadium-address">{stadium?.address}</h4>
                </div>
                <div className="row row-cols-1 row-cols-md-2 border-top my-3">
                    <div className="col img-container py-3">
                        <img
                            src={stadium?.image}
                            alt=""
                            className="img-fluid rounded-4 shadow-lg stadium-img"
                            style={{ maxHeight: "700px" }}
                        />
                    </div>
                    <div className="col py-3">
                        <div className="col-12 detail-container rounded-4 p-3">
                            <h4 className="stadium-title">{stadium?.title}</h4>
                            <div className="d-flex">
                                <p className="text-success">عنوان الملعب :</p>
                                <p className="text-secondary px-3 stadium-address">{stadium?.address}</p>
                            </div>
                            <div className="d-flex">
                                <p className="text-success">نوع الأرض :</p>
                                <p className="text-secondary px-3 stadium-type">{stadium?.description}</p>
                            </div>
                            <div className="d-flex">
                                <p className="text-success">عدد الفريق الواحد :</p>
                                <p className="text-secondary px-3 player-num">10 لاعب</p>
                            </div>
                            <div className="d-flex">
                                <p className="text-success">غرف تغيير ملابس :</p>
                                <p className="text-secondary px-3 changing-room">يوجد</p>
                            </div>
                            <div className="d-flex border-bottom border-2">
                                <p className="text-success">حمامات :</p>
                                <p className="text-secondary px-3 baths">يوجد</p>
                            </div>
                            <div className="d-flex py-3">
                                <h5 className="text-success">سعر الساعة :</h5>
                                <h5 className="text-white price-container px-3 hour-price">{`  ${stadium?.hourPrice} جنيه`}</h5>
                            </div>
                            <div className="d-flex">
                                <h5 className="text-success">الأيام والساعات المتاحة :</h5>
                            </div>
                            <div className="row row-cols-1 row-cols-lg-2">
                                <div className="col">
                                    <select
                                        className="form-select"

                                        value={day}
                                        onChange={handleDay}
                                    >
                                        <option value="" selected>الأيام المتاحة</option>
                                        {
                                            days.map((day, index) => {
                                                return <option value={day} key={index}>{day}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col">
                                    <select
                                        className="form-select"
                                        value={hour}
                                        onChange={handleHour}
                                    >
                                        <option value="" selected>الساعات المتاحة</option>
                                        {
                                            hours.map((hour, index) => {
                                                return <option value={hour} key={index}>{hour}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <button className="reservation-btn" disabled={user.isAuthenticated && user.type === "player" ? false : true} onClick={handleReserva}>احجز</button>
                            <p className={`text-secondary ${user.isAuthenticated && user.type === "player" ? "d-none" : ""} `}>
                                للحجز : قم بتسجيل الدخول كلاعب أولا
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default StadiumDetails