import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faMagnifyingGlass, faUserAlt, faRightToBracket, faBars,
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isHomePage, setIsHomePage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  return (
    <div className={`navbar z-10 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl xl:max-w-5xl top-4 shadow dark:shadow-xl dark:bg-neutral-800 backdrop-blur-sm rounded-xl  ${isHomePage ? 'absolute' : 'fixed '}`}>
      <div className="flex-1 flex gap-2">
        <div className="cursor-pointer flex items-center justify-center" onClick={() => navigate('/')}>
          <div className="pl-4 pr-3">
            <img
              alt="logo"
              src="/logo2.ico"
              className="h-12 w-12"
            />
          </div>
          <p className="text-xl text-white font-semibold">
            DogIO
          </p>
        </div>
      </div>
      <div className="gap-8 text-white pr-4">
        <button onClick={() => navigate('/')}>
          Home
        </button>
        <button className="bg-orange-500 px-8 py-2 rounded-full" onClick={() => navigate('/detection')}>
          Detect
        </button>
      </div>
    </div>
  );
}

export default Navbar;
