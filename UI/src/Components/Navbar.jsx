import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BrowserProvider } from 'ethers';

const adminAddress = '0xE86d76ABE024F2f84D069113B6F5177c3894e9DA'; // Admin's Ethereum address

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Track if the user is an admin
  const [isConnected, setIsConnected] = useState(false); // Track if MetaMask is connected
  const [userAddress, setUserAddress] = useState('');
  const navigate = useNavigate();
  const provider = new BrowserProvider(window.ethereum);

  useEffect(() => {
    async function checkUser() {
      try {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        console.log('Address:', address);

        // Check if the connected user is the admin
        if (address.toLowerCase() === adminAddress.toLowerCase()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setIsConnected(true);
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
    }

    if (window.ethereum) {
      checkUser();
    }
  }, [provider]);

  async function connectToMetamask() {
    try {
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);

      // Redirect based on the user's role
      if (address.toLowerCase() === adminAddress.toLowerCase()) {
        navigate('/create-course');
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
              // Show "My Orders" link only if the user is not the admin and MetaMask is connected
              <Link to="/orders" className="bg-gray-900 text-white py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">My Orders</Link>
            )}
            {isAdmin && (
              // Show "Create Course" button only if the user is an admin
              <Link to="/create-course" className="bg-black text-white py-2 px-6 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform">Create Course</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
