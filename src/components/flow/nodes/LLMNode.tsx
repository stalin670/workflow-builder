import { Handle, Position, NodeProps } from "reactflow";
import { useState } from "react";
import { useFlowStore } from "@/store/flowStore";

export default function LLMNode({ id, data }: NodeProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        nodes,
        edges,
        updateNodeData,
        addOutputNode,
        deleteNode,
    } = useFlowStore();

    const handleRun = async () => {
        setLoading(true);
        setError("");

        const incomingEdges = edges.filter((e) => e.target === id);
        const inputNodes = incomingEdges
            .map((edge) => nodes.find((n) => n.id === edge.source))
            .filter(Boolean);

        let finalPrompt = "";

        if (data.prompt) {
            finalPrompt += `INSTRUCTION:\n${data.prompt}\n\n`;
        }

        inputNodes.forEach((node: any) => {
            if (node.type === "text") {
                finalPrompt += `TEXT INPUT:\n${node.data.text}\n\n`;
            }
            if (node.type === "image") {
                finalPrompt += `IMAGE PROVIDED\n\n`;
            }
        });

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: finalPrompt }),
            });

            const result = await res.json();
            addOutputNode(id, result.output);
        } catch {
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

            <Handle
                id="llm-target"
                type="target"
                position={Position.Left}
            />
            <Handle
                id="llm-source"
                type="source"
                position={Position.Right}
            />
        </div>
    );
}
