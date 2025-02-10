import React, { useState } from "react";
import { FiSend, FiLoader } from "react-icons/fi";

// Type for the response from the API
interface ApiResponse {
  response: string;
}

const Home: React.FC = () => {
  // State to store the user input and API response
  const [userInput, setUserInput] = useState<string>("");
  const [apiResponse, setApiResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle the user input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  // Handle the submission of the user input
  const handleSubmit = async () => {
    if (!userInput.trim()) return;

    setLoading(true); // Set loading state
    try {
      // Send GET request to the API with the user's input as the query parameter
      const response = await fetch(
        `https://spring-ai-chatbot.onrender.com/ai/prompt?input=${encodeURIComponent(
          userInput
        )}`
      );
      const data: ApiResponse = await response.json();

      // Set the API response to be displayed
      setApiResponse(data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 bg_color min-h-screen">
      <div className="w-full max-w-3xl bg-transparent backdrop-blur-sm shadow-xl rounded-xl p-6">
        <div className="space-y-6">
          <h1 className="text-white text-center text-2xl">
            What can I help with?
          </h1>
          {/* Display user input and response */}
          <div className="space-y-4">
            <div className="flex justify-start items-center  p-4 rounded-lg shadow-md">
              <p className="text-blue-800 text-sm">{userInput}</p>
            </div>
            <div className="flex justify-end items-center  p-4 rounded-lg shadow-md">
              <p className="text-green-800 text-sm">{apiResponse}</p>
            </div>
          </div>
        </div>

        {/* Input and Button Container */}
        <div className="flex border-1 border-gray-500 rounded-xl items-center p-8 space-x-4 mt-4">
          {/* Input field for the user */}
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask something..."
            className="w-full p-4  rounded-xl placeholder:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
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
      </div>
    </div>
  );
};

export default Home;
