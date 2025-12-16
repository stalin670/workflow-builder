import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    try {
        const { parts } = await req.json();

        if (!parts || !Array.isArray(parts)) {
            return NextResponse.json(
                { error: "Invalid parts payload" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts,
                },
            ],
        });

        const response = await result.response;
        const output = response.text();

        return NextResponse.json({ output });
    } catch (err: any) {
        console.error("Gemini API Error:", err);
        return NextResponse.json(
            { error: err.message || "Gemini error" },
            { status: 500 }
        );
    }
}
