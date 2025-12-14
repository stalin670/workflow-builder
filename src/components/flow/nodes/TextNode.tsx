"use client";

import { Handle, Position, NodeProps } from "reactflow";
import { useEffect, useRef } from "react";
import { useFlowStore } from "@/store/flowStore";

export default function TextNode({ id, data }: NodeProps) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const updateNodeData = useFlowStore((s) => s.updateNodeData);

    useEffect(() => {
        if (!ref.current) return;
        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, [data.text]);

    return (
        <div className="bg-[#1c2240] p-3 rounded w-52">
            <p className="text-xs text-textMuted mb-1 text-gray-300">Text Input</p>
            <textarea
                ref={ref}
                className="w-full bg-transparent text-sm outline-none resize-none overflow-hidden"
                placeholder="Enter text..."
                value={data.text || ""}
                onChange={(e) =>
                    updateNodeData(id, { text: e.target.value })
                }
            />

            <Handle type="source" position={Position.Right} />
        </div>
    );
}