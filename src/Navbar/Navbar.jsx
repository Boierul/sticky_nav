import React, {useState, useEffect, useCallback, useRef} from 'react';

import './Navbar.css'
import hamburgerMenu from '../assets/menu.png'
import logo from '../assets/redux-logo.png'
import svg from "../assets/exit.svg";

import gsap from "gsap";
import {Power2} from "gsap/gsap-core";

import Typewriter from 'typewriter-effect';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
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

    /* -------------------------------------------------------------------- */
    /*                 Here the menu animation happens                      */
    /* -------------------------------------------------------------------- */

    const menuBtnRef = useRef(null);
    const exitBtnRef = useRef(null);
    const t1Ref = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        t1Ref.current = gsap.timeline({paused: true});
        t1Ref.current.to(".menu", {
            opacity: 1,
            duration: 1,
            top: 0,
            ease: Power2.easeInOut
        });
        t1Ref.current.to(
            ".nav",
            {
                opacity: 1,
                marginBottom: 0,
                duration: 1,
                ease: Power2.easeInOut,
                stagger: 0.3,
            },
            ">-0.5"
        );
    }, []);

    const handleMenuBtnClick = useCallback(() => {
        setIsMenuOpen(true);
        t1Ref.current.play().timeScale(1);
    }, []);

    const handleExitBtnClick = useCallback(() => {
        setIsMenuOpen(false);
        t1Ref.current.timeScale(2.5);
        t1Ref.current.reverse();
    }, []);


    return (
        <nav className={`navbar ${showNavbar ? 'sticky' : ''}`}>

            <div className="navbar-main">
                <div className="navbar-right">
                    <img
                        className="logo"
                        src={logo}
                        width={50}
                        height={50}
                        alt="logo"
                    />
                </div>

                <div className="navbar-left">
                    <img src={hamburgerMenu}
                         className="menu-div"
                         alt="hamburger-menu-logo"
                         width={25}
                         height={25}
                         ref={menuBtnRef}
                         onClick={handleMenuBtnClick}
                    />
                </div>
            </div>

            <div className="menu">
                <div className="background">Menu</div>
                <div className="exit" ref={exitBtnRef} onClick={handleExitBtnClick}><img src={svg} alt="" srcSet=""/>
                </div>

                <div className="menu-container">
                    <ul className="options">
                        <li className="nav">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" className="nav-link">
                                About <span className="small-number">01</span>
                            </a>
                        </li>
                        <li className="nav">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" className="nav-link">
                                Contact <span className="small-number">02</span>
                            </a>
                        </li>
                        <li className="nav">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" className="nav-link">
                                Portfolio <span className="small-number">03</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="menu-container right">
                    <div className="information">
                        <p className="title">Who am I?</p>
                        <Typewriter
                            options={{
                                strings: ['Software Engineer', 'Web Developer', 'UI/UX Designer'],
                                autoStart: true,
                                loop: true,
                                skipAddStyles: true,
                                wrapperClassName: 'typewriter'
                            }}
                        />
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;