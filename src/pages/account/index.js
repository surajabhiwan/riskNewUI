import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLogin } from "../../store/slices/auth";
import profileDummy from "../../assests/AddedImages/profileImage.png"
  
const Account = () => {
  const [Email, setEmail] = useState("Default@gmail.com")
  const [userName, setUserName] = useState("Default");
  const [password, setPassword] = useState("*********");
  //const [expireDay, setExpireDay] = useState(100);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleSignout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('risk-email');
    navigate('/login');
  }

  useEffect(()=>{
    const email = localStorage.getItem('risk-email')
    setEmail(email)
  },[])

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login');
      dispatch(setIsLogin(false));
    }
  },[handleSignout])

  return (
    <>
    <div className="flex flex-col gap-6 items-center justify-center w-full h-full mt-10">
      <div className="flex flex-col gap-4 p-4 bg-[#09080C] rounded-2xl sm:w-[550px] w-full justify-center">

      <div className="w-full flex justify-center">
          <p className="text-white font-bold text-lg">Profile Settings</p>
        </div>

        <div className="space-y-1 flex gap-4">
          <img src={profileDummy} alt="profile" className="w-12 rounded-xl"/>
          <p className="text-white font-medium text-md flex items-center">Username</p>
        </div>

        <div className="space-y-1">
          <p className="text-[#9f9fa8] text-sm font-normal">Email</p>
          <p className="text-white text-sm font-normal border-[1px] bg-black p-2 rounded-lg w-[22rem] md:w-[32rem]">{Email}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-[#9f9fa8] text-sm font-normal ">Username</p>
            <p className="text-white text-sm font-normal border-[1px] bg-black p-2 rounded-lg w-[22rem] md:w-[32rem]"> -- </p>
          </div>
          {/* <button className="bg-[#0b1217] px-3 py-1 text-[#9f9fa8] hover:text-white rounded-lg text-xs">Edit</button> */}
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-[#9f9fa8] text-sm font-normal ">Password</p>
            <p
              
              className="text-white text-sm font-normal border-[1px] bg-black p-2 rounded-lg w-[22rem] md:w-[32rem]">{password}</p>
          </div>
          
          {/* <button className="bg-[#0b1217] px-3 py-1 text-[#9f9fa8] hover:text-white rounded-lg text-xs">Change</button> */}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="space-y-1">
            <p className="text-[#9f9fa8] text-sm font-normal">Account Type</p>
            <p
              
              className="text-white text-sm font-normal border-[1px] bg-black p-2 rounded-lg w-[22rem] md:w-[32rem]">RiskWisePro</p>
          </div>
          {/* <div className="px-3 py-1 text-white hover:text-white rounded-lg text-xs">{expireDay}days remaining</div> */}
        </div>
 
      <div className="flex justify-end w-full">
      <div className="bg-[#BF2C2C] px-5 py-1 text-white cursor-pointer rounded-lg font-medium text-sm hover:bg-red-900" onClick={handleSignout}>
        Sign Out
      </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default Account;
