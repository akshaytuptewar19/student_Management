import React from "react";

const NomieeClaimRequestCard = ({ request }) => {
  return (
    <div className="bg-[#f4f4f4] p-4 rounded shadow-md">
      <p className="text-xl font-bold">Administration Address</p>
      <p className="text-slate-500 text-sm italic p-4">
        {request.nomineeAddress}
      </p>
      <p className="text-xl font-bold">Student Address</p>
      <p className="text-slate-500 text-sm italic p-4">{request.userAddress}</p>
      <p className="text-xl font-bold">Request Status</p>
      {request.processed === true ? (<>
      {request.isApproved ? (
        <div>
          <p className="text-green-500 text-xl italic font-semibold px-4 mb-4 mt-2">
            Approved
          </p>
          <p className="text-xl font-bold">Reason for Rejection/Acceptance Note</p>
          <p className="text-slate-500 text-xl font-semibold italic mb-4 px-4 mt-2">{request.note}</p>
        </div>
      ) : (
        <div>
          <p className="text-red-500 text-xl italic font-semibold px-4 mb-4 mt-2">
            Rejected
          </p>
          <p className="text-xl font-bold">Reason for Rejection/Acceptance Note</p>
          <p className="text-slate-500 text-xl font-semibold italic mb-4 px-4 mt-2">{request.note}</p>
        </div>
      )} </> ):(<p className="text-blue-500 text-xl italic font-semibold px-4 mb-4 mt-2">Request Pending...</p>) }
      <p className="text-xl font-bold">Document Submitted</p>
      <a href={request.IpfsClaimLink}></a>
      <a href="https://drive.google.com/file/d/1lL3kY27mr1ZBcnN7zEqz3-l-oMjvx2mN/view?usp=drive_link">
        <p className="text-blue-500 text-sm italic p-4 underline">
          View Fee Receipt
        </p>
      </a>
    </div>
  );
};

export default NomieeClaimRequestCard;
