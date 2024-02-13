// 1. Import required modules
import express from 'express';
import ngrok from '@ngrok/ngrok';
import dotenv from 'dotenv';

// 2. Initialize dotenv to load environment variables
dotenv.config();

// 3. Initialize the Express application
const app = express();
// 4. Define the port number for the Express server
const PORT = 3333;

// 5. Define the base URL for the deployment
const DEPLOYMENT_URL = "https://ollama.developersdigest.tech";

// 6. Use middleware to parse JSON request bodies
app.use(express.json());

// 7. Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // 8. Immediately-invoked asynchronous function to set up ngrok tunnel
    (async function () {
        try {
            // 9. Forward the specified local port through ngrok
            const listener = await ngrok.forward({
                addr: '11434', // Local port to forward
                authtoken: process.env.NGROK_AUTH_TOKEN // Authentication token for ngrok
            });

            // 10. Extract the ngrok URL's unique identifier
            const match = listener.url().match(/https:\/\/([a-z0-9-]+)\.ngrok-free\.app/);
            // 11. Construct a new URL using the deployment base URL and the ngrok URL identifier
            const newUrl = `${DEPLOYMENT_URL}?url=${match[1]}`;

            // 12. Log the established ngrok URL and the constructed new URL for easy access
            console.log(`Ingress established at: ${listener.url()}`);
            console.log(`Link: ${newUrl}`);
            console.log(`Localhost: http://localhost:3000?url=${match[1]}`);
        } catch (error) {
            // 13. Log an error message if ngrok fails to initialize
            console.error('Failed to initialize ngrok:', error);
        }
    })();
});