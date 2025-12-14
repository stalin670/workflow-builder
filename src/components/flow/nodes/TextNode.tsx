import { Handle, Position } from "reactflow";

export default function TextNode({ data }: any) {
    return (
        <div className="bg-[#1c2240] p-3 rounded w-48">
            <textarea
                className="w-full bg-transparent border border-gray-600 rounded p-1 text-sm"
                placeholder="Enter text..."
                onChange={(e) => data.onChange(e.target.value)}
            />

            <Handle type="source" position={Position.Right} />
        </div>
    );
}