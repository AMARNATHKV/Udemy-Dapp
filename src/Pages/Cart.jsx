// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const navigate = useNavigate();

// //   // Fetch cart items from localStorage on component mount
// //   useEffect(() => {
// //     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
// //     setCartItems(storedCart);
// //   }, []);

// //   // Calculate the total amount whenever cartItems change
// //   useEffect(() => {
// //     const total = cartItems.reduce((acc, item) => acc + item.price, 0);
// //     setTotalAmount(total);
// //   }, [cartItems]);

// //   // Function to remove a course from the cart
// //   const removeFromCart = (courseTitle) => {
// //     const updatedCart = cartItems.filter((item) => item.title !== courseTitle);
// //     setCartItems(updatedCart);
// //     localStorage.setItem('cart', JSON.stringify(updatedCart));
// //   };

// //   // Function to handle the "Buy Now" process (implement blockchain logic here)
// //   const buyNow = () => {
// //     alert('Proceeding to buy!');
// //     // Implement the MetaMask transaction logic here
// //   };

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
// //       {cartItems.length > 0 ? (
// //         <div>
// //           {cartItems.map((course, index) => (
// //             <div
// //               key={index}
// //               className="bg-white rounded-lg shadow-lg p-4 mb-4"
// //             >
// //               <div className="flex justify-between items-center">
// //                 <div>
// //                   <h5 className="text-lg font-bold">{course.title}</h5>
// //                   <p className="text-sm text-gray-700">{course.instructor}</p>
// //                   <p className="text-lg font-bold">₹{course.price}</p>
// //                 </div>
// //                 <button
// //                   className="bg-red-500 text-white font-bold py-2 px-4 rounded"
// //                   onClick={() => removeFromCart(course.title)}
// //                 >
// //                   Remove
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //           {/* Display Total Amount */}
// //           <div className="flex justify-between items-center mt-4">
// //             <span className="text-lg font-bold">Total Amount:</span>
// //             <span className="text-lg font-bold text-green-600">
// //               ₹{totalAmount}
// //             </span>
// //           </div>
// //           <button
// //             onClick={buyNow}
// //             className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
// //           >
// //             Buy Now
// //           </button>
// //         </div>
// //       ) : (
// //         <p>
// //           Your cart is empty.{' '}
// //           <button
// //             onClick={() => navigate('/')}
// //             className="text-blue-500 underline"
// //           >
// //             Go back to courses
// //           </button>
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();

//   // Fetch cart items from localStorage on component mount
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(storedCart);
//   }, []);

//   // Calculate the total amount whenever cartItems change
//   useEffect(() => {
//     const total = cartItems.reduce((acc, item) => acc + item.price, 0);
//     setTotalAmount(total);
//   }, [cartItems]);

//   // Function to remove a course from the cart
//   const removeFromCart = (courseTitle) => {
//     const updatedCart = cartItems.filter((item) => item.title !== courseTitle);
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   // Function to handle the "Buy Now" process (implement blockchain logic here)
//   const buyNow = () => {
//     alert('Proceeding to buy!');
//     // Implement the MetaMask transaction logic here
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
//       {cartItems.length > 0 ? (
//         <div>
//           {cartItems.map((course, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-lg p-4 mb-4 flex"
//             >
//               <img
//                 src={course.image}
//                 alt={course.title}
//                 className="w-24 h-24 rounded object-cover mr-4"
//               />
//               <div className="flex flex-col justify-between flex-grow">
//                 <div>
//                   <h5 className="text-lg font-bold">{course.title}</h5>
//                   <p className="text-sm text-gray-700">{course.instructor}</p>
//                   <p className="text-lg font-bold">₹{course.price}</p>
//                 </div>
//                 <button
//                   className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-2 self-start"
//                   onClick={() => removeFromCart(course.title)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           {/* Display Total Amount */}
//           <div className="flex justify-between items-center mt-4">
//             <span className="text-lg font-bold">Total Amount:</span>
//             <span className="text-lg font-bold text-green-600">
//               ₹{totalAmount}
//             </span>
//           </div>
//           <button
//             onClick={buyNow}
//             className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
//           >
//             Buy Now
//           </button>
//         </div>
//       ) : (
//         <p>
//           Your cart is empty.{' '}
//           <button
//             onClick={() => navigate('/')}
//             className="text-blue-500 underline"
//           >
//             Go back to courses
//           </button>
//         </p>
//       )}
//     </div>
//   );
// };

// export default Cart;
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
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const removeFromCart = (courseTitle) => {
    const updatedCart = cartItems.filter((item) => item.title !== courseTitle);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBuyNow = () => {
    // Navigate to the PurchaseForm when "Buy Now" is clicked
    navigate('/purchase-form');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-20 h-20 mr-4 rounded"
              />
              <div className="flex-1">
                <h5 className="text-lg font-bold">{course.title}</h5>
                <p className="text-sm text-gray-700">{course.instructor}</p>
                <p className="text-lg font-bold">₹{course.price}</p>
              </div>
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                onClick={() => removeFromCart(course.title)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-bold">Total Amount:</span>
            <span className="text-lg font-bold text-green-600">
              ₹{totalAmount}
            </span>
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
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 underline"
          >
            Go back to courses
          </button>
        </p>
      )}
    </div>
  );
};

export default Cart;
