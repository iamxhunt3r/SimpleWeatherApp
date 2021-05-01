import React, {useState} from "react"
import axios from "axios"

import Context from "../Context"

import Header from "./Header"
import Content from "./Content"
import WeatherSearch from "./WeatherSearch"
import WeatherData from "./WeaherData"
import Error from "./Error"
import Footer from "./Footer"

const Main = () => {
    const [weather, setWeather] = useState()
    const [city,setCity] = useState() 
    const [error,setError] = useState()
    const api_call = async e =>{
        e.preventDefault()
        const location = e.target.elements.location.value
        if(!location) return setError("Please enter the correct name of the city."), setWeather(null)
        const API_KEY = "93bd38f04e30b0dabe3ae424ca42657b"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        const request = axios.get(url)
        const response = await request
        setWeather(response.data.main)
        setCity(response.data.name)
        setError(null)
    }
    return (
        <div className="main">
            <Header />
            <Content>
                <Context.Provider value={{api_call:api_call, weather:weather, city:city}}>
                <WeatherSearch />
                {error && <Error error={error}/> }
                { weather && <WeatherData/> }
                <div/>
                </Context.Provider>
                <Footer/>
            </Content>
        </div>
    )
}


export default Main