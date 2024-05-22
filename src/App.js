import './App.css';

import React from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import StaffHomePage from "./pages/staff-dashboard/staff-homepage";
import ViewAnnouncementsPage from './pages/staff-dashboard/announcement/view-announcements-page';
import ViewWaitingPayments from './pages/staff-dashboard/view-waiting-payments';
import ViewWaitingTopUpsPage from './pages/staff-dashboard/confirm-topup/view-waiting-top-ups-page';
//import TopUpHomePage from './pages/payment/topup/TopUpHomePage';
//import CreateTopUpPage from './pages/payment/topup/CreateTopUpPage';
import CreateAnnouncementPost from './pages/staff-dashboard/announcement/create-announcement-post';
import CreateAnnouncementPage from './pages/staff-dashboard/announcement/create.announcement.page';
//import ViewWaitingTopUps from './pages/staff-dashboard/view-waiting-top-ups';
import PaymentPage from './pages/payment/topup/PaymentPage';
import LoginPage from './pages/auth/pages/LoginPage';
import RegisterPage from './pages/auth/pages/RegisterPage';


function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/signup" element={<RegisterPage />} />
          <Route path="/staff/homepage" element={<StaffHomePage />} />
          <Route
              path="/staff/view-announcement"
              element={<ViewAnnouncementsPage />}
          />
          <Route path="/staff/view-waiting-payments" element={<ViewWaitingPayments />} />
          <Route path="/staff/create-announcement" element={<CreateAnnouncementPage />}/>
          <Route path="staff/view-waiting-top-ups" element={<ViewWaitingTopUpsPage/>}/>

          {/* <Route path="/topup/" element={<TopUpHomePage/>} /> */}
          {/* <Route path="/topup/create" element={<CreateTopUpPage/>}/> */}
          <Route
              path="/staff/view-waiting-top-ups"
              // element={<ViewWaitingTopUps />}
          />
          <Route path="/payment/" element={<PaymentPage/>} />
      </Routes>
    </Router>
);
}

export default App;
