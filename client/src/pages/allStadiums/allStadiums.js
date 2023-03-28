import img6 from '../../assets/img6.png';
import img7 from '../../assets/img7.png';
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Link } from 'react-router-dom';
const AllStadiums = () => {
    const [stadiums, setStadiums] = useState([]);
    const [isFetch, setIsFetch] = useState(true);
    useEffect(() => {
        if (isFetch) {
            axiosInstance
                .get(`/stadium`)
                .then((res) => {
                    // console.log(res.data);
                    setStadiums(res.data.stadiums);
                    setIsFetch(false)
                    console.log(res.data.stadiums);
                })
                .catch((err) => { });
        }


    });
    return (<>
        <div className="w-100 p-0 m-0">
            <img src={img6} alt="" width="100%" />
        </div>
        <div className="search col-11 col-md-8 row px-5">
            <form className="card card-sm">
                <div className="card-body row no-gutters align-items-center">
                    <div className="col">
                        <input
                            className="form-control form-control-lg form-control-borderless"
                            type="search"
                            placeholder="اكتب اسم المنطقة القريبة منك"
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-lg btn-success" type="submit">
                            ابحث الآن
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div className="container">
            <div
                className="row row-cols-1 row-cols-md-2 row-cols-lg-3"
                id="all-stadiums"
            >
                {stadiums.map((item) => {
                    return <div className="col p-3 h-100" key={item.id}>
                        <div className="card w-100">
                            <img
                                src={item.image}
                                className="card-img-top"
                                alt="..."
                                style={{ width: "100%", height: "180px" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text text-secondary">
                                    {item.address}
                                </p>
                                <h6>
                                    يبدأ من
                                    <span className="text-success fw-bold fs-4"> {item.hourPrice} </span>
                                </h6>
                                <Link to={`/stadium/${item.id}`} className="btn btn-success">للتفاصيل و الحجز</Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>

        <div className="w-100 p-0 m-0">
            <img src={img7} alt="" width="100%" />
        </div>

    </>);


}

export default AllStadiums;