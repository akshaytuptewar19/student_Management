import React, { useState, useEffect, useContext } from "react";
import { showError, executeWillThroughOfficer } from "../../../utils/contractMethods";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import Loader from "../../utils/Loader";
import { getUserWill } from "../../../utils/contractMethods";
import { CryptoContext } from "../../../context/CryptoContext";
import sampleImage from "../../../assets/images/Aadhaar.png"; // Ensure the correct path to your image file

const OfficerClaimRequestCard = ({ request, setloading, index, setFlag, setisWillCreated }) => {
  const [note, setnote] = useState("");
  const [userWill, setuserWill] = useState([]);
  const { currentAccount } = useContext(CryptoContext);
  let count = index * 2;

  useEffect(() => {
    setloading(true);
    const fetchWill = async () => {
      const will = await getUserWill(currentAccount);
      setuserWill(will);
      if (will.amount && parseInt(will.amount) === 0) setisWillCreated(false);
    };

    fetchWill();
    setloading(false);

    return () => clearInterval();
  }, [currentAccount, setisWillCreated]);

  const handleRequest = async (approved) => {
    setloading(true);
    try {
      await executeWillThroughOfficer(request.userAddress, note, approved, index);
      toast.success("Request successfully Handled");
      setFlag(count);
      count++;
    } catch (error) {
      showError(error);
    }
    setloading(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add the image to the PDF
    doc.addImage(sampleImage, 'JPEG', 20, 20, 50, 50); // Adjust the position and size as needed

    // Add the text below the image
    doc.text("Name", 20, 80); // Adjust the y-coordinate to be below the image
    doc.text("Akshay", 20, 90);

    doc.text("Student Email:", 20, 110); // Adjust the y-coordinate to be below the name
    doc.text("tuptewarakshay19@gmail.com", 20, 120);

    doc.save("id_card.pdf");
};


  return (
    <div className="bg-[#f4f4f4] p-4 rounded shadow-md">
      <div
        type="button"
        className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800"
      >
        <p className="text-l font-bold">Request No: {index + 1}</p>
      </div>
      <p className="text-xl font-bold">Student Address</p>
      <p className="text-slate-500 text-sm italic p-4">{request.nomineeAddress}</p>
      <p className="text-xl font-bold">Teacher Address</p>
      <p className="text-slate-500 text-sm italic p-4">{request.userAddress}</p>
      <p className="text-xl font-bold">Fee Receipt</p>
      <a target="_blank" rel="noopener noreferrer" href="https://tinyurl.com/j2qipfsw3slinkFeeReceipt">
        <p className="text-blue-500 text-sm italic p-4 underline">View Full Document</p>
      </a>
      <p className="text-xl font-bold mb-4">Id Card Link</p>
      {request.note !== " " ? (
        <p className="font-semibold px-4 text-slate-500 italic text-xl">{request.note}</p>
      ) : (
        <textarea
          required
          value={note}
          onChange={(e) => setnote(e.target.value)}
          placeholder="Reason for Rejection/Acceptance Note"
          className="mb-4 w-full textarea-info text-sm p-1 placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        ></textarea>
      )}
      <p className="text-xl font-bold mb-5">Generate_Id</p>
      <button
        type="button"
        className="mr-2 cursor-pointer focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        onClick={generatePDF}
      >
        Generate Id_card
      </button>
      <p className="text-xl font-bold mb-4">Approve/Reject Request</p>
      {request.processed ? (
        request.isApproved ? (
          <p className="text-green-500 text-xl italic font-semibold px-4">Approved</p>
        ) : (
          <p className="text-red-500 text-xl italic font-semibold px-4">Rejected</p>
        )
      ) : (
        <div className="flex">
          <button
            type="button"
            className="mr-2 cursor-pointer focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            onClick={() => handleRequest(true)}
          >
            Approve
          </button>
          <button
            type="button"
            className="cursor-pointer focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleRequest(false)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default OfficerClaimRequestCard;
