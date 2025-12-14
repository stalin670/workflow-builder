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
            >
                <Background
                    variant={BackgroundVariant.Dots}
                    gap={16} size={1} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}
