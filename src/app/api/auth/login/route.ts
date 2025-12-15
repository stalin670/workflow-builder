import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    await connectDB();

    const user = await User.findOne({ email, password });
    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    return NextResponse.json({
        userId: user._id,
        email: user.email,
    });
}
