"use client";

import { useFlowStore } from "@/store/flowStore";

export default function Sidebar() {
    const addNode = useFlowStore((s) => s.addNode);

    return (
        <div className="w-64 bg-[#212126] border-r border-gray-800 p-4">
            <h2 className="text-lg font-semibold mb-6">Quick Access</h2>

            <div className="space-y-3">
                <button
                    onClick={() => addNode("text")}
                    className="w-full border-2 border-[#444448] hover:bg-black p-2 rounded">
                    ➕ Text Node
                </button>

                <button
                    onClick={() => addNode("image")}
                    className="w-full border-2 border-[#444448]  hover:bg-black p-2 rounded">
                    🖼 Image Node
                </button>

                <button
                    onClick={() => addNode("llm")}
                    className="w-full border-2 border-[#444448] hover:bg-black p-2 rounded">
                    🤖 Run LLM
                </button>
            </div>
            <button
                onClick={() => {
                    localStorage.removeItem("userId");
                    window.location.href = "/login";
                }}
                className="mt-6 w-full text-sm text-red-400 cursor-pointer"
            >
                Logout
            </button>

        </div>
    );
}
