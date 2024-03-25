import React from 'react';
import './Header.scss'; // Importando o SCSS

const Header = () => {
    const logo= 'logo-sensorville.png'
  return (
    <header className="header">
      <img src={logo} alt="Logo Sensorville" />
    </header>
  );
};

export default Header;