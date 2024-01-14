import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome, faMagnifyingGlass, faUserAlt, faRightToBracket, faBars
} from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    const [isHomePage, setIsHomePage] = useState(false);

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

        </div>);
}

export default Navbar;