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

export async function GET(req: Request) {
    try {
        await connectDB();

        const workflow = await Workflow.findOne().sort({
            createdAt: -1,
        });

        if (!workflow) {
            return NextResponse.json({
                name: "",
                nodes: [],
                edges: []
            });
        }

        const parsed = WorkflowSchema.safeParse({
            name: workflow.name,
            nodes: workflow.nodes,
            edges: workflow.edges,
        });

        if (!parsed.success) {
            console.error("Invalid workflow in DB:", parsed.error.flatten());
            return NextResponse.json(
                { error: "Stored workflow data is invalid" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            name: workflow.name,
            nodes: workflow.nodes,
            edges: workflow.edges,
        });
    }
    catch (error: any) {
        console.error("Load workflow error:", error);
        return NextResponse.json(
            { error: "Failed to load workflow" },
            { status: 500 }
        );
    }



}
