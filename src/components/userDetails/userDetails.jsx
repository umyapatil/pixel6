import React from 'react'
import {useState,useEffect} from "react";
const UserDetails = () => {

  const [usersData,setUsersData] = useState([]);


  useEffect(()=>{
    const fetchUsersData=  async () =>{
      console.log("fetch users dta");
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      console.log(data.users);
      setUsersData(data.users);
    }

    fetchUsersData();

  },[])


  return (
    <div>
       
        </div>
  )
}

export default UserDetails