import { Handle, Position, NodeProps } from "reactflow";
import { useState, useEffect } from "react";
import { useFlowStore } from "@/store/flowStore";

export default function ImageNode({ data, id }: NodeProps) {
    const { updateNodeData, deleteNode } = useFlowStore();
    const [preview, setPreview] = useState<string | null>(data.preview || null);

    useEffect(() => {
        if (data.preview) setPreview(data.preview);
    }, [data.preview]);

    const handleFileUpload = (file?: File) => {
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        updateNodeData(id, {
            file,
            preview: previewUrl,
            fileName: file.name,
        });
    };

    return (
        <div className="bg-[#1c2240] p-3 rounded w-56 border border-gray-600 relative">
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

            <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files?.[0])}
                className="text-xs w-full"
            />

            {preview && (
                <img
                    src={preview}
                    className="mt-2 rounded max-h-40 object-cover"
                />
            )}

            <Handle
                id="image-source"
                type="source"
                position={Position.Right}
            />
        </div>
    );
}
