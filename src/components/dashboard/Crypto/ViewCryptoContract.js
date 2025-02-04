import React, { useContext, useEffect, useState } from "react";
import Loader from "../../utils/Loader";
import { getUserWill } from "../../../utils/contractMethods";
import { CryptoContext } from "../../../context/CryptoContext";
import { ethers } from "ethers"; 

const ViewCryptoContract = ({ setisWillCreated }) => {
  const { currentAccount } = useContext(CryptoContext);

  const [loading, setloading] = useState(false);
  const [userWill, setuserWill] = useState([]);
  const [remainingSeconds, setremainingSeconds] = useState(0);

  useEffect(() => {
    setloading(true);
    const fetchWill = async () => {
      const will = await getUserWill(currentAccount);
      setuserWill(will);
      // console.log(will);
      if (will.amount && parseInt(will.amount) === 0) setisWillCreated(false);
      if (will.deadLine) {
        setremainingSeconds(will.deadLine - Math.floor(Date.now()) / 1000);
      }
    };

    const interval = setInterval(() => {
      setremainingSeconds((prevSec) => prevSec - 1);
    }, 1000);

    fetchWill();
    setloading(false);

    return () => clearInterval(interval);
  }, [currentAccount, setisWillCreated]);

  const calculateTimeRemaining = () => {
    const yearInSeconds = 31536000;
    const monthInSeconds = 2592000;
    const dayInSeconds = 86400;
    const hourInSeconds = 3600;
    const minuteInSeconds = 60;

    let timer = "";

    const years = Math.floor(remainingSeconds / yearInSeconds);

    if (years > 0) timer += `${years} years, `;

    const months = Math.floor(
      (remainingSeconds % yearInSeconds) / monthInSeconds
    );

    if (months > 0) timer += `${months} months, `;

    const days = Math.floor(
      ((remainingSeconds % yearInSeconds) % monthInSeconds) / dayInSeconds
    );
    if (days > 0) timer += `${days} days, `;

    const hours = Math.floor(
      (((remainingSeconds % yearInSeconds) % monthInSeconds) % dayInSeconds) /
        hourInSeconds
    );
    if (hours > 0) timer += `${hours} hours, `;

    const minutes = Math.floor(
      ((((remainingSeconds % yearInSeconds) % monthInSeconds) % dayInSeconds) %
        hourInSeconds) /
        minuteInSeconds
    );
    if (minutes > 0) timer += `${minutes} minutes, `;

    const seconds =
      Math.floor(
        (((remainingSeconds % yearInSeconds) % monthInSeconds) % dayInSeconds) %
          hourInSeconds
      ) % minuteInSeconds;
    if (seconds > 0) timer += `${seconds} seconds`;

    return timer;
  };

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-slate-100 bg-opacity-20">
      <Loader />
    </div>
  ) : (
    <div className="relative w-full my-4">
      <div className="rounded shadow-md p-8 bg-[#f4f4f4] w-full">
        <h1 className="text-5xl font-bold text-violet-900 mb-12">
          {userWill.willName}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <h1 className="text-2xl mb-2 font-semibold">Administration Address</h1>
            <p className="text-slate-500 italic">{userWill.userAddress}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-2xl mb-2 font-semibold"></h1>
            <p className="text-slate-500 italic">
              {/* {userWill.amount && ethers.utils.formatEther(userWill.amount)} Eth */}
            </p>
          </div>
          <div className="mb-4">
            <h1 className="text-2xl mb-2 font-semibold">Aadhaar Card</h1>
            {/* <a href={request.IpfsClaimLink}></a> */}
            <a href="https://drive.google.com/file/d/1-PfTM-qaXeEuCT8YJ6uWS7YMtGf2PkM_/view?usp=sharing" target={"_blank"} rel="noreferrer">
              <p className="text-blue-500 italic underline">View Aadhaar Card</p>
            </a>
          </div>
          <div className="mb-4">
            <h1 className="text-2xl mb-2 font-semibold">
            
            </h1>
            <p className="text-slate-500 italic">
              {remainingSeconds <= 0
                ? ""
                : userWill.deadLine &&
                  calculateTimeRemaining(userWill.deadLine)}
            </p>
          </div>
        </div>
          <div className="mb-4 mt-2">
            <h1 className="text-2xl font-semibold">Student Details</h1>
            <ul className="list-disc text-slate-500 italic p-4 grid grid-cols-2 gap-4">
              {userWill.nomineeAddress?.map((nominee, i) => (
                <li key={`nomineeAddress${i}`}>
                  {nominee}
                  <a
                    href="https://drive.google.com/file/d/1lL3kY27mr1ZBcnN7zEqz3-l-oMjvx2mN/view?usp=drive_link"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <p className="text-blue-500 italic underline">
                      View Photo
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default ViewCryptoContract;
