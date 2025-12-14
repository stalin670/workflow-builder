import { Handle, Position } from "reactflow";

export default function ImageNode({ data }: any) {
    return (
        <div className="bg-[#1c2240] p-3 rounded w-48">
            <input type="file" onChange={data.onUpload} />
            <Handle type="source" position={Position.Right} />
        </div>
    );
}
