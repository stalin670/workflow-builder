"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import FlowCanvas from "@/components/flow/FlowCanvas";
import { useState } from "react";

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
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
      <FlowCanvas />
    </div>
  );
}
