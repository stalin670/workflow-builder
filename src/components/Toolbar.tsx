"use client";

import { useFlowStore } from "@/store/flowStore";

export default function Toolbar() {
    const undo = useFlowStore((s) => s.undo);
    const redo = useFlowStore((s) => s.redo);
    const canUndo = useFlowStore((s) => s.past.length > 0);
    const canRedo = useFlowStore((s) => s.future.length > 0);

    return (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 bg-[#12172b] border border-gray-700 rounded px-2 py-1 z-50">
            <button
                onClick={undo}
                disabled={!canUndo}
                className="px-3 py-1 text-sm rounded bg-[#1c2240] disabled:opacity-40"
            >
                ⟲ Undo
            </button>

            <button
                onClick={redo}
                disabled={!canRedo}
                className="px-3 py-1 text-sm rounded bg-[#1c2240] disabled:opacity-40"
            >
                ⟳ Redo
            </button>
        </div>
    );
}
