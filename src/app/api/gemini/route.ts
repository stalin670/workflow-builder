import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { NextResponse } from "next/server";

const BodySchema = z.object({
    text: z.string().min(1),
});

// console.log("Gemini route file loaded");

export async function POST(req: Request) {

    try {
        const body = BodySchema.parse(await req.json());
        // const body = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;

        console.log(apiKey);
        if (!apiKey) {

            return NextResponse.json(
                { error: "GEMINI_API_KEY is missing" },
                { status: 500 }
            );
        }

        console.log(body);

        const prompt = body.text;

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

    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    console.log("Received GET request at /api/gemini");
    return new Response("GET OK");
}