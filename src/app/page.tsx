import Sidebar from "@/components/sidebar/Sidebar";
import FlowCanvas from "@/components/flow/FlowCanvas";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#0b0f1a] text-white">
      <Sidebar />
      <FlowCanvas />
    </div>
  );
}
