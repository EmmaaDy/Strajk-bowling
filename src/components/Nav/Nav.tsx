import React, { useState } from 'react';
import './Nav.css';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const navigateToPage = (page: string) => {
    navigate(`/${page}`);
    setIsNavOpen(false);
    setIsOverlayVisible(false);
  };

  return (
    <div>
      <img
        src={isNavOpen ? '/assets/Nav2.png' : '/assets/Nav1.png'}
        alt="Navigation Icon"
        className="nav-icon"
        onClick={handleNavClick}
      />

      {isOverlayVisible && (
        <div className="overlay">
          <div className="nav-menu">
            <ul>
              <li onClick={() => navigateToPage('booking')}>Booking</li>
              <li onClick={() => navigateToPage('confirmation')}>Confirmation</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;