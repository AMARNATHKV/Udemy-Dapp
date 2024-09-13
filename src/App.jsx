import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure BrowserRouter is imported

import CourseCards from './Pages/Mainpage';
import Cart from './Pages/Cart';
import PurchaseForm from './Pages/PurchaseForm';
import CreateCourse from './Pages/CreateCourse';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CourseCards />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/purchase-form" element={<PurchaseForm />} />
                <Route path="/create-course" element={<CreateCourse />} />
            </Routes>
        </Router>
    );
}

export default App;
