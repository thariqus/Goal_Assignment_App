import React from "react";
import JH from "../images/JH.png"
import Bg from "../images/Login-bg.jpg"
import { RiDoubleQuotesL } from "react-icons/ri";
import { useNavigate } from "react-router";

function Login() {

  const navigate = useNavigate();

  const handleLogin = ()=>{
    navigate("/home")
  }
  return (



    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Bg})` }}>
      <div className="bg-white/20 absolute text-white rounded-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-120   backdrop-blur-lg flex items-stretch py-10 px-5">
        {/* left section */}
        <div className="w-full h-full">
          {/* <img src={JH} alt="logo image" className="w-10 h-10 mb-10" /> */}
          <div className="px-10">
            <h2 className="text-2xl font-semibold text-center">Login</h2>
            <p className="text-sm text-center  my-2">
              Please enter your details to Log in.
            </p>



            <form action="" className="mt-10 flex flex-col gap-3">
              <div className=" flex flex-col gap-1">
                <label htmlFor=""> Email</label>
                <input type="email" className="rounded-4xl bg-white px-4 py-2 placeholder-black" placeholder="john@gmail.com" />
              </div>
              <div className=" flex flex-col gap-1">
                <label htmlFor="">Password</label>
                <input type="pssword" className="rounded-4xl bg-white px-4 py-2 placeholder-black" placeholder="******" />
              </div>
              <p className="text-sm text-white text-center mt-6 flex justify-between">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  Create Account
                </a>
              </p>
              <button className="rounded-4xl bg-[#972E26] px-3 py-2 mb-4" onClick={handleLogin}>Log In</button>
            </form>


            <button className="flex text-gray-400 items-center mx-auto justify-between bg-white px-2 py-2 rounded-3xl hover:bg-white/20 transition">

              <img
                src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                alt="google"
                className="w-5 h-5"
              />

            </button>
          </div>
        </div>


        {/* Right Section */}
        {/* <div className="w-1/2 bg-gradient-to-b from-white/80 to-white/20 h-full flex flex-col gap-5 text-black rounded-xl px-8 py-10">
          <h2 className="text-2xl">
            Explore all functionalities of{" "}
            <span className="text-[#972E26]">DIGITRACK</span>
          </h2>
          <RiDoubleQuotesL style={{fontSize:"30px"}}/>
          <p className="px-7 text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div> */}

      </div >

    </div >
  );
}

export default Login;
