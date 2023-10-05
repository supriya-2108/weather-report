import React, { useState } from 'react'
import './WeatherReport.css'
import search_Icon from '../Assets/search.png';
import cloud_Icon from '../Assets/cloud.png'
import clear_Icon from '../Assets/clear.png'
import drizzle_Icon from '../Assets/drizzle.png'
import humidity_Icon from '../Assets/humidity.png'
import snow_Icon from '../Assets/snow.png'
import wind_Icon from '../Assets/wind.png'
import rain_Icon from '../Assets/rain.png'

const WeatherReport = () => {
    const [wicon,setWicon]=useState(cloud_Icon)
    const [cityDetails,setCityDetails]=useState({
        temperature:0,
        windspeed:"",
        humidity:"",
        location:""
    })
    const [dial,Setdial]=useState(0)
    const [error,setError]=useState("")
    let api_key="1f8857aea661ce7a9989f9f56a0142ac"
    const [name,setName]=useState("Convert To Fahrenheit")
    const Search=async()=>{
        const element=document.getElementsByClassName("city");
        if(element[0]===''){
            return 0
        }
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`
        let response=await fetch(url)
       
        if (!response.ok) {
            if (response.status === 404) {
              setError('City not found,Enter a valid City Name');
              setCityDetails({
                temperature:"",
                windspeed:"",
                humidity:"",
                location:""
            })
              return 0
            } else {
              setError('An error occurred while fetching weather data');
              setCityDetails({
                temperature:"",
                windspeed:"",
                humidity:"",
                location:""
            })
              return 0
            }
          }
        let data=await response.json()

        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setWicon(clear_Icon)
        }
        else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n'){
            setWicon(cloud_Icon)
        }else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n'){
            setWicon(drizzle_Icon)
        }else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n'){
            setWicon(drizzle_Icon)
        }
        else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n'){
            setWicon(rain_Icon)
        }else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n'){
            setWicon(rain_Icon)
        }else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n'){
            setWicon(snow_Icon)
        }else {
            setWicon(clear_Icon)
        }
        setCityDetails({
            humidity:data.main.humidity +" %",
            windspeed:data.wind.speed+" Km/Hr",
            temperature:data.main.temp,
            location:data.name
        })
       
        setError("")
    }

    const celToFeh=()=>{
        Setdial(1)
        let temperatures=cityDetails.temperature * 1.8 + 32
        setCityDetails({
            humidity:cityDetails.humidity,
            windspeed:cityDetails.windspeed,
            temperature:temperatures,
            location:cityDetails.location
        })
        setName("Convert To celcius")
    }
    const fehtocel=()=>{
        Setdial(0)
        let temperatures=(cityDetails.temperature -32)*(5/9) 
        setCityDetails({
            humidity:cityDetails.humidity,
            windspeed:cityDetails.windspeed,
            temperature:temperatures,
            location:cityDetails.location
        })
        setName("Convert To Fahrenheit")
    }
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className="city" placeholder='Search'/>
            <div className='search_icon' onClick={()=>{Search()}}>
                <img src={search_Icon} alt="Search Icon"/>
            </div>
        </div>
        <div className='weather-image'>
            <img src={cloud_Icon} alt=''/>
        </div>
        {(error!=="")?<div style={{backgroundColor:"white",marginLeft:"30px",marginRight:"30px",height:"40px",color:"red",textAlign:"center",fontSize:"20px"}}><span>{error}</span></div>:""}
       <div className='weather-temp'>{cityDetails.temperature} {(dial!==1)?"°c":"°F"}<button onClick={(dial!==1)?celToFeh:fehtocel} style={{marginLeft:"20px",backgroundColor:"green"}}>{name}</button></div>
            <div className='weather-location'>{cityDetails.location}</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_Icon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='humidity-percentage'>{cityDetails.humidity}
                        </div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_Icon} alt="" className='icon'/>
                    <div className='data'>
                        <div className='wind-speed'>{cityDetails.windspeed}
                        </div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        
        
        
      
    </div>
  )
}

export default WeatherReport
