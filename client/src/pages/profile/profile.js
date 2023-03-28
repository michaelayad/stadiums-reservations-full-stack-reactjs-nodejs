
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { login, logout, isLogin } from "../../store/reducers/authReducer";



const Profile = () => {
    const user = useSelector((state) => state.auth)

    return (<>
        <div className="container py-4">
            <div className="d-flex flex-row justify-content-center">
                <h1 className="text-success">الحساب الشخصى</h1>
                <h3 className="mx-3 bg-success px-2 text-white rounded-4"> {user.type === "owner" ? "صاحب ملعب" : "لاعب"}</h3>
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
        </div>
    </>);
}
export default Profile;