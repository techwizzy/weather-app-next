import React from 'react'
import Image from 'next/image'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { IoCloudyNightSharp } from 'react-icons/io5';
type Props = {}
const now = new Date();
const hours = now.getHours();

// Define day time hours. You can adjust these values as needed.
const isDayTime = hours >= 6 && hours < 18;
export default function WeatherIcon({}: Props) {
  return (
    <div className='w-200 h-10  text-5xl'>
      {isDayTime ? <p className='text-yellow-400'><BsFillCloudSunFill /></p>: <p className='text-sky-400'> <IoCloudyNightSharp /> </p> }
    </div>
  )
}