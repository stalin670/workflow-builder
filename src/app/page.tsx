"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import FlowCanvas from "@/components/flow/FlowCanvas";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toolbar from "@/components/Toolbar";

export default function Home() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  }, [router]);
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
