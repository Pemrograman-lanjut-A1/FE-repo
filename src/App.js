import React from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import ViewAnnouncementsPage from './pages/staff-dashboard/announcement/view-announcements-page';

import ViewWaitingTopUpsPage from './pages/staff-dashboard/confirm-topup/view-waiting-top-ups-page';
import CreateAnnouncementPage from './pages/staff-dashboard/announcement/create.announcement.page';
import PaymentPage from './pages/payment/topup/PaymentPage';
import LoginPage from './pages/auth/pages/LoginPage';
import RegisterPage from './pages/auth/pages/RegisterPage';
import Navbar from './components/Navbar';
import CartPage from './pages/buy/CartPage';
import CheckoutPage from './pages/buy/CheckoutPage';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/signup/:type" element={<RegisterPage />} />
          <Route
              path="/staff/view-announcement"
              element={<ViewAnnouncementsPage />}
          />
          <Route path="/staff/create-announcement" element={<CreateAnnouncementPage />}/>
          <Route path="staff/view-waiting-top-ups" element={<ViewWaitingTopUpsPage/>}/>
          <Route path="/payment/" element={<PaymentPage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />

      </Routes>
    </Router>
);
}

export default App;
