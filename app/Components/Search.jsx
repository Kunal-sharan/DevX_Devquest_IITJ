import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Search = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    const chars = text.innerText.split("");
    text.innerHTML = "";

    chars.forEach((char, index) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      charSpan.style.opacity = 0;
      text.appendChild(charSpan);

      gsap.to(charSpan, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.1, // Adjust the delay for the typing effect
      });
    });
  }, []);

  return (
    <div
      className="m-4 h-[360px] rounded-lg text-center flex flex-col gap-5 items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/compare_bg.jpg")' }}
    >
      <h1
        className="text-5xl w-3/4 font-jakarta-sans font-bold text-white typing-text"
        ref={textRef}
      >
        Compare product prices over multiple <br /> e-commerce websites.
      </h1>
    </div>
  );
};

export default Search;
