import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
console.log("Google GenAI initialized");

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0
});
console.log("ChatGoogleGenerativeAI model initialized", model.model);

const messages = [
    new SystemMessage("Translate the following from English into Italian"),
    new HumanMessage("hi!"),
];

// await model.invoke(messages);
// console.log("Model invoked with messages", await model.invoke(messages));



const systemTemplate = "Translate the following from English into {language}";

const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
]);

const promptValue = await promptTemplate.invoke({
    language: "Italian",
    text: "Sanjay Leela bansali is a great director",
});

// console.log("Prompt value generated:", promptValue)
// promptValue
const stream = await model.invoke(promptValue);
console.log("Model invoked with prompt value: ",stream.content);

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "buttocks in hindi",
//   });
//   console.log(response.text);
// }

// main();