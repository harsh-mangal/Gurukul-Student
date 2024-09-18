import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import BottomNav from "./Components/BottomNav"; // Import BottomNav
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
import Login from "./Pages/Login";
import SchoolAchievement from "./Profile/SchoolAchievement";
import StudentAchievement from "./Profile/StudentAchievement";
import SchoolAbout from "./Dashboard/SchoolAbout";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Example function to check if user is authenticated
  const isAuthenticated = () => {
    // Check for token in localStorage or any other method
    return localStorage.getItem("authToken") !== null;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="layout-container flex flex-col min-h-screen">
        {/* Check if route is not login to show Navbar, Sidebar, and Footer */}
        <div className="flex-1">
          {/* Conditional rendering based on the route */}
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Protected routes */}
            <Route
              path="/*"
              element={
                isAuthenticated() ? (
                  <div className="flex flex-col min-h-screen">
                    <Navbar toggleSidebar={toggleSidebar} />
                    <div className="flex flex-1">
                      {/* Sidebar - Hidden on small screens, visible on medium and larger screens */}
                      <div className={`sidebar ${isSidebarOpen ? "block" : "hidden"} md:block`}>
                        <Sidebar isOpen={isSidebarOpen} />
                      </div>

                      {/* Main content */}
                      <div className="main-content flex-1 p-4">
                        <Routes>
                          <Route path="/student/chat" element={<Chat />} />
                          <Route path="/student/classes" element={<Classes />} />
                          <Route path="/student/courses" element={<Courses />} />
                          <Route path="/student/dashboard" element={<Dashboard />} />
                          <Route path="/student/examresults" element={<ExamResults />} />
                          <Route path="/student/feemanagement" element={<FeeManagement />} />
                          <Route path="/student/profile" element={<Profile />} />
                          <Route path="/student/support" element={<Support />} />
                          <Route path="/aboutschool" element={<SchoolAbout />} />
                          {/* Other routes */}
                          <Route path="/academic-performance" element={<AcademicPerformance />} />
                          <Route path="/notifications-announcements" element={<Notification />} />
                          <Route path="/event-activities" element={<Events />} />
                          <Route path="/student-homework" element={<Homework />} />
                          <Route path="/test-schedule" element={<TestSchedule />} />
                          <Route path="/school-timetable" element={<Timetable />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route path="/course-materials" element={<CourseMaterials />} />
                          <Route path="/subjects" element={<Subjects />} />
                          <Route path="/student-assignments" element={<Assignments />} />
                          <Route path="/student-grades" element={<Grades />} />
                          <Route path="/exam-datesheet" element={<Datesheet />} />
                          <Route path="/exam-result" element={<Results />} />
                          <Route path="/subjectwise-grades" element={<SubjectGrades />} />
                          <Route path="/exam-paper" element={<Papers />} />
                          <Route path="/fee-structure" element={<FeeStructure />} />
                          <Route path="/payment-status" element={<PaymentStatus />} />
                          <Route path="/pending-fee" element={<PendingFees />} />
                          <Route path="/online-payment" element={<OnlinePayment />} />
                          <Route path="/view-profile" element={<ViewProfile />} />
                          <Route path="/school-achievement" element={<SchoolAchievement />} />
                          <Route path="/student-achievement" element={<StudentAchievement />} />
                          <Route path="/student-attendance" element={<Attendance />} />
                          <Route path="/change-password" element={<ChangePassword />} />
                          <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                      </div>
                    </div>

                    {/* Footer - Hidden on small screens */}
                    <div className="footer hidden md:block">
                      <Footer />
                    </div>

                    {/* Bottom Navigation - Visible only on small screens */}
                    <div className="md:hidden">
                      <BottomNav />
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
