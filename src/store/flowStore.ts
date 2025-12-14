import { create } from "zustand";

import {
    Node,
    Edge,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from "reactflow";

type FlowState = {
    nodes: Node[];
    edges: Edge[];
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    onConnect: (connection: any) => void;
};

export const useFlowStore = create<FlowState>((set) => ({
    nodes: [],
    edges: [],
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) =>
        set((state) => ({
            nodes: applyNodeChanges(changes, state.nodes),
        })),
    onEdgesChange: (changes) =>
        set((state) => ({
            edges: applyEdgeChanges(changes, state.edges),
        })),
    onConnect: (connection) =>
        set((state) => ({
            edges: addEdge(connection, state.edges),
        })),
}));