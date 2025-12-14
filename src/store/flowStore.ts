import { create } from "zustand";

import {
    Node,
    Edge,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    NodeChange,
    EdgeChange,
    Connection,
} from "reactflow";

const initialNodes: Node[] = [
    {
        id: "1",
        type: "image",
        position: { x: 100, y: 100 },
        data: { file: null },
    },
    {
        id: "2",
        type: "text",
        position: { x: 100, y: 250 },
        data: { text: "Product name & specs" },
    },
    {
        id: "3",
        type: "llm",
        position: { x: 400, y: 180 },
        data: {},
    },
];

const initialEdges: Edge[] = [
    { id: "e1", source: "1", target: "3" },
    { id: "e2", source: "2", target: "3" },
];

type FlowState = {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    onConnect: (connection: any) => void;
};

export const useFlowStore = create<FlowState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) =>
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        }),
    onEdgesChange: (changes) =>
        set({
            edges: applyEdgeChanges(changes, get().edges),
        }),
    onConnect: (connection) =>
        set({
            edges: addEdge(connection, get().edges),
        }),
}));


