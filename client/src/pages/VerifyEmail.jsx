import {useState} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import axios from "axios";

function VerifyEmail(){

const [otp,setOtp]=useState("");

const location=useLocation();
const navigate=useNavigate();

const email=location.state?.email;


const verifyOTP=async()=>{

try{

await axios.post(
"https://hr-analytics-plotform.onrender.com/api/auth/verify-email",
{
email,
otp
}
);

alert("Email Verified");

navigate("/login");

}
catch(error){
alert(error.response.data.message);
}

}


return(
<div>

<h2>Verify Email</h2>

<input
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>

<button onClick={verifyOTP}>
Verify
</button>


</div>
)

}

export default VerifyEmail;