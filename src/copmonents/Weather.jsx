import React, { useEffect, useRef, useState } from 'react'
import searchicon from '../assets/searchicon.jpg';
import { IoSunnyOutline } from "react-icons/io5";
import { WiWindy } from "react-icons/wi";
import { RiWindyLine } from "react-icons/ri";

export default function Weather() {

  const inputRef = useRef()
  const [weatherData , setWeatherData]=useState(false)


  const search = async (city) =>{
    try{

      if(city === ""){
        alert("Enter city name");
        return;
      }
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_App_ID}`;

      const response = await fetch(url);
      const data = await response.json()

      if(!response.ok){
        alert(data.message)
        return;
      }
      console.log(data)
      setWeatherData({
        humidity : data.main.humidity,
        windspeed: data.wind.speed,
        temperature : Math.floor(data.main.temp),
        location: data.name,
      })
    }
    catch(error){
      setWeatherData(false)
      console.log(error)
    }
  }

  useEffect (()=>{
    search("London")
  },[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input type="text" ref={inputRef} placeholder='Search' />
            <img src={searchicon}  onClick={()=> search(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
          <IoSunnyOutline className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>

        <div className='weather-data'>

        <div className='col'>
          <WiWindy className='icon'/>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className='col'>
          <RiWindyLine className='icon'/>
          <div>
            <p className='windy'>{weatherData.windspeed} km/hr</p>
            <span>Wind Speed </span>
          </div>
        </div>

        </div></>:<></>}
        
    </div>
  )
}
