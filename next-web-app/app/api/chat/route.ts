// 1. Import necessary modules and classes for handling LLM (Language Learning Models) and response streaming
import { Ollama } from "@langchain/community/llms/ollama";
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { BytesOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';

// 2. Specify the runtime environment for the serverless function
export const runtime = 'edge';

// 3. Define the POST method to handle incoming requests
export async function POST(req: Request) {
  // 4. Extract relevant data from the incoming request's JSON body
  const { messages, ollamaURL, model } = await req.json();

  // 5. Initialize the Ollama LLM with the provided URL and model
  const llm = new Ollama({
    baseUrl: ollamaURL,
    model: model,
  });

  // 6. Function to format messages for inclusion in the chat history
  const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
  };

  // 7. Define the template for generating prompts sent to the LLM
  const TEMPLATE = `You are a chatbot named Ollama .
                    Current conversation:
                    {chat_history}      
                    User: {input}
                    AI:`;

  // 8. Format all previous messages except the last one to prepare the chat history
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  
  // 9. Extract the content of the current (latest) message
  const currentMessageContent = messages[messages.length - 1].content;

  // 10. Use the prompt template to structure the input for the LLM
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  // 11. Initialize an output parser for processing the LLM's byte stream output
  const outputParser = new BytesOutputParser();

  // 12. Create a processing chain that passes the prompt to the LLM and parses its output
  const chain = prompt.pipe(llm).pipe(outputParser);

  // 13. Stream the LLM's response based on the constructed chat history and current input
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  // 14. Return the streaming response to the client
  return new StreamingTextResponse(stream);
}
