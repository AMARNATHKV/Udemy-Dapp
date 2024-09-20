import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';

const CourseCards = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [videos, setVideos] = useState({}); // Store videos by courseId
  const [uploadingVideo, setUploadingVideo] = useState({}); // Track uploading state for each course
  const [newVideoHash, setNewVideoHash] = useState(''); // New video IPFS hash
  const [selectedCourse, setSelectedCourse] = useState(null); // Selected course for video upload
  const [buyingCourse, setBuyingCourse] = useState(null); // Track the course currently being bought

  const contractAddress = '0xca0babA69bdd31a833fed12c5b7d8DEe2a9d32b4'; 

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
    if (buyingCourse === courseId) return; // Prevent duplicate purchase attempts

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
    if (!selectedCourse || !newVideoHash) return;

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
      const tx = await contract.addVideoToCourse(selectedCourse, newVideoHash);
      await tx.wait();

      // Clear the input and reset the selected course
      setNewVideoHash('');
      setSelectedCourse(null);
      setUploadingVideo(prev => ({ ...prev, [selectedCourse]: false }));
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploadingVideo(prev => ({ ...prev, [selectedCourse]: false }));
    }
  };

  const fetchCourseVideos = async (courseId) => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error('Ethereum object not found, please install MetaMask.');
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

      // Fetch video hashes for the course
      const videoHashes = await contract.getCourseVideos(courseId);

      // Update the state to store the videos for this course
      setVideos(prevVideos => ({
        ...prevVideos,
        [courseId]: videoHashes
      }));
    } catch (error) {
      console.error('Error fetching videos:', error);
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
            <p className="text-gray-900 mt-2 font-bold">
              {ethers.formatEther(course.discountedAmount)} ETH
            </p>

            {isAdmin ? (
              <>
                <button
                  onClick={() => setSelectedCourse(course.id)}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add Video
                </button>

                {/* Show upload video input when adding video */}
                {selectedCourse === course.id && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Enter IPFS hash"
                      value={newVideoHash}
                      onChange={(e) => setNewVideoHash(e.target.value)}
                      className="border p-2 rounded"
                    />
                    <button
                      onClick={handleUploadVideo}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                      disabled={uploadingVideo[course.id]}
                    >
                      {uploadingVideo[course.id] ? 'Uploading...' : 'Upload Video'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => handleBuyCourse(course.id)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading || buyingCourse === course.id}
                >
                  {loading && buyingCourse === course.id ? 'Processing...' : 'Buy Course'}
                </button>

                {/* Button to fetch videos after buying */}
                <button
  onClick={() => {
    // Navigate to the CourseVideos page
    window.location.href = `/course-videos/${course.id}`;
  }}
  className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
>
  Show Videos
</button>

              </>
            )}

            {/* Render videos if they are available for this course */}
{videos[course.id] && (
  <div className="mt-4">
    
    <h3 className="font-bold text-lg">Course Videos:</h3>
    {videos[course.id].map((videoHash, videoIndex) => (
      <div key={videoIndex} className="mt-2">
        <video width="100%" height="auto" controls>
          <source
            src={`https://ipfs.io/ipfs/${videoHash}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    ))}
  </div>
)}

          </div>
        ))}
      </div>
    </>
  );
};

export default CourseCards;