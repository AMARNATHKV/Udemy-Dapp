import React, { useState } from "react";
import { ethers } from "ethers";
import CoursePlatformArtifact from "../scdata/CoursePlatform.json"; // Adjust the path if necessary

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [providerName, setProviderName] = useState("");
  const [description, setDescription] = useState("");
  const [realAmount, setRealAmount] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");
  const [courses, setCourses] = useState([]); 

  const contractAddress = "0xfbf991d020C31C01f79C998b2540FF8Aed71C1F1"; // Your contract address

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        // Initialize BrowserProvider from ethers
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CoursePlatformArtifact.abi, signer); // Using CoursePlatformArtifact.abi

        // Convert real and discounted amounts to Wei (Ether)
        const realAmountInWei = ethers.utils.parseEther(realAmount);
        const discountedAmountInWei = ethers.utils.parseEther(discountedAmount);

        // Call the smart contract function with all fields
        const tx = await contract.createCourse(name, providerName, description, realAmountInWei, discountedAmountInWei);
        await tx.wait();

        // Update the course list with the new course
        setCourses((prevCourses) => [
          ...prevCourses,
          {
            name,
            providerName,
            description,
            realAmount,
            discountedAmount,
          },
        ]);

        alert("Course created successfully!");

        // Reset the form
        setName("");
        setProviderName("");
        setDescription("");
        setRealAmount("");
        setDiscountedAmount("");
      } else {
        console.error('Ethereum provider not found');
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div>
      <form onSubmit={createCourse} className="p-4">
        <div>
          <label>Course Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label>Provider Name:</label>
          <input
            type="text"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label>Real Amount (in ETH):</label>
          <input
            type="text"
            value={realAmount}
            onChange={(e) => setRealAmount(e.target.value)}
            className="border p-2"
          />
        </div>
        <div>
          <label>Discounted Amount (in ETH):</label>
          <input
            type="text"
            value={discountedAmount}
            onChange={(e) => setDiscountedAmount(e.target.value)}
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
          Create Course
        </button>
      </form>

      {/* Render course cards */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Courses:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <div key={index} className="border p-4 shadow-md">
              <h3 className="text-lg font-semibold">{course.name}</h3>
              <p className="text-gray-600">Provider: {course.providerName}</p>
              <p className="text-gray-600">Description: {course.description}</p>
              <p className="text-gray-600">Real Amount: {course.realAmount} ETH</p>
              <p className="text-gray-600">Discounted Amount: {course.discountedAmount} ETH</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
