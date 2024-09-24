import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import contractAbi from '../scdata/CoursePlatform.json';

const contractAddress = ' 0x19eFa55C47FC9795894721718DCe4994A9749834';

const Certificate = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState('');
  const [providerName, setProviderName] = useState('');

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, provider);
      const course = await contract.getCourse(courseId);
      setCourseName(course.name);
      setProviderName(course.provider);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100">
      <div className="p-10 bg-white rounded-lg shadow-lg max-w-3xl w-full">
        <div className="border-8 border-dashed border-gray-400 p-8 rounded-lg relative bg-white shadow-md">
        
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-500 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-full opacity-50"></div>

          <h1 className="text-6xl font-extrabold mb-6 text-gray-900 text-center tracking-wide">
            Certificate of Completion
          </h1>

          <p className="text-xl text-center mb-4 text-gray-700">
            This is to certify that you have successfully completed the course:
          </p>

          <h2 className="text-4xl font-semibold text-center text-gray-900 mt-4">{courseName}</h2>
          <p className="text-lg mt-6 text-center text-gray-600">
            Provided by: <span className="font-bold">{providerName}</span>
          </p>

          
          <div className="mt-8 text-center">
            <p className="text-lg italic text-gray-500">"Your success is our achievement!"</p>
          </div>

          
        

          <div className="flex justify-center mt-10">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300 ease-in-out"
            >
              Print Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
