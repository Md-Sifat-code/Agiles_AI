import React, { useState } from "react";
import { FiSend, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ApiResponse {
  response: string;
}

const Home: React.FC = () => {
  const [userInput, setUserInput] = useState<string>(""); // State for user input
  const [apiResponse, setApiResponse] = useState<string>(""); // State for API response
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state
  const [submittedInput, setSubmittedInput] = useState<string>(""); // State to store input after submission

  // Handle input change event
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value); // Update input value
  };

  // Handle submit event
  const handleSubmit = async () => {
    if (!userInput.trim()) return; // Don't submit if input is empty

    setLoading(true); // Set loading to true while fetching
    setSubmittedInput(userInput); // Store user input for display after submission
    try {
      const response = await fetch(
        `${import.meta.env.VITE_Base_URL}/ai/prompt?input=${encodeURIComponent(
          userInput
        )}`
      );
      const data: ApiResponse = await response.json();
      setApiResponse(data.response); // Set the API response
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col justify-center items-center py-10 bg_color min-h-screen">
      <div className="w-full max-w-3xl bg-transparent backdrop-blur-sm shadow-xl rounded-xl p-6">
        <div className="space-y-6">
          <h1 className="text-white text-center text-2xl">
            What can I help with?
          </h1>
          <div className="space-y-4">
            {/* Display submitted input after submit */}
            <div className="flex justify-start items-center p-4 rounded-lg shadow-md">
              <p className="text-blue-800 text-sm">{submittedInput}</p>{" "}
              {/* Show after submission */}
            </div>
            {/* Display API response */}
            <div className="flex justify-end items-center p-4 rounded-lg shadow-md">
              <p className="text-green-800 text-sm">{apiResponse}</p>
            </div>
          </div>
        </div>

        <div className="flex border-1 border-gray-500 rounded-xl items-center p-8 space-x-4 mt-4">
          <input
            type="text"
            value={userInput} // Bind value to userInput state
            onChange={handleInputChange} // Update userInput as user types
            placeholder="Ask something..."
            className="w-full text-white p-4 rounded-xl placeholder:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <button
            onClick={handleSubmit} // Submit handler
            disabled={loading} // Disable while loading
            className={`flex items-center cursor-pointer justify-center px-4 py-4 rounded-xl text-white font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg_color hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <FiLoader className="animate-spin text-purple-700" size={24} />
            ) : (
              <FiSend className="text-purple-700" size={24} />
            )}
          </button>
        </div>

        <div className="flex mt-1 flex-row justify-between">
          <h1 className="text-white ma text-lg">
            Agiles_AI can make mistakes. Collect important info.
          </h1>
          <p className="text-purple-700 cursor-pointer" onClick={openModal}>
            Developers Info
          </p>
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
              <Link to={""} className=" underline px-2">
                Sifat
              </Link>{" "}
              (Frontend) &{" "}
              <Link to={""} className=" underline px-2">
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
