import React, { useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';

const CreateCourse = () => {
  const [name, setName] = useState('');
  const [courseProvider, setCourseProvider] = useState('');
  const [description, setDescription] = useState('');
  const [imageHash, setImageHash] = useState('');
  const [realAmount, setRealAmount] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState('');
  const contractAddress = '0xca0babA69bdd31a833fed12c5b7d8DEe2a9d32b4';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('MetaMask is not installed. Please install it to use this feature.');
        return;
      }

      await ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer);

      const tx = await contract.createCourse(
        name,
        courseProvider,
        description,
        imageHash,
        ethers.parseUnits(realAmount, 'ether'),
        ethers.parseUnits(discountedAmount, 'ether')
      );

      await tx.wait();
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create New Course</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter course name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Provider</label>
            <input
              type="text"
              value={courseProvider}
              onChange={(e) => setCourseProvider(e.target.value)}
              placeholder="Enter provider name"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">IPFS Image Hash</label>
            <input
              type="text"
              value={imageHash}
              onChange={(e) => setImageHash(e.target.value)}
              placeholder="Enter IPFS image hash"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Real Amount (ETH)</label>
            <input
              type="number"
              value={realAmount}
              onChange={(e) => setRealAmount(e.target.value)}
              placeholder="Enter real amount"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Discounted Amount (ETH)</label>
            <input
              type="number"
              value={discountedAmount}
              onChange={(e) => setDiscountedAmount(e.target.value)}
              placeholder="Enter discounted amount"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gray-900 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
