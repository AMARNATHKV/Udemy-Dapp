import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';
import { useParams } from 'react-router-dom';

const CourseVideos = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const contractAddress = '0x8813c4F20a6b0E403276F10f444aaDC868c710CF'; 
  useEffect(() => {
    const fetchCourseVideosAndName = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error('Ethereum object not found, please install MetaMask.');
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, provider);

        setLoading(true);
        const videoHashes = await contract.getCourseVideos(courseId);
        setVideos(videoHashes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchCourseVideosAndName();
  }, [courseId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Course Videos</h1>
      {loading ? (
        <p>Loading videos...</p>
      ) : videos.length > 0 ? (
        videos.map((videoHash, index) => (
          <div key={index} className="mt-2">
            <a
              href={`https://ipfs.io/ipfs/${videoHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View Video {index + 1}
            </a>
          </div>
        ))
      ) : (
        <p>No videos available for this course.</p>
      )}
    </div>
  );
};

export default CourseVideos;

