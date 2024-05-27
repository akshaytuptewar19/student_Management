import React, { useState, useEffect, useContext } from "react";
import { getClaimRequests } from "../../../utils/contractMethods";
import Loader from "../../utils/Loader";
import NomieeClaimRequestCard from "./StudentClaimRequestCard";
import { CryptoContext } from "../../../context/CryptoContext";

const NomineeClaimRequests = () => {

  const { currentAccount } = useContext(CryptoContext);

  const [loading, setloading] = useState(true);
  const [requests, setrequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const reqs = await getClaimRequests();
      console.log(reqs);
      setrequests(reqs);
    };
    fetchRequests();
    setloading(false);
  }, []);

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-slate-100 bg-opacity-20">
      <Loader />
    </div>
  ) : (
    <div>
      <div className="bg-[#f4f4f4] pt-8 rounded shadow-md mb-4">
        <h1 className="text-2xl text-white bg-[#220F68] rounded-r-full py-3 pr-8 pl-4 w-fit">
          Requests Status
        </h1>
        <p className="text-slate-500 text-sm italic p-4">
          All the Requests for Id Card will appear here and reasons
          for rejection of Id Card 
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {requests.slice().reverse().map((request, i) =>
          request.nomineeAddress.toLowerCase() === currentAccount ? (
            <NomieeClaimRequestCard
              request={request}
              key={`nomineerequest${i}`}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default NomineeClaimRequests;
