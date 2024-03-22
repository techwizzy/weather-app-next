import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';

type Props = {
    className?: string;
    value: string; // Make sure this is controlled by the parent component.
    onChange: React.ChangeEventHandler<HTMLInputElement>; // For updating the input value.
    onSubmit: React.FormEventHandler<HTMLFormElement>; // For handling form submission.
};

export default function SearchBox({ className, value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className={`flex relative items-center justify-center h-10 ${className}`}>
      <input 
        name="city" // Ensure the input field has a name attribute for easy retrieval on submission.
        type="text"
        placeholder="Search Location..."
        value={value} // Controlled input value.
        onChange={onChange} // Handler for input changes.
        className="px-4 py-2 w-[230px] border text-gray-800 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button type="submit" className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full">
        <IoSearchOutline className="text-white" />
      </button>
    </form>
  );
}
