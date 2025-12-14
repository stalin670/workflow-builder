import { Handle, Position } from "reactflow";

export default function LLMNode({ data }: any) {
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
