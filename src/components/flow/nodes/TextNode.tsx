"use client";

import { Handle, Position, NodeProps } from "reactflow";

export default function TextNode({ data }: NodeProps) {
    return (
        <div className="bg-[#1c2240] p-3 rounded w-48">
            <p className="text-xs mb-1 text-gray-300">Text Input</p>
            <textarea
                className="w-full bg-transparent border border-gray-600 rounded p-1 text-sm resize-none"
                placeholder="Enter text..."
                value={data.text || ""}
                onChange={(e) => data.onChange(e.target.value)}
            />

            <Handle type="source" position={Position.Right} />
        </div>
    );
}