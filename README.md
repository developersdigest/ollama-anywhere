# Ollama Anywhere README

Ollama Anywhere is a proof of concept project designed to enable seamless interaction with Ollama's Language Learning Models (LLMs) from anywhere, using any device. This innovative platform allows users to leverage the power of models like Llama 2, Code Llama, and others, making them accessible for inference directly from your computer. The project is crafted with responsiveness in mind, ensuring a smooth user experience on any device, whether it's your phone, tablet, or laptop.

## Project Structure

The project is divided into two main components:

### 1. next-web-app

- A Next.js application that can be deployed to Vercel.
- Features a chat UI for real-time interaction with the LLMs you have set up.
- Responsive design to work seamlessly across devices.
- To get started, deploy the Next.js app to Vercel following standard procedures.

### 2. ngrok-server

- A local server that creates a secure tunnel to your machine, enabling access to your LLMs from anywhere.
- Requires a free ngrok account and an auth token.

## Getting Started

### Ollama Setup

1. Visit [Ollama's website](https://ollama.com/) to download the application for macOS & Linux (Windows coming soon).
2. After installation, select and download at least one model for inference from [Ollama's library](https://ollama.com/library/mistral).

### ngrok Setup

1. Sign up for a free ngrok account [here](https://ngrok.com/).
2. Obtain your ngrok auth token from [this page](https://dashboard.ngrok.com/get-started/your-authtoken).
3. Place the auth token in the `.env` file within the `ngrok-server` directory.

### Installation

Ensure to install dependencies for both the `ngrok-server` and the `next-web-app` directories by running `npm i` in each.

## Usage

Open up each project in separate terminal tabs.

- To run the ngrok-server, execute `node index.js`.
- To run the Next.js app, use `npm run dev`.

### Deployment

- For a staging instance, run the `vercel` command.
- For a production deployment, use `vercel --prod`.

Once everything is set up and the app is running locally or deployed to Vercel, running the ngrok server will allow you to access the deployed version/local host version from the terminal output. From there, enjoy interacting with your LLMs through Ollama Anywhere.
