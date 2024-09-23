import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import contractAbi from '../scdata/CoursePlatform.json';

const contractAddress = '0x8813c4F20a6b0E403276F10f444aaDC868c710CF'; 

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white rounded-lg shadow-lg max-w-3xl w-full">
        <div className="border-4 border-gray-300 p-8 rounded-lg">
          <h1 className="text-5xl font-extrabold mb-6 text-green-600">Certificate of Completion</h1>
          <p className="text-xl mb-4">This is to certify that you have successfully completed the course:</p>
          <h2 className="text-3xl font-bold mt-4 text-gray-700">{courseName}</h2>
          <p className="text-lg mt-4 text-gray-500">Provided by: <span className="font-semibold">{providerName}</span></p>
          <div className="mt-8 text-center">
            <p className="text-lg italic text-gray-400">"Your success is our achievement!"</p>
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-black text-white font-semibold rounded-lg shadow hover:bg-green-600"
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
