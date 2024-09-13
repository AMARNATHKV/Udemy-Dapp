import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { useNavigate } from 'react-router-dom';
import course1 from "../assets/Images/course1.jpg"
import course2 from "../assets/Images/course2.jpg"
import course3 from "../assets/Images/course3.jpg"
import course4 from "../assets/Images/course4.jpg"
import course5 from "../assets/Images/course5.jpg"
import course6 from "../assets/Images/course6.jpg"
import course7 from "../assets/Images/course7.webp"
import course8 from "../assets/Images/course8.png"

const courses = [
    // Your course definitions rmain here...
    {
        title: "The Complete 2024 Web Development Bootcamp",
        instructor: "Dr. Angela Yu, Developer and Lead Instructor",
        rating: 4.7,
        reviews: 401532,
        price: 499,
        originalPrice: 3099,
        image: course1 // Replace with actual image path
    },
    {
        title: "The Web Developer Bootcamp 2024",
        instructor: "Colt Steele",
        rating: 4.7,
        reviews: 275548,
        price: 499,
        originalPrice: 3099,
        image: course2
    },
    {
        title: "Web Development Masterclass - Online Certification Course",
        instructor: "YouAccel Training",
        rating: 4.5,
        reviews: 9926,
        price: 499,
        originalPrice: 3099,
        image: course3
    },
    {
        title: "The Complete Web Developer Course 3.0",
        instructor: "Rob Percival, Codestars",
        rating: 4.5,
        reviews: 72225,
        price: 699,
        originalPrice: 4499,
        image: course4
    },
    {
        title: "Javascript for Beginners",
        instructor: "Colt Steele",
        rating: 4.7,
        reviews: 275548,
        price: 499,
        originalPrice: 3099,
        image: course5
    },
    {
        title: "Become a Certified Web Developer: HTML, CSS and JavaScript",
        instructor: "YouAccel Training",
        rating: 4.5,
        reviews: 9926,
        price: 499,
        originalPrice: 3099,
        image: course6
    },
    {
        title: "AJAX Development",
        instructor: "Rob Percival, Codestars",
        rating: 4.5,
        reviews: 72225,
        price: 699,
        originalPrice: 4499,
        image: course7
    },
    {
        title: "The Complete 2020 Fullstack Web Developer Course",
        instructor: "Rob Percival, Codestars",
        rating: 4.5,
        reviews: 72225,
        price: 699,
        originalPrice: 4499,
        image: course8
    }
    // More courses...
];

const CourseCards = () => {
    const [showAll, setShowAll] = useState(false);
    const [cartCourses, setCartCourses] = useState([]);
    const navigate = useNavigate();

    // MetaMask connection for handling transactions or cart logic
    const provider = new BrowserProvider(window.ethereum);

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCourses(storedCart);
    }, []);

    // Function to add a course to the cart and store in localStorage
    const addToCart = (course) => {
        try {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            // Check if the item is already in the cart
            if (!cart.some(item => item.title === course.title)) {
                cart.push(course);
                localStorage.setItem('cart', JSON.stringify(cart));
                setCartCourses(cart); // Update state to reflect cart changes
                console.log(`Added ${course.title} to the cart.`);
            } else {
                console.log(`${course.title} is already in the cart.`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    }

    // Check if the course is already in the cart
    const isCourseInCart = (course) => {
        return cartCourses.some(item => item.title === course.title);
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {courses.slice(0, showAll ? courses.length : 4).map((course, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between">
                        <div>
                            <img src={course.image} alt={course.title} className="rounded-t-lg w-full h-48 object-cover" />
                            <div className="p-4">
                                <h5 className="text-lg font-bold">{course.title}</h5>
                                <p className="text-sm text-gray-700">{course.instructor}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-sm text-yellow-400">{Array(Math.floor(course.rating)).fill("★").join("")}</span>
                                    <span className="text-xs text-gray-500 ml-2">({course.reviews.toLocaleString()})</span>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="text-xl font-bold">₹{course.price}</span>
                                    <span className="text-sm line-through text-gray-500">₹{course.originalPrice}</span>
                                </div>
                            </div>
                        </div>

                        {/* Conditionally render the button based on whether the course is in the cart */}
                        {isCourseInCart(course) ? (
                            <button 
                                className="mt-4 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 self-stretch"
                                onClick={() => navigate('/cart')} // Navigate to Cart Page
                            >
                                Go to Cart
                            </button>
                        ) : (
                            <button 
                                className="mt-4 bg-black hover:bg-gray-300 text-white font-bold py-2 px-4 self-stretch"
                                onClick={() => addToCart(course)}
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <button 
                onClick={() => setShowAll(!showAll)} 
                className="mt-4 bg-white hover:bg-gray-300 text-gray-900 font-bold py-2 px-4 border border-black rounded"
            >
                {showAll ? 'Show Less' : 'Show All Courses'}
            </button>
        </div>
    );
}

export default CourseCards;
