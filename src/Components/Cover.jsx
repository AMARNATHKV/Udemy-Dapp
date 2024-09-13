import React from 'react';
import cover from '../assets/Images/cover.gif'

const Cover = () => {
  return (
    <>
    <div className="w-full h-96 overflow-hidden"> {/* Adjust height as needed with Tailwind's height utilities */}
      <img src={cover} alt="Cover Image" className="w-full h-full object-cover" />
    </div>

    <div className='px-12 py-12 font-serif'>
        <h1 className='text-gray-900 text-4xl font-bold'>All the skills you need in one place</h1>
        <span className='text-gray-500 text-xl'>From critical skills to technical topics, Udemy supports your professional development.</span>
    </div>
    </>
  )
}

export default Cover;
