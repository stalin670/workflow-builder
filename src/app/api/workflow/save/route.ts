import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workflow from "@/models/Workflow";

export async function POST(req: Request) {
    const { name, nodes, edges } = await req.json();

    console.log("Saving workflow:", { name, nodes, edges });

    await connectDB();

    console.log("Coming before creating workflow");
    const workflow = await Workflow.create({
        name,
        nodes,
        edges,
    });
    console.log("Coming after creating workflow");

    await workflow.save();

    if (!workflow) {

        return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: workflow._id });
}
