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
import PaymentPage from './pages/payment/topup/PaymentPage';
import LoginPage from './pages/auth/pages/LoginPage';
import RegisterPage from './pages/auth/pages/RegisterPage';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/signup/:type" element={<RegisterPage />} />
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
          <Route path="/payment/" element={<PaymentPage/>} />
      </Routes>
    </Router>
);
}

export default App;
