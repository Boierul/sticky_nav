import React, {useState, useEffect} from 'react';

import './Navbar.css'
import logo from '../assets/redux-logo.png'

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleScroll = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) {
                setShowNavbar(true);
            } else {
                setShowNavbar(false);
            }

            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <nav className={`navbar ${showNavbar ? 'sticky' : ''}`}>

            <div className="navbar-right">
                <img src={logo} width={50} height={50} alt="logo"/>
            </div>

            <div className="navbar-left">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Home</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">About</a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">Contact us</a>
            </div>

        </nav>
    );
};

export default Navbar;