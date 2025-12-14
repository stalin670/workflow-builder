import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

console.log("Gemini route file loaded");

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log(apiKey);
    if (!apiKey) {

        return NextResponse.json(
            { error: "GEMINI_API_KEY is missing" },
            { status: 500 }
        );
    }
    const { prompt } = await req.json();

    if (!prompt) {
        return NextResponse.json(
            { error: "Prompt is required" },
            { status: 400 }
        );
    }

    const genAI = new GoogleGenerativeAI(apiKey);


    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);

    return NextResponse.json({
        output: result.response.text(),
    });
}

export async function GET() {
    console.log("Received GET request at /api/gemini");
    return new Response("GET OK");
}