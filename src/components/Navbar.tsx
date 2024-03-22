
import React from "react";
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import SearchBox from "./SearchBox";

type NavbarProps = {
    searchValue: string;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
    onSearchSubmit: React.FormEventHandler<HTMLFormElement>;
};


export default function Navbar({ searchValue, onSearchChange, onSearchSubmit }: NavbarProps){
    return (
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
          <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
             <div className="flex items-center justify-center gap-2">
                <h2 className="text-gray-500 text-3xl">Weather</h2>
                <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
             </div>
             <section className="flex gap-1 items-center">
                <MdMyLocation className="text-xl text-gray-400 hover:opacity-80 cursor-pointer"/>
                <MdOutlineLocationOn className="text-xl text-gray-400"/>
                <p className="text-slate-900/80 text-sm">{searchValue}</p>
                <SearchBox
                  value={searchValue}
                  onChange={onSearchChange}
                  onSubmit={onSearchSubmit}
                />
             </section>
          </div>
        </nav>
    );
}