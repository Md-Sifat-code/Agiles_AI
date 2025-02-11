import React, { useState } from "react";
import { FiSend, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "/rb_20414.png";

const Home: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(""); // State for user input
  const [apiResponse, setApiResponse] = useState<string>(""); // State for API response
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [submittedInput, setSubmittedInput] = useState<string>(""); // State to store input after submission
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // State to track if form is submitted

  // Handle input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value); // Update input value
  };

  // Handle submit event
  const handleSubmit = async () => {
    if (!userInput.trim()) return; // Don't submit if input is empty

    setLoading(true); // Set loading to true while fetching
    setSubmittedInput(userInput); // Store user input for display after submission
    setIsSubmitted(true); // Set form as submitted
    setApiResponse(""); // Clear previous response when new request is submitted

    try {
      // Construct the URL with the new "question" parameter
      const url = `https://spring-ai-chatbot.onrender.com/ask?question=${encodeURIComponent(
        userInput
      )}`;

      const response = await fetch(url, {
        method: "GET", // Changed to GET method
        headers: {
          "Content-Type": "application/json", // Content-Type for GET requests (optional here)
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      // Get the text response directly
      const textResponse = await response.text();

      // Set the plain text response directly
      setApiResponse(textResponse);
    } catch (error) {
      console.error("Error fetching response:", error);
      setApiResponse("An error occurred while fetching the response.");
    } finally {
      setLoading(false); // Set loading to false once the request is finished
    }
  };

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-center items-center  bg_color min-h-screen">
      <div
        className={`w-full flex flex-col min-h-screen justify-${
          isSubmitted ? "between" : "center"
        } border-2  max-w-3xl bg-transparent `}
      >
        {/* main div */}
        <div className="space-y-6">
          {/* scroll div */}
          <div className={`flex flex-row justify-center items-center`}>
            <img className="w-[50px]" src={logo} alt="" />
            <h1 className="text-center text-white text-3xl font-bold">
              Hi I'm Agiles_AI
            </h1>
          </div>
          <h1 className="text-white mt-[-23px] text-center text-sm">
            How can I help you today?
          </h1>
          <div className="space-y-4">
            {/* Display submitted input after submit (only after user clicks submit) */}
            {isSubmitted && (
              <div className="flex justify-end items-center p-4">
                <p className="text-gray-200 bg-[#210633] shadow-sm shadow-purple-200 py-3 border px-6 rounded-lg text-lg">
                  {submittedInput}
                </p>
              </div>
            )}

            {/* Display "Thinking..." while waiting for API response */}
            {isSubmitted && loading && (
              <div className="flex justify-start items-center p-4">
                <p className="text-white text-lg">Thinking...</p>
              </div>
            )}

            {/* Display API response after submit (only after user clicks submit) */}
            {isSubmitted && !loading && apiResponse && (
              <div className="flex flex-col justify-start items-start p-4">
                <img className="w-[50px] ml-[-10px]" src={logo} alt="" />
                <p className="text-white flex py-3 justify-start items-start border border-purple-700 shadow-sm shadow-purple-200 px-2 rounded-lg text-lg">
                  {apiResponse}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex relative mt-36 rounded-xl items-center p-8 space-x-4">
            <input
              type="text"
              value={userInput} // Bind value to userInput state
              onChange={handleInputChange} // Update userInput as user types
              placeholder="Ask something..."
              className="w-full relative text-white p-8 rounded-4xl border-3 border-purple-700 placeholder:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
            />
            <button
              onClick={handleSubmit} // Submit handler
              disabled={loading} // Disable while loading
              className={`flex items-center absolute right-13 cursor-pointer justify-center  px-4 py-4 rounded-xl text-white font-semibold transition duration-300 ${
                loading
                  ? "bg-transparent cursor-not-allowed"
                  : "bg_color hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <FiLoader className="animate-spin text-purple-700" size={24} />
              ) : (
                <FiSend className="text-purple-700 " size={24} />
              )}
            </button>
          </div>

          <div className="flex px-9 max-w-3xl  mt-1 flex-row justify-between">
            <h1 className="text-white ma text-sm">
              Agiles_AI can make mistakes. Collect important info.
            </h1>
            <p
              className="text-purple-700 cursor-pointer px-2"
              onClick={openModal}
            >
              Developers Info
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Developers Info */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="max-w-[500px] bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-center text-2xl font-bold mb-4">
              Developer Info
            </h2>
            <p className="text-center ma text-2xl mb-4">
              <Link to={""} className="underline px-2">
                Sifat
              </Link>{" "}
              (Frontend) &{" "}
              <Link to={""} className="underline px-2">
                Sajid
              </Link>
              (Backend)
            </p>
            <div className="flex justify-center">
              <button
                className="bg-purple-700 text-white px-6 py-2 rounded-full"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
