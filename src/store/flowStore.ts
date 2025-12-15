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
import { file } from "zod";

const initialNodes: Node[] = [
    {
        id: "1",
        type: "image",
        position: { x: 100, y: 100 },
        data: { file: null, preview: null, filename: null },
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
    updateNodeData: (id: string, data: any) => void;
    addNode: (type: "text" | "image" | "llm") => void;
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
    updateNodeData: (id: string, data: any) =>
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id
                    ? { ...node, data: { ...node.data, ...data } }
                    : node
            ),
        })),
    addNode: (type: "text" | "image" | "llm") =>
        set((state) => ({
            nodes: [
                ...state.nodes,
                {
                    id: crypto.randomUUID(),
                    type,
                    position: {
                        x: 200 + Math.random() * 200,
                        y: 200 + Math.random() * 200,
                    },
                    data:
                        type === "text"
                            ? { text: "", onChange: () => { } }
                            : type === "image"
                                ? { file: null, preview: null, fileName: null }
                                : {},
                },
            ],
        })),

}));


