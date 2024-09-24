import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractAbi from '../scdata/CoursePlatform.json';

const contractAddress = ' 0x19eFa55C47FC9795894721718DCe4994A9749834'; 

const CourseVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourseVideos();
  }, [courseId]);

  const loadCourseVideos = async () => {
    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
      const courseVideos = await contract.getCourseVideos(courseId);
      setVideos(courseVideos);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeCourse = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
      const tx = await contract.completeCourse(courseId); 
      await tx.wait();
      navigate(`/certificate/${courseId}`);
    } catch (error) {
      console.error('Error completing course:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Course Videos</h1>
      {loading ? (
        <p>Loading videos...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, index) => (
              <div key={index} className="mb-4">
                <video
                  controls
                  src={`https://ipfs.io/ipfs/${video.videoHash}`}
                  className="w-full h-48 object-cover rounded shadow-lg"
                />
                <p className="font-semibold mt-2">{video.videoDescription}</p>
              </div>
            ))}
          </div>
          <button
            onClick={completeCourse}
            className="mt-8 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow hover:bg-gray-900"
          >
            Complete Course
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseVideos;
