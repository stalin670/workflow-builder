"use client";

import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

export default function FlowCanvas() {
    return (
        <div className="flex-1">
            <ReactFlow>
                <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}
