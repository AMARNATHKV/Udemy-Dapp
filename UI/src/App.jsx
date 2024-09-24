import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Ensure BrowserRouter is imported
import CreateCourse from './Pages/CreateCourse';
import Mainpage from './Pages/Mainpage';
import CourseVideos from './Pages/CourseVideos';
import OrderListPage from './Pages/OrderListPage';
import Certificate from './Pages/Certificate';



const App = () => {
    return (
        <Router>
            
            <Routes>
                
           
            <Route path="/orders" element={<OrderListPage />} />
                <Route path="/" element={<Mainpage />} />
                <Route path="/create-course" element={<CreateCourse />} />
               <Route path="/course-videos/:courseId" element={<CourseVideos />} />
               <Route path="/certificate/:courseId" element={<Certificate />} />
              
            </Routes>
        </Router>
    );
}

export default App;
