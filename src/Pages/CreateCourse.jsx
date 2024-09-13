import React, { useState } from "react";
import { ethers } from "ethers";
import CoursePlatformABI from "../scdata/CoursePlatform.json";

const CreateCourse = () => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
  const [realAmount, setRealAmount] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState("");

  const contractAddress = "0xfbf991d020C31C01f79C998b2540FF8Aed71C1F1";

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, CoursePlatformABI, signer);

        // Convert real and discounted amounts to Wei (Ether)
        const realAmountInWei = ethers.utils.parseEther(realAmount);
        const discountedAmountInWei = ethers.utils.parseEther(discountedAmount);

        // Call the smart contract function with all fields
        const tx = await contract.createCourse(name, provider, description, realAmountInWei, discountedAmountInWei);
        await tx.wait();

        alert("Course created successfully!");
      } else {
        console.log("Ethereum object not found");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
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
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
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
  );
};

export default CreateCourse;
