// 1. Enable client-side data fetching, state, and lifecycle methods using React hooks
'use client';

// 2. Import necessary React functionalities and custom components
import React, { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowCircleRight, Link, Horse } from "@phosphor-icons/react";

// 3. Define the main Chat component
export default function Chat() {
  // 4. Utilize custom hook to manage chat functionalities
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  
  // 5. State hooks for managing dynamic URL, input visibility, and model selection
  const [ollamaURL, setOllamaURL] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedModel, setSelectedModel] = useState('mistral');
  
  // 6. Handlers for changing the Ollama URL and selected model
  const handleOllamaURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setOllamaURL(url);
    localStorage.setItem('ollamaURL', url);
  };
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };
  
  // 7. Function to toggle visibility of the input field
  const toggleInputVisibility = () => {
    setShowInput(!showInput);
  };
  
  // 8. Effect hook for setting the Ollama URL from URL parameters or local storage on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      const constructedURL = `https://${urlParam}.ngrok-free.app`;
      setOllamaURL(constructedURL);
      localStorage.setItem('ollamaURL', constructedURL);
    } else {
      const storedURL = localStorage.getItem('ollamaURL');
      if (storedURL) {
        setOllamaURL(storedURL);
      }
    }
  }, []);
  
  // 9. Enhanced submit handler to include additional data with the submission
  const enhancedHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ollamaURL, model: selectedModel };
    handleSubmit(e, { options: { body: payload } });
  };
  
  // 10. JSX for rendering the chat UI
  return (
    <div className="flex flex-col h-screen">
      {/* 11. Header section with logo and model selection */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">
          <img src="ollama-white.png" alt="Logo" className="w-[30px] h-auto" />
        </h1>
        <div className="flex space-x-4 items-center">
          {/* 12. Dropdown for model selection */}
          <select
            value={selectedModel}
            onChange={handleModelChange}
            className="h-12 text-base bg-gray-700 text-white px-4 border border-transparent rounded-lg focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <option value="mistral">Mistral</option>
            <option value="llama2">Lllama-2</option>
            <option value="mixtral">Mixtral</option>
          </select>
          {/* 13. Button to toggle input field visibility */}
          <Button
            onClick={toggleInputVisibility}
            className="h-12 w-12 text-base px-4 py-2 border border-transparent rounded-lg shadow-sm text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Link size={36} className="h-6 w-6" />
          </Button>
        </div>
      </header>
      
      {/* 14. Conditionally rendered input field for setting the Ollama URL */}
      {showInput && (
        <div className="bg-gray-100 p-4">
          <Input
            className="w-full"
            placeholder="Enter Ollama URL e.g., https://111-111-11-11-11.ngrok-free.app"
            value={ollamaURL}
            onChange={handleOllamaURLChange}
          />
        </div>
      )}
      
      {/* 15. Main chat area for displaying messages */}
      <main className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col space-y-4">
          {messages.map((m, index) => (
            <div key={index} className={`flex items-end ${m.role === 'user' ? 'justify-end' : ''}`}>
              <div className={`p-3 rounded-lg max-w-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                <p className="text-sm">{m.content}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      {/* 16. Footer with input field and submit button for sending messages */}
      <footer className="p-4 bg-gray-200 dark:bg-gray-800">
        <form onSubmit={enhancedHandleSubmit} className="flex items-center space-x-2">
          <Input
            className="h-12 text-base w-full max-w-full border border-gray-300 rounded-lg"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
          />
          <Button
            className="h-12 text-base px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-600"
            type="submit"
          >
            <ArrowCircleRight size={36} className="h-6 w-6" />
          </Button>
        </form>
      </footer>
    </div>
  );
  
}
