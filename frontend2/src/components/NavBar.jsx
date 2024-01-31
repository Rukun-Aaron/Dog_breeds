import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({ isHomepage }) {
  const [isHomePage, setIsHomePage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
  }, [location]);

  return (
    <div className={`navbar z-[1] left-1/2 -translate-x-1/2 w-11/12 max-w-4xl xl:max-w-5xl shadow dark:shadow-xl dark:bg-neutral-800 rounded-full ${isHomePage ? 'relative bg-transparent' : 'fixed bg-white'}`}>
        <div className="flex-1 flex gap-2">
        <div className="cursor-pointer flex items-center justify-center" onClick={() => navigate('/')}>
          <div className="pl-4 pr-3">
            <img
              alt="logo"
              src= {process.env.PUBLIC_URL + "/logo3.ico"}
              className="h-12 w-12"
            />
          </div>
          <p className="text-xl  font-varela  font-semibold text-black">
            DogIO
          </p>
        </div>
      </div>
      <div className="gap-3 pr-2">
        <button onClick={() => navigate('/')} className="btn btn-ghost rounded-full px-8 py-2  font-varela text-black">
          Home
        </button>
        {/* CHANGE LATER TO :6B5BBF */}
        <button className="bg-[#694DDB] px-8 rounded-full btn btn-ghost text-[#F5F1FF]  font-varela" onClick={() => navigate('/detection')}>
          Detect
        </button>
        <button className="bg-[#DE6FEC] px-8 rounded-full btn btn-ghost text-[#F5F1FF]  font-varela" onClick={() => navigate('/compare')}>
          Compare
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
