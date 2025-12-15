import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    console.log(email, password);

    await connectDB();

    const existing = await User.findOne({ email });
    console.log("database connected 2");
    if (existing) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
        );
    }

    console.log("creating user");
    const user = await User.create({ email, password });

    return NextResponse.json({
        userId: user._id,
        email: user.email,
    });
}
