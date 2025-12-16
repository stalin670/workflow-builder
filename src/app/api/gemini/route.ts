import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const GeminiPartSchema = z.union([
    z.object({
        text: z.string().min(1),
    }),
    z.object({
        inlineData: z.object({
            data: z.string().min(1),
            mimeType: z.string().min(1),
        }),
    }),
]);

const GeminiRequestSchema = z.object({
    parts: z.array(GeminiPartSchema).min(1),
});

function cleanLLMText(text: string) {
    return text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")

        .replace(/^#+\s*/gm, "")

        .replace(/^\s*[-•]\s*/gm, "")

        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const parsed = GeminiRequestSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { parts } = parsed.data;

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text:
                                "Respond in clean, plain English. " +
                                "Do not use markdown, bullet points, or special symbols. " +
                                "Write naturally like a human product description.\n\n",
                        },
                        ...parts,
                    ],
                },
            ],
        });

        const res = result.response;
        const txt = res.text();

        const output = cleanLLMText(txt);

        return NextResponse.json({ output });
    } catch (err: any) {
        console.error("Gemini API Error:", err);
        return NextResponse.json(
            { error: err.message || "Gemini error" },
            { status: 500 }
        );
    }
}
