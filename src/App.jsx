import React, { useEffect, useRef, useState } from 'react';
import Canvas from './Canvas';
import data from './data';
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {
  const [showCanvas, setShowCanvas] = useState(true); // Initially set to true to show canvas
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    return () => locomotiveScroll.destroy(); // Clean up on unmount
  }, []);

  useGSAP(() => {
    if (headingRef.current) {
      let clickCount = 0; // Initialize click count

      headingRef.current.addEventListener("click", (e) => {
        clickCount++; // Increment click count on each click
        setShowCanvas((prev) => !prev); // Toggle the state on click
        gsap.set(growingSpan.current, {
          top: e.clientY,
          left: e.clientX,
        });

        if (clickCount % 2 === 1) { // Run 'if' code on first click
          gsap.to("body", {
            color: "#000",
            duration: 1.2,
            ease: "power2.inOut"
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: 'all',
              });
              gsap.set("body", {
                backgroundColor: "#fd2c2a",
              });
            }
          });
        } else { // Run 'else' code on second click
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "black",
            duration: 1.2,
            ease: "power2.inOut"
          });
        }
      });
    }
  }, []);

  return (
    <>
      <span ref={growingSpan} className='growing rounded-full fixed top-[-20px] left-0 w-5 h-5 block'></span>
      <div className='relative w-full min-h-screen '>
        {showCanvas && data[0].map((canvasDets, index) => (
          <Canvas key={index} details={canvasDets} />
        ))}
        <div className="w-full z-10">
          <div className="flex justify-between items-center p-4">
            <div className="text-white font-bold">
              thirtysixstudios
            </div>
            <nav>
              <ul className="flex text-md space-x-4">
                {['Home', 'About', 'Services', 'Contact'].map((link, index) => (
                  <li key={index} className="">
                    <a href={`#${link.toLowerCase()}`} className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="textcontainer px-15 py-10 w-full">
            <div className="text w-1/3">
              <h3 className="text-2xl leading-snug">
                At Thirtysixstudio, we build digital assets and immersive experiences for purposeful brands.
              </h3>
              <p className="text-sm font-light w-4/5 mt-10">
                We're a boutique production studio focused on design, animation, and technology, constantly rethinking what digital craft can do for present-day ads and campaigns.
              </p>
              <p className="mt-10">Scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0 pl-5">
            <h1
              ref={headingRef}
              className="text-[13rem] font-normal tracking-tight leading-none">Thirtysixstudios</h1>
          </div>
        </div>
      </div>
      <div className='w-full relative h-screen  mt-32 px-10 flex'>
        {data[1].map((canvasDets, index) => (
          <Canvas key={index} details={canvasDets} />
        ))}
        <div className='w-[40%] relative z-[1]'>
          <h1 className='text-4xl tracking-tight'>
            We aim to elevate digital production in the advertising space, bringing your ideas to life.
          </h1>
          <p className='text-sm w-[75%] leading-[1.8] mt-10 font-normal'>
            As a contemporary studio, we use cutting-edge design practices and the latest technologies to deliver current digital work.
            Our commitment to innovation and simplicity, paired with our agile approach, ensures your journey with us is smooth and enjoyable from start to finish.
          </p>
          <img
            src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400" alt="" />
        </div>
      </div>
    </>
  );
}

export default App;