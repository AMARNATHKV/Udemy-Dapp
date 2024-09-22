import React, { useState } from 'react';
import { ethers } from 'ethers';

const PurchaseForm = ({ courseId, contract }) => {
  const [name, setName] = useState('');
  const [purchaseStatus, setPurchaseStatus] = useState('');

  const handlePurchase = async (event) => {
    event.preventDefault();

    if (!name) {
      alert("Please enter your name before purchasing the course.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      
      // Get the discounted amount from the contract (assuming it's in wei)
      const course = await contract.getCourse(courseId);
      const discountedAmount = course.discountedAmount;

      const transaction = await contract.connect(signer).buyCourse(courseId, {
        value: discountedAmount,
      });

      await transaction.wait();

      setPurchaseStatus('Course purchased successfully');
    } catch (error) {
      console.error("Error during purchase:", error);
      setPurchaseStatus('Error purchasing course. Check console for details.');
    }
  };

  return (
    <form onSubmit={handlePurchase}>
      <div>
        <label>Your Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Buy Course</button>
      {purchaseStatus && <p>{purchaseStatus}</p>}
    </form>
  );
};

export default PurchaseForm;
