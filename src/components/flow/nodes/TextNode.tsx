"use client";

import { Handle, Position, NodeProps } from "reactflow";
import { useEffect, useRef } from "react";
import { useFlowStore } from "@/store/flowStore";

export default function TextNode({ id, data }: NodeProps) {
    const ref = useRef<HTMLTextAreaElement>(null);
    const { updateNodeData, deleteNode } = useFlowStore();

    const isOutput = data.mode === "output";

    useEffect(() => {
        if (isOutput) return;
        if (!ref.current) return;

        ref.current.style.height = "auto";
        ref.current.style.height = ref.current.scrollHeight + "px";
    }, [data.text, isOutput]);

    return (
        <div className="bg-[#353539] p-3 rounded w-64 border border-gray-600 relative">
            <button
                onClick={() => deleteNode(id)}
                className="absolute top-1 right-1 text-gray-400 hover:text-red-400 text-xs"
            >
                ✕
            </button>

            <input
                value={data.label || ""}
                onChange={(e) =>
                    updateNodeData(id, { label: e.target.value })
                }
                className="w-full bg-transparent text-xs text-gray-300 mb-1 outline-none border-b border-gray-600"
            />

            <textarea
                ref={ref}
                value={data.text || ""}
                onChange={(e) =>
                    updateNodeData(id, { text: e.target.value })
                }
                className={`
                    w-full bg-transparent text-sm outline-none
                    ${isOutput
                        ? "h-40 resize-y overflow-y-auto border border-gray-500 rounded p-2"
                        : "resize-none overflow-hidden"}
                `}
            />

            <Handle
                id="text-target"
                type="target"
                position={Position.Left}
            />
            <Handle
                id="text-source"
                type="source"
                position={Position.Right}
            />
        </div>
    );
}
