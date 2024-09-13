import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to connect to MetaMask
  const provider = new BrowserProvider(window.ethereum);

  async function connectToMetamask() {
    try {
      const signer = await provider.getSigner();
      console.log('Address: ', await signer.getAddress());

      // Redirect to course creation page
      navigate('/create-course'); // Update this path based on your routing configuration
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  }

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-gray-900">Udemy Dapp</a>
        <div className="flex space-x-4">
          {/* Additional navbar items */}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={connectToMetamask}
            className="bg-gray-900 text-white py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            Connect to MetaMask
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
