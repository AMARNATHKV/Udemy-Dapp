import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';
import { useParams } from 'react-router-dom';

const CourseVideos = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState(''); // State for course name

  const contractAddress = '0xca0babA69bdd31a833fed12c5b7d8DEe2a9d32b4';

  useEffect(() => {
    const fetchCourseVideosAndName = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error('Ethereum object not found, please install MetaMask.');
          return;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

        // Fetch course details (including name)
        const course = await contract.courses(courseId);
        setCourseName(course.name);

        // Fetch video hashes for the course
        const videoHashes = await contract.getCourseVideos(courseId);
        setVideos(videoHashes);
      } catch (error) {
        console.error('Error fetching course videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseVideosAndName();
  }, [courseId]);

  if (loading) {
    return <div>Loading videos...</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">{courseName}</h1>
      <h1 className="font-bold text-lg mb-4">Course Videos</h1>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((videoHash, videoIndex) => (
            <div key={videoIndex} className="border rounded-lg overflow-hidden shadow-md">
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
      ) : (
        <p>No videos available for this course.</p>
      )}
    </div>
  );
};

export default CourseVideos;

