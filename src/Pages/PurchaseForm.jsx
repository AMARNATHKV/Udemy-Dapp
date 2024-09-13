import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0xYourDeployedContractAddress';
const contractABI = [
  // Add your contract ABI here
];

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBuy = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask and try again.');
      return;
    }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Convert price to wei (adjust based on your course pricing logic)
      const amountInWei = ethers.parseEther('0.1'); // Set to course price

      setIsLoading(true);

      // Send the transaction to buy the course
      const tx = await contract.buyCourse({ value: amountInWei });

      // Wait for transaction confirmation
      await tx.wait();
      setIsLoading(false);
      alert('Course purchased successfully!');

      // Redirect to a success page or another desired page
      navigate('/success');
    } catch (error) {
      console.error('Transaction failed:', error);
      setIsLoading(false);
      alert('Transaction failed. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Complete Your Purchase</h2>
      <form className="space-y-6">
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg font-semibold text-gray-700">Address (Optional)</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address (Optional)"
          />
        </div>
        <button
          type="button"
          onClick={handleBuy}
          className={`w-full py-3 mt-6 text-lg font-bold rounded-lg transition-all duration-300 ease-in-out ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Buy Now'}
        </button>
      </form>
    </div>
  );
};

export default PurchaseForm;
