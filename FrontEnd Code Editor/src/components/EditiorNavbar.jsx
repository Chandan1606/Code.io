import React, { useEffect, useState } from 'react'
import logo from "../images/logo.png"
import {useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';
import { api_base_url } from '../helper';

const EditiorNavbar = () => {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");;

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      }
      else {
        setError(data.message);
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  }

  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[20px] h-[80px] bg-[#061621]">
        <div className="logo">
          <img className='w-[150px] cursor-pointer' src={logo} alt="" />
        </div>
        <div className="links flex items-center gap-3">
         
        <button onClick={logout} className='btnBlue !bg-[#00ED64] !text-[#001E2B] font-medium  min-w-[110px] ml-2 hover:!bg-[#47CF73]'>Logout</button>
          <Avatar name={data ? data.name : ""} size="45" round="50%" className=' cursor-pointer ml-2' />
        </div>

        
      </div>
    </>
  )
}

export default EditiorNavbar