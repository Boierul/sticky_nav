import React from 'react';
import './Hero.css'
import reverseHero from "../assets/reverse.jpg";

function Hero() {
    return (
        <div className="hero-section">

            <div className="hero-texts">
                <h1>Hero section</h1>
                <p>Proin eget tortor risus.
                    Vestibulum ac diam sit amet quam vehicula
                    elementum sed sit amet dui sama sit muy culor.</p>
            </div>

            <img
                className="img-1"
                src="https://wallpaperaccess.com/full/446984.jpg"
                alt="Hero"
            />
            <img
                className="img-2"
                src={reverseHero}
                alt="Hero"
            />
        </div>
    );
}

export default Hero;