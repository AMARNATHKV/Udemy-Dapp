import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure BrowserRouter is imported
import Cart from './Pages/Cart';
import CreateCourse from './Pages/CreateCourse';

import Mainpage from './Pages/Mainpage';
import CourseVideos from './Pages/CourseVideos';
import PurchaseForm from './Pages/PurchaseForm';


const App = () => {
    return (
        <Router>
            
            <Routes>
                
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<Mainpage />} />
                <Route path="/create-course" element={<CreateCourse />} />
                {/* <Route path="/course/:id" element={<CoursePage />} />
                <Route path="/certificate/:courseId" element={<CertificatePage />} /> */}
               <Route path="/course-videos/:courseId" element={<CourseVideos />} />
               <Route path="/purchase/:courseId" element={<PurchaseForm />} />
            </Routes>
        </Router>
    );
}

export default App;
