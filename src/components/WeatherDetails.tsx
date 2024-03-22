import React from 'react'
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

type Props = {}
export interface WeatherDetailProps{
    visibility: string;
    humidity: string;
    windspeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}
export default function WeatherDetails(props : WeatherDetailProps) {
  return (<>
  <SingleWeatherDetail
  icon ={<LuEye/>}
  information="Visibilty"
  value={props.visibility}
  />
  <SingleWeatherDetail
  icon ={<FiDroplet/>}
  information="Humidity"
  value={props.humidity}
  />
  <SingleWeatherDetail
  icon ={<MdAir/>}
  information="WindSpeed"
  value={props.windspeed}
  />
   <SingleWeatherDetail
  icon ={<ImMeter/>}
  information="Air Pressure"
  value={props.airPressure}
  />
  </>);
}

export interface SingleWeatherDetailProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
    return (
        <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className='text-3xl'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    );
}