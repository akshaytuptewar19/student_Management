import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";

import Support from "./Support";
import Crypto from "./Crypto/Crypto";

import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const [activeTab, setactiveTab] = useState("crypto");

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  return (
    <div className="h-screen flex" style={{ fontFamily: "Lato, sans-serif" }}>
      <div
        id="left"
        className="w-1/5 h-full relative"
        style={{ background: "rgb(34, 15, 104)" }}
      >
        <div
          id="logo"
          className="flex justify-center items-center text-white mb-16 py-4 px-8"
        >
          <Link to={"/"} className="flex justify-center items-center">
            <img src={logo} alt="logo" height={30} width={30} />
            <span className="text-3xl font-bold">AcademixHub</span>
          </Link>
        </div>

        <div className="pl-4">
          <div
            id="crypto"
            className={`${
              activeTab === "crypto" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("crypto")}
          >
            <p
              className={`text-white text-2xl ${
                activeTab === "crypto" ? "pl-4" : ""
              }`}
            >
              Dashboard
            </p>
          </div>
          <div
            id="land"
            className={`${
              activeTab === "land" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("land")}
          >
          
          </div>
          <div
            id="flats"
            className={`${
              activeTab === "flats" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("flats")}
          >
            
        
          </div>
          <div
            id="commercial"
            className={`${
              activeTab === "commercial" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("commercial")}
          >
       
          </div>
          <div
            id="industrial"
            className={`${
              activeTab === "industrial" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("industrial")}
          >
         
          </div>
          <div
            id="car"
            className={`${
              activeTab === "car" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("car")}
          >
      
          </div>

          <div
            id="support"
            className={`${
              activeTab === "support" ? "bg-[#04004D] font-bold" : ""
            } py-4 px-8 rounded-l-full cursor-pointer transition-all`}
            onClick={() => setactiveTab("support")}
          >
            <p
              className={`text-white text-2xl ${
                activeTab === "support" ? "pl-4" : ""
              }`}
            >
              Support
            </p>
          </div>
        </div>
        <p className="absolute bottom-0 text-white p-8"></p>
      </div>

      <div id="right" className="w-4/5 p-8 h-screen overflow-auto">
        {(() => {
          switch (activeTab) {
            case "crypto":
              return <Crypto />;
            
            case "support":
              return <Support />;
           
          
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default UserDashBoard;
