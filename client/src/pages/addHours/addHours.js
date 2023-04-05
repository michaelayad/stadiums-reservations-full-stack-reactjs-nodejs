import { Navigate, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

const AddHours = () => {
    const { id } = useParams();
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState("");
    const [availableHours, setAvailableHours] = useState([]);
    const hours = [
        "1 AM",
        "2 AM",
        "3 AM",
        "4 AM",
        "5 AM",
        "6 AM",
        "7 AM",
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 AM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM",
        "6 PM",
        "7 PM",
        "8 PM",
        "9 PM",
        "10 PM",
        "11 PM",
        "12 PM",
    ];
    console.log(availableHours);
    const handleChange = (event) => {
        setHour(event.target.value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const localDateString = `${year}-${month}-${day}`;
        const datetime = {
            day: localDateString,
            hour: event.target.value,
        };
        if (event.target.value) {
            if (
                availableHours.find(
                    (dt) => dt.hour === event.target.value && dt.day === localDateString
                )
            ) {
            } else {
                setAvailableHours([...availableHours, datetime]);
            }
        }
    };
    const token = localStorage.getItem("token");


    const [sendError, setSendError] = useState("");

    const navigate = useNavigate()
    const handleAddHours = () => {
        let config = {
            headers: {
                token: token,
            },
        };
        axiosInstance.post(`/stadium/${id}/add-hours`, availableHours, config).then((res) => {
            console.log(res)

            if (res.data.type === "Success") {


                navigate(`/stadium/${id}`)


            } else {
                setSendError("خطأ فى إضافة  الساعات ، حاول مرة اخرى ")

            }
        }).catch((err) => {
            console.log(err)
            setSendError("خطأ فى إضافة  الساعات ، حاول مرة اخرى ")

        })
    }
    console.log(date);
    return (
        <div className="container-fluid">
            <div className="container py-5">
                <div className="d-flex justify-content-center fw-bold">
                    <h1>اضافة ساعات متاحة </h1>
                </div>
                <div className="d-flex justify-content-center fw-bold py-3 ">
                    <div className="px-4">
                        {" "}
                        <h3>اختيار اليوم</h3>
                    </div>
                    <div>
                        <DatePicker
                            showIcon
                            selected={date}
                            dateFormat="yyyy-MM-dd"
                            onChange={(d) => setDate(d)}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="px-4">
                        {" "}
                        <h3>اختيار الساعة</h3>
                    </div>
                    <div>
                        <select value={hour} onChange={handleChange}>
                            <option value="">اختيار الساعة المتاحة</option>
                            {hours.map((hour, i) => {
                                return <option value={hour}>{hour}</option>;
                            })}
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center fw-bold py-3">
                    <button
                        className="btn btn-success"
                        onClick={handleAddHours}
                    >
                        اضغط هنا لإضافة الساعات المختارة
                    </button>        </div>
                <div
                    className="d-flex justify-content-center  text-danger"
                >
                    {sendError}
                </div>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>اليوم</th>
                            <th>الساعة</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableHours.map((dateTime, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{dateTime.day}</td>
                                    <td>{dateTime.hour}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddHours;
