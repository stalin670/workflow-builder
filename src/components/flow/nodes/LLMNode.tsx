import { Handle, Position, NodeProps } from "reactflow";
import { useFlowStore } from "@/store/flowStore";

export default function LLMNode({ id }: NodeProps) {
    const { nodes, edges } = useFlowStore();

    const handleRun = async () => {
        const incomingEdges = edges.filter((e) => e.target === id);

        const inputNodes = incomingEdges.map((edge) =>
            nodes.find((n) => n.id === edge.source)
        );

        let textInputs: string[] = [];
        let imageInputs: File[] = [];

        inputNodes.forEach((node) => {
            if (!node) return;

            if (node.type === "text") {
                textInputs.push(node.data.text);
            }

            if (node.type === "image") {
                imageInputs.push(node.data.file);
            }
        });

        const res = await fetch("/api/run-llm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: textInputs.join("\n"),
            }),
        });

        const data = await res.json();
        alert(data.output);
    };

    const data = { onRun: handleRun };

    return (
        <div className="bg-[#272d55] p-3 rounded w-56">
            <h3 className="text-sm mb-2">Run Gemini</h3>

            <button
                onClick={data.onRun}
                className="bg-blue-600 w-full p-1 rounded"
            >
                Run
            </button>

            <Handle type="target" position={Position.Left} />
        </div>
    );
}
