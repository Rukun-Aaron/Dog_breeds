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
    <div className={`navbar  z-10 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl xl:max-w-5xl top-4 shadow dark:shadow-xl dark:bg-neutral-800 backdrop-blur-sm rounded-xl  ${isHomePage ? 'absolute' : 'fixed'}`}>
      <div className="flex-1 flex gap-2">
        <div className="cursor-pointer" >
          {/* <img src="/logos/logoV2.svg" alt="logo" /> */}
        </div>
        <div className="cursor-pointer">
          <h1 className="font-varela text-2xl font-bold dark:text-neutral-100">
            DogIO
            {/* <span className="bg-clip-text from-primary to-secondary bg-gradient-to-r text-transparent">Critters</span> */}
          </h1>
        </div>
      </div>
      <div className="flex md:hidden">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="drawer" aria-label="open sidebar" className="btn btn-square btn-ghost dark:text-neutral-100">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </label>
      </div>
      <div className="md:flex gap-2 hidden">
        <button
          onClick={() => navigate('/')}
          className={`dark:text-neutral-100 font-varela btn hover:bg-transparent btn-ghost transition-all border-none relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-br before:from-primary before:to-secondary hover:before:w-full before:-z-10 before:transition-all before:duration-300 duration-300 before:rounded-lg hover:text-white`}
          type="button"
        >
          Home
          <FontAwesomeIcon icon={faHome} className="-mt-[0.2rem]" />
        </button>
        <button
          onClick={() => navigate('/detection')}
          className={`dark:text-neutral-100 font-varela btn hover:bg-transparent btn-ghost transition-all border-none relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-br before:from-primary before:to-secondary hover:before:w-full before:-z-10 before:transition-all before:duration-300 duration-300 before:rounded-lg hover:text-white`}
          type="button">
              Detect
              <FontAwesomeIcon icon={faMagnifyingGlass} className="-mt-[0.2rem]" />
          </button>
      </div>
    </div>)};


//   return (
//     <div className={`navbar z-10 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl xl:max-w-5xl top-4 shadow dark:shadow-xl dark:bg-neutral-800 backdrop-blur-sm rounded-xl  ${isHomePage ? 'absolute' : 'fixed '}`}>
//       <div className="flex-1 flex gap-2">
//         <div className="cursor-pointer" onClick={() => navigate('/')}>
//           <p className="font-varela text-2xl font-bold dark:text-neutral-100">
//             Logo, Name
//           </p>
//         </div>
//       </div>
//       <div className="md:flex gap-2 hidden">
//         <button onClick={() => navigate('/')}>
//           Home
//         </button>
//         <button onClick={() => navigate('/detection')}>
//           Detect
//         </button>
//       </div>
//     </div>
//   );
// }

export default Navbar;
