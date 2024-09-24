import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserProvider, ethers } from 'ethers';
import contractAbi from '../scdata/CoursePlatform.json';

const contractAddress = '0x19eFa55C47FC9795894721718DCe4994A9749834';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [adminAddress, setAdminAddress] = useState('');


  const fetchAdminAddress = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, provider);
      const ownerAddress = await contract.getOwner();
      setAdminAddress(ownerAddress);
      console.log("Admin Address fetched:", ownerAddress);
    } catch (error) {
      console.error('Error fetching admin address:', error);
    }
  };

  
  const checkAdminStatus = (address) => {
    if (!address || !adminAddress) return;
    setIsAdmin(address.toLowerCase() === adminAddress.toLowerCase());
  };


  const connectToMetamask = async () => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
       
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        setIsConnected(true);
        checkAdminStatus(address); 
      } else {
        alert('MetaMask is not installed!');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  };

 
  useEffect(() => {
    if (window.ethereum) {
      
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          const newAddress = accounts[0];
          setUserAddress(newAddress);
          setIsConnected(true);
          checkAdminStatus(newAddress); 
        } else {
         
          setIsConnected(false);
          setUserAddress('');
        }
      });

      
      window.ethereum.on('disconnect', () => {
        setIsConnected(false);
        setUserAddress('');
      });
    }

    return () => {
      
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('disconnect', () => {});
      }
    };
  }, [adminAddress]); 

  
  useEffect(() => {
    fetchAdminAddress();
  }, []);

  
  useEffect(() => {
    if (adminAddress && userAddress) {
      checkAdminStatus(userAddress);
    }
  }, [adminAddress, userAddress]);

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
