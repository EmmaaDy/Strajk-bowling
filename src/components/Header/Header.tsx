import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="header">
      {/* Använd motion.img för att animera bilden */}
      <motion.img
        src="/assets/Bowling.png"
        alt="Bowling"
        className="header-image"
        initial={{ scale: 1 }}  
        animate={{
          rotate: [0, 2, -2, 0],  
          y: [0, -4, 0],  
        }}
        transition={{
          duration: 2,  
          ease: 'easeInOut',
          repeat: Infinity,  
        }}
      />
      <h1 className="header-title">{title}</h1>
    </header>
  );
};

export default Header;
