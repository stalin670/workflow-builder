"use client";

import { useFlowStore } from "@/store/flowStore";
import { useToastStore } from "@/store/toastStore";

export default function Toolbar() {
    const undo = useFlowStore((s) => s.undo);
    const redo = useFlowStore((s) => s.redo);
    const canUndo = useFlowStore((s) => s.past.length > 0);
    const canRedo = useFlowStore((s) => s.future.length > 0);

    const showToast = useToastStore((s) => s.showToast);

    const {
        nodes,
        edges,
        loadWorkflow,
        exportWorkflow,
    } = useFlowStore();

    const handleSave = async () => {
        console.log(nodes);
        try {
            await fetch("/api/workflow/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "My Workflow",
                    nodes,
                    edges,
                }),
            });

            showToast("success", "Workflow Saved!");
        }
        catch (err) {
            showToast("error", "Failed to save workflow");
        }
    };

    const handleLoad = async () => {
        const res = await fetch("/api/workflow/load");
        const data = await res.json();

        if (data.nodes && data.edges) {
            showToast("success", "Workflow Loaded!");
            loadWorkflow(data.nodes, data.edges);
        }
        else {
            showToast("error", "Failed to load workflow");
        }
    };

    const handleExport = () => {
        const data = exportWorkflow();

        const blob = new Blob(
            [JSON.stringify(data, null, 2)],
            { type: "application/json" }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "workflow.json";
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleImport = (file?: File) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const data = JSON.parse(reader.result as string);
            loadWorkflow(data.nodes, data.edges);
        };
        reader.readAsText(file);
    };

    return (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 bg-[#12172b] border border-gray-700 rounded px-2 py-1 z-50">
            <button
                onClick={handleSave}
                className="btn">
                💾 Save
            </button>
            <button
                onClick={handleLoad}
                className="btn">
                📥 Load
            </button>
            <label className="btn cursor-pointer">
                📂 Import
                <input
                    type="file"
                    accept=".json"
                    hidden
                    onChange={(e) =>
                        handleImport(e.target.files?.[0])
                    }
                />
            </label>
            <button onClick={handleExport} className="btn">
                📤 Export
            </button>
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
