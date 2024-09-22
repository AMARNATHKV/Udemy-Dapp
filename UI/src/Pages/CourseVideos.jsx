import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';
import { useParams } from 'react-router-dom';

const CourseVideos = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState(''); // State for course name
  const [error, setError] = useState(''); // State for error handling

  const contractAddress = '0x8813c4F20a6b0E403276F10f444aaDC868c710CF';

  useEffect(() => {
    const fetchCourseVideosAndName = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error('Ethereum object not found, please install MetaMask.');
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

        // Fetch course details (including name)
        const course = await contract.getCourse(courseId);
        setCourseName(course.name);

        // Fetch video hashes and descriptions for the course
        const videoData = await contract.getCourseVideos(courseId);
        setVideos(videoData);
      } catch (error) {
        console.error('Error fetching course videos:', error);
        setError(error.message || 'An error occurred while fetching videos.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseVideosAndName();
  }, [courseId]);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">{courseName}</h1>
      <h2 className="font-bold text-lg mb-4">Course Videos</h2>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, videoIndex) => (
            <div key={videoIndex} className="border rounded-lg overflow-hidden shadow-md">
              <video width="100%" controls>
                <source
                  src={`https://ipfs.io/ipfs/${video.videoHash}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <p className="p-2 text-sm text-gray-600">{video.videoDescription}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No videos available for this course.</p>
      )}
    </div>
  );
};

export default CourseVideos;
