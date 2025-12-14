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

        const res = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: textInputs.join("\n"),
            }),
        });

        const data = await res.json();
        console.log(data);
        // alert(data.output);
    };

    return (
        <div className="bg-[#272d55] p-3 rounded w-56">
            <h3 className="text-sm mb-2">Run Gemini</h3>

            <button
                onClick={handleRun}
                className="
                nodrag pointer-events-auto
                bg-blue-600
                hover:bg-blue-700
                shadow-sm
                hover:shadow-md
                active:scale-[0.98]
                active:shadow-sm
                transition
                duration-200
                ease-in-out
                w-full
                p-1.5
                rounded
                text-white
                pointer-cursor"
            >
                Run
            </button>


            <Handle type="target" position={Position.Left} />
        </div>
    );
}
