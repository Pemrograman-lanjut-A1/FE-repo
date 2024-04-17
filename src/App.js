import logo from './logo.svg';
import './App.css';

import React from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import StaffHomePage from "./pages/staff-dashboard/staff-homepage";
import ViewAnnouncements from './pages/staff-dashboard/view-announcements';
import ViewWaitingPayments from './pages/staff-dashboard/view-waiting-payments';
import ViewWaitingTopUps from './pages/staff-dashboard/view-waiting-top-ups';
import TopUpHomePage from './pages/payment/topup/TopUpHomePage';
import CreateTopUpPage from './pages/payment/topup/CreateTopUpPage';
import MyReportsPage from "./pages/report/MyReportsPage";
import ReportReceivedPage from "./pages/report/ReportReceivedPage";

function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/staff/homepage" element={<StaffHomePage />} />
          <Route
              path="/staff/view-announcement"
              element={<ViewAnnouncements />}
          />
          <Route path="/staff/view-waiting-payments" element={<ViewWaitingPayments />} />
          <Route
              path="/staff/view-waiting-top-ups"
              element={<ViewWaitingTopUps />}
          />
          <Route path="/topup/" element={<TopUpHomePage/>} />
          <Route path="/report/my-reports" element={<MyReportsPage/>}/>
          <Route path="/report/reports-received" element={<ReportReceivedPage/>}/>
      </Routes>
    </Router>
);
}

export default App;
