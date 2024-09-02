import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./Pages/Chat";
import Classes from "./Pages/Classes";
import Courses from "./Pages/Courses";
import Dashboard from "./Pages/Dashboard";
import ExamResults from "./Pages/ExamResults";
import FeeManagement from "./Pages/FeeManagement";
import Profile from "./Pages/Profile";
import Support from "./Pages/Support";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";


const Layout = () => {
  return (
    <div className="layout-container">
      <Router>
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content-container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/student/chat" element={<Chat />} />
              <Route path="/student/classes" element={<Classes />} />
              <Route path="/student/courses" element={<Courses />} />
              <Route path="/student/dashboard" element={<Dashboard />} />
              <Route path="/student/examresults" element={<ExamResults />} />
              <Route path="/student/feemanagement" element={<FeeManagement />} />
              <Route path="/student/profile" element={<Profile />} />
              <Route path="/student/support" element={<Support />} />
              {/* Dashborad */}
              <Route path="/academic-performance" element={<Classes />} />
              <Route path="/notifications-announcements" element={<Classes />} />
              <Route path="/event-activities" element={<Classes />} />
              <Route path="/deadlines" element={<Classes />} />
              {/* Classes */}
              <Route path="/school-timetable" element={<Classes />} />
              <Route path="/calendar" element={<Classes />} />
              {/* Courses */}
              <Route path="/course-materials" element={<Classes />} />
              <Route path="/subjects" element={<Classes />} />
              <Route path="/student-assignments" element={<Classes />} />
              <Route path="/student-grades" element={<Classes />} />
              {/*Exam Result */}
              <Route path="/exam-datesheet" element={<Classes />} />
              <Route path="/exam-result" element={<Classes />} />
              <Route path="/subjectwise-grades" element={<Classes />} />
              <Route path="/previous-year" element={<Classes />} />
              <Route path="/exam-paper" element={<Classes />} />
              {/* Fee managemenet */}
              <Route path="/fee-structure" element={<Classes />} />
              <Route path="/payment-status" element={<Classes />} />
              <Route path="/pending-fee" element={<Classes />} />
              <Route path="/online-payment" element={<Classes />} />
              {/* Profile */}
              <Route path="/view-profile" element={<Classes />} />
              <Route path="/update-profile" element={<Classes />} />
              <Route path="/student-attendance" element={<Classes />} />
              <Route path="/change-password" element={<Classes />} />
            </Routes>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default Layout;
