import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';

const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState({});
  const [newVideoHash, setNewVideoHash] = useState('');
  const [newVideoDescription, setNewVideoDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [buyingCourse, setBuyingCourse] = useState(null);
  
  const contractAddress = '0x8813c4F20a6b0E403276F10f444aaDC868c710CF';

  useEffect(() => {
    const fetchCoursesAndAdmin = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error('Ethereum object not found, please install MetaMask.');
          return;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, provider);

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        const ownerAddress = await contract.owner();

        setIsAdmin(ownerAddress.toLowerCase() === userAddress.toLowerCase());

        const courseCount = await contract.courseCount();
        const courseArray = [];
        for (let i = 1; i <= courseCount; i++) {
          const course = await contract.courses(i);
          courseArray.push(course);
        }

        setCourses(courseArray);
      } catch (error) {
        console.error('Error fetching courses or checking admin status:', error);
      }
    };

    fetchCoursesAndAdmin();
  }, []);

  const handleBuyCourse = async (courseId) => {
    if (buyingCourse === courseId) return; 

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error('Ethereum object not found, please install MetaMask.');
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

      setBuyingCourse(courseId);
      setLoading(true);
      const tx = await contract.buyCourse(courseId, {
        value: ethers.parseUnits("0.01", "ether") 
      });

      await tx.wait();
      setLoading(false);
      setBuyingCourse(null);
    } catch (error) {
      console.error('Error buying course:', error);
      setLoading(false);
      setBuyingCourse(null);
    }
  };

  const handleUploadVideo = async () => {
    if (!selectedCourse || !newVideoHash || !newVideoDescription) return;

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error('Ethereum object not found, please install MetaMask.');
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

      setUploadingVideo(prev => ({ ...prev, [selectedCourse]: true }));
      const tx = await contract.addVideoToCourse(selectedCourse, newVideoHash, newVideoDescription);
      await tx.wait();

      
      setNewVideoHash('');
      setNewVideoDescription('');
      setSelectedCourse(null);
      setUploadingVideo(prev => ({ ...prev, [selectedCourse]: false }));
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadingVideo(prev => ({ ...prev, [selectedCourse]: false }));
    }
  };

  return (
    <>
      <h1 className="font-bold text-2xl text-align-center">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {courses.map((course, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={`https://ipfs.io/ipfs/${course.imageHash}`}
              alt={course.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-2">{course.name}</h2>
            <p className="text-sm text-gray-600">{course.provider}</p>
            <p className="text-gray-700 mt-2">{course.description}</p>
            <p className="text-gray-900 mt-2 font-bold line-through">
            {course.realAmount ? ethers.formatEther(course.realAmount) : '0.00'} ETH
            </p>
            <p className="text-gray-900 mt-2 font-bold">
             {course.discountedAmount ? ethers.formatEther(course.discountedAmount) : '0.00'} ETH
            </p>

            {isAdmin ? (
              <>
                <button
                  onClick={() => setSelectedCourse(course.id)}
                  className="mt-4 bg-black text-white px-4 py-2 rounded"
                >
                  Add Video
                </button>

                {selectedCourse === course.id && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter IPFS hash"
                      value={newVideoHash}
                      onChange={(e) => setNewVideoHash(e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Enter Video Description"
                      value={newVideoDescription}
                      onChange={(e) => setNewVideoDescription(e.target.value)}
                      className="border p-2 rounded mt-2"
                    />
                    <button
                      onClick={handleUploadVideo}
                      className="mt-2 bg-gray-900 text-white px-4 py-2 rounded"
                      disabled={uploadingVideo[course.id]}
                    >
                      {uploadingVideo[course.id] ? 'Uploading...' : 'Upload Video'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => handleBuyCourse(course.id)}
                className="mt-4 bg-black text-white px-4 py-2 rounded"
                disabled={loading || buyingCourse === course.id}
              >
                {loading && buyingCourse === course.id ? 'Processing...' : 'Buy Course'}
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseCards;
