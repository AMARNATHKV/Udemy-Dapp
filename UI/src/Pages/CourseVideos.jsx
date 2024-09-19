import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';

const CourseVideos = () => {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const contractAddress = '0xca0babA69bdd31a833fed12c5b7d8DEe2a9d32b4'; // Replace with your contract address

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error('Ethereum object not found, please install MetaMask.');
          return;
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

    fetchVideos();
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
        <p>No videos available.</p>
      )}
    </div>
  );
};

export default CourseVideos;
