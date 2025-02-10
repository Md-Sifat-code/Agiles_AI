import React, { useState } from "react";
import { FiSend, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

// Define the type for the API response
interface ApiResponse {
  generated_text: string;
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
      // Construct the URL with the message as a query parameter
      const url = `https://spring-ai-chatbot.onrender.com/huggingface/ask?message=${encodeURIComponent(
        userInput
      )}`;

      const response = await fetch(url, {
        method: "POST", // POST method
        headers: {
          "Content-Type": "application/json", // Content-Type for POST requests
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to fetch. Status: ${response.status}`);
      }

      // Parse the JSON response
      const data: ApiResponse[] = await response.json(); // Expecting an array with an object containing "generated_text"
      setApiResponse(data[0].generated_text); // Set the "generated_text" from the response
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
    <div className="flex flex-col justify-center items-center py-10 bg_color min-h-screen">
      <div className="w-full max-w-3xl bg-transparent backdrop-blur-sm shadow-xl rounded-xl p-6">
        <div className="space-y-6">
          <h1 className="text-white text-center text-2xl">
            What can I help with?
          </h1>
          <div className="space-y-4">
            {/* Display submitted input after submit */}

            {/* Display API response */}
            <div className="flex justify-end items-center p-4 rounded-lg shadow-md">
              <p className="text-gray-200 bg-[#210633] py-3 border px-6 rounded-lg text-sm">
                {submittedInput}
              </p>
            </div>
            <div className="flex justify-start items-center p-4 rounded-lg shadow-md">
              <p className="text-black bg-purple-100 py-3 border px-6 rounded-lg text-sm">
                {apiResponse}
              </p>
              {/* Show API response here */}
            </div>
          </div>
        </div>

        <div className="flex rounded-xl items-center p-8 space-x-4 mt-4">
          <input
            type="text"
            value={userInput} // Bind value to userInput state
            onChange={handleInputChange} // Update userInput as user types
            placeholder="Ask something..."
            className="w-full text-white p-4 rounded-xl border-1 border-purple-700 placeholder:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
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
          <h1 className="text-white ma text-sm">
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
