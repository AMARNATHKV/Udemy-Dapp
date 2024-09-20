import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider } from 'ethers';


const adminAddress = '0xE86d76ABE024F2f84D069113B6F5177c3894e9DA';

const Navbar = () => {
  const navigate = useNavigate(); 
  const provider = new BrowserProvider(window.ethereum);

  
  async function connectToMetamask() {
    try {
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      console.log('Address:', userAddress);

      
      if (userAddress.toLowerCase() === adminAddress.toLowerCase()) {
       
        navigate('/create-course'); // Update this path based on your routing configuration
      } else {
        navigate('/');
      }
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
            Connect to MetaMask/Add course
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
