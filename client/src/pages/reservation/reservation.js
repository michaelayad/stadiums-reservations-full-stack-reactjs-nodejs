import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";




const Reservation = () => {
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const day = searchParams.get('day');
    const hour = searchParams.get('hour');
    const [stadium, setStadium] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    console.log(day, hour);
    const token = localStorage.getItem("token");
    const user = useSelector((state) => state.auth)


    const [sendError, setSendError] = useState("");

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
    const handleReserve = () => {
        let config = {
            headers: {
                token: token,
            },
        };
        axiosInstance.post('/reservation', { day: day, hour: hour, stadiumId: id }, config).then((res) => {
            console.log(res)

            if (res.data.type === "Success") {


                navigate('/profile')


            } else {
                setSendError("خطأ فى الحجز ، حاول مرة اخرى ")

            }
        }).catch((err) => {
            console.log(err)
            setSendError("خطأ فى الحجز ، حاول مرة اخرى ")

        })
    }
    return (<>
        <div className="container-fluid">
            <div className="container py-5">
                <h1>تفاصيل الحجز</h1>
                <div className="col py-3">
                    <div className="col-12 detail-container rounded-4 p-3">
                        <div className="d-flex flex-row">
                            <h4>اسم الملعب :</h4>
                            <h4 className="text-success px-3 stadium-title">{stadium.title}</h4>
                        </div>
                        <div className="d-flex flex-row">
                            <h4>عنوان الملعب :</h4>
                            <h4 className="text-success px-3 stadium-address">{stadium.address}</h4>
                        </div>
                        <div className="d-flex flex-row">
                            <h4>تاريخ الحجز :</h4>
                            <h4 className="text-success px-3 reserve-day">{day}</h4>
                        </div>
                        <div className="d-flex flex-row">
                            <h4>ساعة الحجز :</h4>
                            <h4 className="text-success px-3 reserve-hour">{hour}</h4>
                        </div>
                        <div className="d-flex flex-row">
                            <h4>المبلغ :</h4>
                            <h4 className="text-success px-3 reserve-price">{stadium.hourPrice}</h4>
                        </div>
                        <button className="reservation-btn" id="reserve-btn" onClick={handleReserve}>
                            التأكيد
                        </button>
                    </div>
                </div>
            </div>
        </div></>);
}

export default Reservation;