import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/6.jpeg";
import AwesomeSlider from "react-awesome-slider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { Link } from "react-router-dom";
const Home = () => {
    const [bestStadiums, setBestStadiums] = useState([]);
    const [isFetch, setIsFetch] = useState(true);
    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Set autoplay to true
        autoplaySpeed: 3000,
        easing: "ease-in-out",
        rtl: true,
    };
    useEffect(() => {
        if (isFetch) {
            axiosInstance
                .get(`/stadium/best-stadiums`)
                .then((res) => {
                    // console.log(res.data);
                    setBestStadiums(res.data.stadiums);
                    setIsFetch(false);
                    console.log(res.data.stadiums);
                })
                .catch((err) => { });
        }
    });

    return (
        <>
            <Slider {...settings2}>
                <div className="slide1">
                    <img
                        src={img1}
                        style={{ width: "100%", height: "400px" }}
                        alt="img1"
                    />
                    <div className="text1">
                        <h2 className="text-white-50 fw-bold fs-1">بتدور علي ملعب ؟</h2>
                        <h2 className="fw-bold fs-1">عايز تحجز ملعبك أون لاين ؟</h2>
                    </div>
                </div>

                <div className="slide2">
                    <img
                        src={img2}
                        style={{ width: "100%", height: "400px" }}
                        alt="img1"
                    />
                    <div className="text2">
                        <h2 className="fw-bold fs-1">دلوقتى تقدر تعمل ده مع ملاعبنا</h2>
                        <h5 className="text-white-50 fw-bold my-4">
                            أول وأكبر محرك بحث عن الملاعب في مصر
                        </h5>
                    </div>
                </div>

                <div className="slide3">
                    <img
                        src={img3}
                        style={{ width: "100%", height: "400px" }}
                        alt="img1"
                    />
                    <div className="text3">
                        <h2 className="fw-bold fs-1 my-4">ملاعب مصر احجزها أونلاين!</h2>
                    </div>
                </div>
            </Slider>
            <div className="row justify-content-center py-4">
                <div className="col-12 col-md-10 col-lg-8">
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
            </div>
            <div className="best-stadium-section row mx-auto my-auto justify-content-center py-5" >
                <div className="col-12 text-center py-5">
                    <h1 className="fw-bold text-white">اختر من احسن الملاعب في مصر</h1>
                </div>
                <div className="col-12 px-5">
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={3}
                        slidesToScroll={1}
                        rtl={true}
                        responsive={[
                            {
                                breakpoint: 1024,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 1,
                                    infinite: true,
                                    dots: false,
                                },
                            },
                            {
                                breakpoint: 728,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 1,
                                    initialSlide: 1,
                                },
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    initialSlide: 1,
                                },
                            },
                        ]}
                    >
                        {bestStadiums.map((item) => (
                            <div className="w-100 px-3" key={item.id}>
                                <div className="card" dir="rtl">
                                    <img
                                        src={item.image}
                                        className="card-img-top"
                                        alt="..."
                                        style={{ width: "100%", height: "180px" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title"> {item.title}</h5>
                                        <p className="card-text text-secondary">{item.address}</p>
                                        <h6>
                                            يبدأ من
                                            <span className="text-success fw-bold fs-4">{item.hourPrice}</span>
                                        </h6>
                                        <Link
                                            to={`/stadium/${item.id}`}
                                            className="btn btn-success"
                                        >
                                            للتفاصيل و الحجز
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

export default Home;
