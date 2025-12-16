import { Handle, Position, NodeProps } from "reactflow";
import { useState, useEffect } from "react";
import { useFlowStore } from "@/store/flowStore";

export default function ImageNode({ data, id }: NodeProps) {
    const { updateNodeData, deleteNode } = useFlowStore();
    const [preview, setPreview] = useState<string | null>(data.base64 || null);

    useEffect(() => {
        if (data.base64) setPreview(data.base64);
    }, [data.base64]);

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleFileUpload = async (file?: File) => {
        if (!file) return;

        const base64 = await fileToBase64(file);

        updateNodeData(id, {
            label: data.label || "Image",
            base64,
            mimeType: file.type,
            fileName: file.name,
        });

        setPreview(base64);
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
                    alt="preview"
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
