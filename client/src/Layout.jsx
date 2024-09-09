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
import AcademicPerformance from "./Dashboard/AcademicPerformance";
import Notification from "./Dashboard/Notification";
import Events from "./Dashboard/Events";
import Timetable from "./Classes/Timetable";
import Calendar from "./Classes/Calendar";
import CourseMaterials from "./Couses/CourseMaterials";
import Subjects from "./Couses/Subjects";
import Assignments from "./Couses/Assignments";
import Grades from "./Couses/Grades";
import Datesheet from "./Exam/ExamDatesheet";
import Results from "./Exam/Results";
import SubjectGrades from "./Exam/SubjectGrades";
import Papers from "./Exam/Papers";
import FeeStructure from "./Fees/FeeStructure";
import PaymentStatus from "./Fees/PaymentStatus";
import PendingFees from "./Fees/PendingFees";
import OnlinePayment from "./Fees/OnlinePayment";
import ViewProfile from "./Profile/ViewProfile";
import UpdateProfile from "./Profile/UpdateProfile";
import Attendance from "./Profile/Attendance";
import ChangePassword from "./Profile/ChangePassword";
import Homework from "./Dashboard/Homework";
import TestSchedule from "./Dashboard/TestSchedule";


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
              <Route path="/academic-performance" element={<AcademicPerformance />} />
              <Route path="/notifications-announcements" element={<Notification />} />
              <Route path="/event-activities" element={<Events />} />
              <Route path="/student-homework" element={<Homework />} />
              <Route path="/test-schedule" element={<TestSchedule />} />
              {/* Classes */}
              <Route path="/school-timetable" element={<Timetable />} />
              <Route path="/calendar" element={<Calendar />} />
              {/* Courses */}
              <Route path="/course-materials" element={<CourseMaterials />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/student-assignments" element={<Assignments />} />
              <Route path="/student-grades" element={<Grades />} />
              {/*Exam Result */}
              <Route path="/exam-datesheet" element={<Datesheet />} />
              <Route path="/exam-result" element={<Results />} />
              <Route path="/subjectwise-grades" element={<SubjectGrades />} />
              <Route path="/exam-paper" element={<Papers />} />
              {/* Fee managemenet */}
              <Route path="/fee-structure" element={<FeeStructure />} />
              <Route path="/payment-status" element={<PaymentStatus />} />
              <Route path="/pending-fee" element={<PendingFees />} />
              <Route path="/online-payment" element={<OnlinePayment />} />
              {/* Profile */}
              <Route path="/view-profile" element={<ViewProfile />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/student-attendance" element={<Attendance />} />
              <Route path="/change-password" element={<ChangePassword />} />
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
