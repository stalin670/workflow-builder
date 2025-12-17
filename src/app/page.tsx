"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import FlowCanvas from "@/components/flow/FlowCanvas";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Toolbar from "@/components/Toolbar";
import { useFlowStore } from "@/store/flowStore";
import { useToastStore } from "@/store/toastStore";

export default function Home() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const loadWorkflow = useFlowStore((s) => s.loadWorkflow);
  const showToast = useToastStore((s) => s.showToast);

  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const load = async () => {
      try {
        const res = await fetch("/api/workflow/load");
        const data = await res.json();

        if (data.nodes && data.edges) {
          loadWorkflow(data.nodes, data.edges);
          showToast("success", "Workflow Loaded");
        }
      } catch (err) {
        showToast("error", "Failed to load workflow");
      }
    };

    load();
  }, [loadWorkflow, showToast]);

  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-4 text-sm text-textMuted"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>
      {!collapsed &&
        <Sidebar />
      }
      <Toolbar />
      <FlowCanvas />
    </div>
  );
}
