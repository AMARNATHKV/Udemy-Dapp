import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const adminAddress = '0xE86d76ABE024F2f84D069113B6F5177c3894e9DA';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isConnected, setIsConnected] = useState(false); 
  const [userAddress, setUserAddress] = useState('');
  const navigate = useNavigate();

  // Function to check if the user is an admin
  async function checkAdminStatus(address) {
    if (address.toLowerCase() === adminAddress.toLowerCase()) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }

  // Function to handle connection to MetaMask
  async function connectToMetamask() {
    try {
      if (!isConnected) {
        // Create a new provider
        const provider = new BrowserProvider(window.ethereum);
        // Request MetaMask to connect
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        setIsConnected(true);
        
        // Check if the user is an admin
        await checkAdminStatus(address);
        
        // Navigate to "Create Course" page if the user is an admin and they are connecting for the first time
        if (address.toLowerCase() === adminAddress.toLowerCase()) {
          navigate('/create-course');
        }
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  }

  // Check if MetaMask is already connected on page load
  useEffect(() => {
    async function loadUser() {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        setIsConnected(true);

        // Check if the user is an admin
        await checkAdminStatus(address);
      }
    }
    loadUser();
  }, []);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-900">Udemy Dapp</Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={connectToMetamask}
            className="bg-gray-900 text-white py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            {isConnected ? `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}` : 'Connect to MetaMask'}
          </button>
          <div className="flex space-x-4">
            {!isAdmin && isConnected && (
              <Link to="/orders" className="bg-gray-900 text-white py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">My Orders</Link>
            )}
            {isAdmin && (
              <Link to="/create-course" className="bg-black text-white py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">Create Course</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
