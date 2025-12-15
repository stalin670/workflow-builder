import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workflow from "@/models/Workflow";

export async function POST(req: Request) {
    const { name, nodes, edges } = await req.json();

    await connectDB();

    const workflow = await Workflow.create({
        name,
        nodes,
        edges,
    });

    return NextResponse.json({ success: true, id: workflow._id });
}
