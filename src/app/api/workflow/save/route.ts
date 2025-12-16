import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Workflow from "@/models/Workflow";
import { any, z } from "zod";

const NodeSchema = z.object({
    id: z.string(),
    type: z.string().optional(),
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),
    data: z.record(z.any(), any()),
});

const EdgeSchema = z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    type: z.string().optional(),
});

const WorkflowSchema = z.object({
    name: z.string().min(1),
    nodes: z.array(NodeSchema),
    edges: z.array(EdgeSchema),
});

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const parsed = WorkflowSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { name, nodes, edges } = parsed.data;

        await connectDB();

        const workflow = await Workflow.create({
            name,
            nodes,
            edges,
        });

        await workflow.save();

        if (!workflow) {

            return NextResponse.json({ success: false }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            id: workflow._id,
        });
    } catch (error) {
        console.error("Save workflow error:", error);
        return NextResponse.json(
            { error: "Failed to save workflow" },
            { status: 500 }
        );
    }
}
