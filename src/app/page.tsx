'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from 'date-fns';
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";

export default function Home() {
  const [inputValue, setInputValue] = useState('Nairobi'); // User input state
  const [city, setCity] = useState('Nairobi'); // State used for fetching data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data whenever the `city` state changes and meets the condition
  useEffect(() => {
    if (city.length >= 3) {
      setLoading(true);
      axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`)
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }
  }, [city]);

  // Debounce input value changes
  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue.trim().length >= 3 || inputValue.trim().length === 0) {
        setCity(inputValue.trim());
      }
    }, 500); // Delay in ms

    return () => clearTimeout(handler);
  }, [inputValue]);
  const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cityInput = formData.get('city') as string; // Ensure your SearchBox input has a 'name' attribute of 'city'
    if (cityInput) setCity(cityInput);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const formattedDay = data?.list[0].dt_txt ? format(parseISO(data?.list[0].dt_txt), 'EEEE') : 'Day unavailable';
  const formattedDate = data?.list[0].dt_txt ? format(parseISO(data?.list[0].dt_txt), 'dd.MM.yyyy') : 'Date unavailable';

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar
        searchValue={inputValue}
        onSearchChange={handleInputChange}
        onSearchSubmit={handleSearchSubmit}
      />
     <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4">
           <div className="space-y-2">
             <h2 className="flex gap-2 text-2xl items-end">
                <p className="text-gray-500">{formattedDay}</p>
                <p className="text-gray-500 text-lg">({formattedDate})</p>
             </h2>
             <Container className="gap-10 px-6 items-center ">
                <div className="flex flex-col px-4 text-gray-500 ">
                  <span className="text-5xl">
                      { convertKelvinToCelsius(data?.list[0].main.temp ?? 296.37) }°
                  </span>
                  <p className="text-xs space-x-1 whitespace-nowrap">
                     <span> Feels Like</span>
                     <span>
                      { convertKelvinToCelsius(data?.list[0].main.feels_like ?? 296.37) }°
                     </span>
                  </p>
                  <p className="text-xs space-x-2">
                     <span>
                       { convertKelvinToCelsius(data?.list[0].main.temp_min ?? 0) }
                       °↓ {" "}
                     </span>
                     <span>
                       { convertKelvinToCelsius(data?.list[0].main.temp_max ?? 0) }
                       °↑
                     </span>
                  </p>
                </div>
                <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3 text-gray-500">
                   {
                    data?.list.map((d,i)=>(
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                       <p className="whitespace-nowrap">{ format(parseISO(d.dt_txt), "h:mm a")}</p>
                       <WeatherIcon/>
                       <p> { convertKelvinToCelsius(data?.list[0].main.temp ?? 296.37) }°</p>
                      </div>
                    ))
                   }
                </div>
             </Container>
           </div>
           <div className="flex gap-4">
              <Container className="w-fit justify-center flex-col px-4 items-center text-gray-400">
                <p className="capitalize text-center">
                  {data?.list[0].weather[0].description}{" "}
                </p>
                <WeatherIcon />
                 
              </Container>
              <Container className="bg-yellow-300/80 px-6 justify-between overflow-x-auto">
                <WeatherDetails visibility= {data?.list[0].main.visibility ?? 1000 } 
                 airPressure={ data?.list[0].main.pressure} 
                 humidity={ data?.list[0].main.humidity} 
                 windSpeed={ data?.list[0].wind.speed } 

                />
              </Container>
           </div>
        </section>
     </main>
   </div>
  );
}
