"use client";

import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "@/store/flowStore";
import TextNode from "../flow/nodes/TextNode";
import ImageNode from "../flow/nodes/ImageNode";
import LLMNode from "../flow/nodes/LLMNode";

const nodeTypes = {
    text: TextNode,
    image: ImageNode,
    llm: LLMNode,
};

const getMiniMapNodeColor = (node: any) => {
    if (node.type === "text") {
        return node.data?.mode === "output"
            ? "#f59e0b"
            : "#3b82f6";
    }

    if (node.type === "image") return "#22c55e";
    if (node.type === "llm") return "#a855f7";

    return "#64748b";
};

export default function FlowCanvas() {
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
    } = useFlowStore();
    return (
        <div className="flex-1">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                defaultEdgeOptions={{
                    style: {
                        stroke: "#F09FFA",
                        strokeWidth: 2,
                    },
                    animated: true,
                }}
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    className="bg-[#0E0E13]"
                    gap={16} size={1} />
                <Controls />
                <MiniMap
                    pannable
                    zoomable
                    nodeColor={getMiniMapNodeColor}
                    nodeStrokeWidth={2}
                    maskColor="rgba(0,0,0,0.6)"
                />
            </ReactFlow>
        </div>
    );
}
