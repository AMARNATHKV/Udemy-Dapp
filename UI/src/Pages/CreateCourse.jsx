import React, { useState } from 'react';
import { ethers } from 'ethers';
import CoursePlatformArtifact from '../scdata/CoursePlatform.json';

const CreateCourse = () => {
  const [name, setName] = useState('');
  const [courseProvider, setCourseProvider] = useState(''); // Renamed from 'provider' to avoid confusion
  const [description, setDescription] = useState('');
  const [imageHash, setImageHash] = useState('');
  const [realAmount, setRealAmount] = useState('');
  const [discountedAmount, setDiscountedAmount] = useState('');
  const contractAddress = '0xca0babA69bdd31a833fed12c5b7d8DEe2a9d32b4'; // Replace with your contract address

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { ethereum } = window;

      // Check if MetaMask (or another wallet) is installed
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Course Name"
        required
      />
      <input
        type="text"
        value={courseProvider}
        onChange={(e) => setCourseProvider(e.target.value)}
        placeholder="Course Provider"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Course Description"
        required
      />
      <input
        type="text"
        value={imageHash}
        onChange={(e) => setImageHash(e.target.value)}
        placeholder="IPFS Image Hash"
        required
      />
      <input
        type="number"
        value={realAmount}
        onChange={(e) => setRealAmount(e.target.value)}
        placeholder="Real Amount (ETH)"
        required
      />
      <input
        type="number"
        value={discountedAmount}
        onChange={(e) => setDiscountedAmount(e.target.value)}
        placeholder="Discounted Amount (ETH)"
        required
      />
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CreateCourse;
