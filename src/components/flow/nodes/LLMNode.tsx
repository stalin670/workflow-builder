"use client";

import { Handle, Position, NodeProps } from "reactflow";
import { useState } from "react";
import { useFlowStore } from "@/store/flowStore";
import { useToastStore } from "@/store/toastStore";

export default function LLMNode({ id, data }: NodeProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const showToast = useToastStore((s) => s.showToast);

    const {
        nodes,
        edges,
        addOutputNode,
        deleteNode,
        updateNodeData,
    } = useFlowStore();

    const handleRun = async () => {
        setLoading(true);
        setError("");

        const incomingEdges = edges.filter((e) => e.target === id);
        const inputNodes = incomingEdges
            .map((edge) => nodes.find((n) => n.id === edge.source))
            .filter(Boolean) as any[];

        const parts: any[] = [];

        if (data.prompt) {
            parts.push({
                text: `INSTRUCTION:\n${data.prompt}`,
            });
        }

        for (const node of inputNodes) {
            if (node.type === "text") {
                parts.push({
                    text: `TEXT INPUT:\n${node.data.text}`,
                });
            }

            if (node.type === "image") {
                if (!node.data.base64 || !node.data.mimeType) {
                    setError("Image node is missing data");
                    setLoading(false);
                    return;
                }

                parts.push({
                    inlineData: {
                        data: node.data.base64.replace(
                            /^data:image\/\w+;base64,/,
                            ""
                        ),
                        mimeType: node.data.mimeType,
                    },
                });
            }
        }

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ parts }),
            });

            const result = await res.json();

            if (!res.ok) {
                showToast("error", result.error || "Gemini error");
                throw new Error(result.error || "Gemini error");
            }

            showToast("success", "LLM run successful");
            addOutputNode(id, result.output);
        } catch (err) {
            console.error(err);
            showToast("error", "Error running LLM");
            setError("Error running LLM");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#272d55] p-3 rounded w-64 border border-gray-600 relative">
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
                className="w-full bg-transparent text-xs text-gray-300 mb-2 outline-none border-b border-gray-600"
            />

            <textarea
                className="w-full bg-transparent text-sm outline-none resize-none mb-2"
                placeholder="Analyze product, generate description"
                value={data.prompt || ""}
                onChange={(e) =>
                    updateNodeData(id, { prompt: e.target.value })
                }
            />

            <button
                onClick={handleRun}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 w-full p-1.5 rounded disabled:opacity-50"
            >
                {loading ? "Running..." : "Run"}
            </button>

            {error && (
                <p className="text-xs text-red-400 mt-1">{error}</p>
            )}

            <Handle id="llm-target" type="target" position={Position.Left} />
            <Handle id="llm-source" type="source" position={Position.Right} />
        </div>
    );
}
