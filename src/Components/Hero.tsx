import React, { useEffect, useRef } from "react";
import logo from "/rb_20414.png";
import { Typed } from "react-typed"; // Import `Typed` normally
import { Link } from "react-router-dom";
import { BsRobot } from "react-icons/bs";

const Hero: React.FC = () => {
  const typedRef = useRef<any>(null); // Reference for Typed instance

  useEffect(() => {
    // Initialize the Typed instance with options
    const typed = new Typed(typedRef.current, {
      strings: [
        "Ask Your Query......",
        "Get your Desire Ans....",
        "Gain Knowledge....",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: false, // Don't show the cursor
    });

    return () => {
      typed.destroy(); // Clean up Typed instance on unmount
    };
  }, []);

  return (
    <section>
      <div className="min-h-screen bg_color flex justify-center items-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
          {/* Logo */}
          <img
            className="w-[250px] md:w-[300px] lg:w-[250px] rotate"
            src={logo}
            alt="Logo"
          />

          {/* Title */}
          <div className="text-2xl flex flex-col items-center justify-center lg:text-4xl text-white ma font-bold">
            <h1 className="text-center">
              A
              <span className="fo text-purple-800 text-3xl lg:text-5xl">g</span>
              iles_
              <span className="fo text-purple-800 text-xl lg:text-3xl">AI</span>
            </h1>

            {/* Typed text and Robot Icon */}
            <p className="mt-6 text-white flex gap-3 justify-center items-center text-xl md:text-2xl">
              {/* Robot icon stays fixed and separate */}
              <BsRobot className="inline-block text-purple-700 mr-2" />
              {/* The Typed text will appear here */}
              <span className="text-gray-400" ref={typedRef}></span>
            </p>

            {/* Get Started Button */}
            <Link
              className="mt-4 px-8 py-2 bg-purple-700 text-white rounded-[42px] text-sm md:text-base lg:text-lg"
              to={"/home"}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
