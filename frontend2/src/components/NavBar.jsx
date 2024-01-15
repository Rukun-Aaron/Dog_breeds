import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faMagnifyingGlass, faUserAlt, faRightToBracket, faBars
} from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    const [isHomePage, setIsHomePage] = useState(false);
    const [user] = useState(true);

    // const navigate = useNavigate();

    return (
        <div className={`navbar z-10 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl xl:max-w-5xl top-4 shadow dark:shadow-xl dark:bg-neutral-800 backdrop-blur-sm rounded-xl  ${isHomePage ? 'absolute' : 'fixed '}`}>
            <div className="flex-1 flex gap-2">
                <div className="cursor-pointer" >
                    {/* <img src="/logos/logoV2.svg" alt="logo" /> */}
                </div>
                <div className="cursor-pointer">
                    <h1 className="font-varela text-2xl font-bold dark:text-neutral-100">
                        Doge
                        <span className="bg-clip-text from-primary to-secondary bg-gradient-to-r text-transparent">Critters</span>
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
                    className={`dark:text-neutral-100 font-varela btn hover:bg-transparent btn-ghost transition-all border-none relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-br before:from-primary before:to-secondary hover:before:w-full before:-z-10 before:transition-all before:duration-300 duration-300 before:rounded-lg hover:text-white`}
                    type="button"
                >
                    Home
                    <FontAwesomeIcon icon={faHome} className="-mt-[0.2rem]" />

                </button>
                <button
                    className="dark:text-neutral-100 font-varela btn hover:bg-transparent btn-ghost transition-all border-none relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-br before:from-primary before:to-secondary hover:before:w-full before:-z-10 before:transition-all before:duration-300 duration-300 before:rounded-lg hover:text-white"
                    type="button"
                    
                >
                    Detect
                    <FontAwesomeIcon icon={faMagnifyingGlass} />

                </button>
                {user ? (
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className="btn btn-ghost dark:hover:bg-neutral-700">
                  {user.photoURL ? (
                    <img className="w-10 rounded-full" src={user.photoURL} alt="User avatar" />
                  ) : (
                    <div className="bg-neutral-focus text-neutral-content w-10 aspect-square rounded-full flex justify-center items-center">
                      <span>{user.email ? user.email.charAt(0).toUpperCase() : 'A'}</span>
                    </div>
                  )}
                </label>
                <div className="dropdown-content text-primary z-10 menu">
                  <div className="pt-4">
                    <ul className="dark:bg-neutral-800 rounded-lg shadow p-2 bg-white">
                      <li>
                        <div
                          className="dark:text-neutral-100 dark:hover:text-white text-black font-varela whitespace-nowrap dark:hover:bg-neutral-700"
                        >
                          User History
                        </div>
                      </li>
                      <li>
                        <div  className="dark:text-neutral-100 dark:hover:text-white text-black font-varela whitespace-nowrap dark:hover:bg-neutral-700">
                          Log Out
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  className="dark:text-neutral-100 font-varela btn hover:bg-transparent btn-ghost transition-all border-none relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-full before:bg-gradient-to-br before:from-primary before:to-secondary hover:before:w-full before:-z-10 before:transition-all before:duration-300 duration-300 before:rounded-lg hover:text-white"
                  type="button"
                >
                  Login
                  <FontAwesomeIcon icon={faRightToBracket} />

                </button>
                <button
                  type="submit"
                  className="font-varela relative border-none btn text-white bg-gradient-to-tl from-primary to-secondary"
                  
                >
                  <div className="font-varela opacity-0 hover:opacity-100 transition duration-500 absolute inset-0 h-full rounded-lg flex justify-center items-center bg-gradient-to-br from-primary to-secondary">
                    Sign Up
                    <FontAwesomeIcon icon={faUserAlt} className="pl-2" />
                  </div>
                  Sign Up
                  <FontAwesomeIcon icon={faUserAlt} />
                </button>
              </div>
            )}

            </div>

        </div>);
}

export default Navbar;