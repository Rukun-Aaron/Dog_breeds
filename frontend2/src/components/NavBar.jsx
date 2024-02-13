import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faDiagramProject } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 600);
    };

    handleResize(); // Call once to set initial state
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className={`navbar z-[1] left-1/2 -translate-x-1/2 w-11/12 max-w-4xl xl:max-w-5xl shadow dark:shadow-xl dark:bg-neutral-800 rounded-full ${isHomePage ? 'relative bg-transparent' : 'fixed bg-white'}`}>
      <div className="flex-1 flex gap-2">
        <div className="cursor-pointer flex items-center justify-center" onClick={() => handleNavigation('/')}>
          <div className="pl-4 pr-3">
            <img
              alt="logo"
              src= {process.env.PUBLIC_URL + "/logo3.ico"}
              className="h-12 w-12"
            />
          </div>
          {!isSmallScreen && <p className="text-xl font-varela font-semibold text-black">DogIO</p>}
        </div>
      </div>
      <div className="gap-3 pr-2">
        <button onClick={() => handleNavigation('/')} className="btn btn-ghost rounded-full px-8 py-2 font-varela text-black">
          {isSmallScreen ? <FontAwesomeIcon icon={faHouse} size="2x"/> : 'Home'}
        </button>
        <button className="bg-[#694DDB] px-8 rounded-full btn btn-ghost text-[#F5F1FF] font-varela" onClick={() => handleNavigation('/detection')}>
          {isSmallScreen ? <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" /> : 'Detect'}
        </button>
        <button className="bg-[#DE6FEC] px-8 rounded-full btn btn-ghost text-[#F5F1FF] font-varela" onClick={() => handleNavigation('/compare')}>
          {isSmallScreen ? <FontAwesomeIcon icon={faDiagramProject} size="2x" /> : 'Compare'}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
