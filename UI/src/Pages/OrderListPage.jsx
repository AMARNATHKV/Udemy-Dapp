import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';
import { useNavigate } from 'react-router-dom';

const OrderListPage = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [completedCourses, setCompletedCourses] = useState({});
  const navigate = useNavigate();

  const contractAddress = '0x8813c4F20a6b0E403276F10f444aaDC868c710CF'; 

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error('Ethereum object not found, please install MetaMask.');
          return;
        }

        setLoading(true);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

        const userAddress = await signer.getAddress();
        const courseCount = await contract.courseCount();
        const purchasedCourseArray = [];
        const completedStatuses = {};

        for (let i = 1; i <= courseCount; i++) {
          const isPurchased = await contract.coursePurchased(userAddress, i);
          if (isPurchased) {
            const course = await contract.courses(i);
            purchasedCourseArray.push(course);

            // Check if the course is completed
            const isCompleted = await contract.courseCompleted(userAddress, i);
            completedStatuses[course.id] = isCompleted;
          }
        }

        setPurchasedCourses(purchasedCourseArray);
        setCompletedCourses(completedStatuses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
        setLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  if (loading) {
    return <p>Loading purchased courses...</p>;
  }

  if (purchasedCourses.length === 0) {
    return <p>You haven't purchased any courses yet.</p>;
  }

  return (
    <>
      <h1 className="font-bold text-2xl text-align-center">Your Purchased Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {purchasedCourses.map((course, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`https://ipfs.io/ipfs/${course.imageHash}`}
              alt={course.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-2">{course.name}</h2>
            <p className="text-sm text-gray-600">{course.provider}</p>
            <p className="text-gray-700 mt-2">{course.description}</p>
            <p className="text-gray-900 mt-2 font-bold">
              {ethers.formatEther(course.discountedAmount)} ETH
            </p>
            <button
              onClick={() => navigate(`/course-videos/${course.id}`)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              View Course Videos
            </button>

            {/* Right-aligned "View Certificate" button */}
            {completedCourses[course.id] && (
              <button
                onClick={() => navigate(`/certificate/${course.id}`)}
                className="mt-2 bg-gray-900 text-white px-4 py-2 rounded float-right"
              >
                View Certificate
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderListPage;
