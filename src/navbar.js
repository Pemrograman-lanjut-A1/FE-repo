import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/staff/view-announcement">Announcements</Link></li>
        <li><Link to="/staff/create-announcement">Create Announcement</Link></li>
        <li><Link to="/staff/view-waiting-payments">Payments</Link></li>
        <li><Link to="/staff/view-waiting-top-ups">Top Ups</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;