"use client";

import { useFlowStore } from "@/store/flowStore";

export default function Sidebar() {
    const addNode = useFlowStore((s) => s.addNode);

    return (
        <div className="w-64 bg-[#11162a] border-r border-gray-800 p-4">
            <h2 className="text-lg font-semibold mb-6">Quick Access</h2>

            <div className="space-y-3">
                <button
                    onClick={() => addNode("text")}
                    className="w-full bg-[#1c2240] p-2 rounded">
                    ➕ Text Node
                </button>

                <button
                    onClick={() => addNode("image")}
                    className="w-full bg-[#1c2240] p-2 rounded">
                    🖼 Image Node
                </button>

                <button
                    onClick={() => addNode("llm")}
                    className="w-full bg-[#1c2240] p-2 rounded">
                    🤖 Run Any LLM
                </button>
            </div>
        </div>
    );
}
