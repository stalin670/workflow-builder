import { Handle, Position, NodeProps } from "reactflow";

export default function ImageNode({ data }: NodeProps) {
    return (
        <div className="bg-[#1c2240] p-3 rounded w-52">
            <p className="text-xs mb-1 text-gray-300">Image Input</p>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => data.onUpload(e.target.files?.[0])}
                className="text-xs"
            />
            {data.preview && (
                <img
                    src={data.preview}
                    className="mt-2 rounded"
                    alt="preview"
                />
            )}
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
