import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axiosInstance from "../../axios/axiosInstance";




const StadiumDetails = () => {
    const { id } = useParams();
    const [stadium, setStadium] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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
                                        aria-label="Default select example"
                                        id="days-select"
                                    >
                                        <option selected>الأيام المتاحة</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        id="hours-select"
                                    >
                                        <option selected>الساعات المتاحة</option>
                                    </select>
                                </div>
                            </div>
                            <button className="reservation-btn" id="reserve-btn">احجز</button>
                            <p className="text-secondary d-none" id="reserve-hint">
                                للحجز : قم بتسجيل الدخول أولا
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default StadiumDetails