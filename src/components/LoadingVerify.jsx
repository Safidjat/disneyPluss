import { PulseLoader } from "react-spinners";

function LoadingVerify() {
    return (
        <div className="h-[100vh] w-full flex justify-center items-center">
            <PulseLoader color={"#fff"} size={20} className="customLoader"/>
        </div>
    )
}

export default LoadingVerify
