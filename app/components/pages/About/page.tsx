"use client";
import React, { useState } from "react";

const AboutUs = () => {
  const [selected, setSelected] = useState("Home");
  return (
    <section>
      <div className="grid grid-cols-[200px_1fr] mt-30">
        <div className="border border-red-300 h-screen py-10">
          <div className="">
            <div className="flex flex-col space-y-12 items-center justify-center">
              <button
                className={`
             ${selected === "Home" ? "bg-[#D3D3FF] h-10 w-35 " : "h-10 w-35 bg-black text-white border"}
             `}
                onClick={() => setSelected("Home")}
              >
                Home
              </button>
              <button
                className={`${selected === "Dashboard" ? "bg-[#D3D3FF] h-10 w-35 border" : "h-10 w-35 bg-black text-white cursor-pointer"}`}
                onClick={() => setSelected("Dashboard")}
              >
                Dashboard
              </button>
              <button>Home</button>
              <button>Home</button>
            </div>
          </div>
        </div>
          <div className="border border-red-700 h-screen">
        <div>{selected === "Home" && <div><h1>good boy</h1></div>}</div>
        <div>{selected === "Dashboard" && <div><h1>great boy</h1></div>}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
