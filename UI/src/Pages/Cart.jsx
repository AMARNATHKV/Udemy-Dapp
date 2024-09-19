import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + parseFloat(ethers.formatUnits(item.discountedAmount, 'ether')), 0);
    setTotalAmount(total);
  }, [cartItems]);

  const removeFromCart = (courseId) => {
    const updatedCart = cartItems.filter((item) => item.id !== courseId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuyNow = () => {
    navigate('/purchase-form'); 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center">
              <img
                src={`https://gateway.pinata.cloud/ipfs/${course.imageHash}`}
                alt={course.name}
                className="w-20 h-20 mr-4 rounded"
              />
              <div className="flex-1">
                <h5 className="text-lg font-bold">{course.name}</h5>
                <p className="text-sm text-gray-700">{course.provider}</p>
                <p className="text-lg font-bold">{ethers.formatUnits(course.discountedAmount, 'ether')} ETH</p>
              </div>
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeFromCart(course.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Total Amount:</span>
            <span className="text-lg font-bold text-green-600">{totalAmount} ETH</span>
          </div>
          <button
            onClick={handleBuyNow}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Buy Now
          </button>
        </div>
      ) : (
        <p>
          Your cart is empty.{' '}
          <button onClick={() => navigate('/')} className="text-blue-500 underline">
            Go back to courses
          </button>
        </p>
      )}
    </div>
  );
};

export default Cart;
