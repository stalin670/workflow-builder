import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workflow from "@/models/Workflow";

export async function GET(req: Request) {
    await connectDB();

    const workflow = await Workflow.findOne().sort({
        createdAt: -1,
    });

    if (!workflow) {
        return NextResponse.json({ nodes: [], edges: [] });
    }

    return NextResponse.json({
        name: workflow.name,
        nodes: workflow.nodes,
        edges: workflow.edges,
    });
}
