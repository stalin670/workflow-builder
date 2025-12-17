import { create } from "zustand";
import {
    Node,
    Edge,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
} from "reactflow";

type Snapshot = {
    nodes: Node[];
    edges: Edge[];
};

const initialNodes: Node[] = [
    {
        id: "1",
        type: "image",
        position: { x: -100, y: 100 },
        data: {
            label: "Image",
            file: null,
            base64: null,
            mimeType: null,
            preview: null,
            fileName: null,
        },
    },
    {
        id: "2",
        type: "text",
        position: { x: -100, y: 250 },
        data: {
            label: "Text",
            text: "Product name & specs",
            mode: "input",
        },
    },
    {
        id: "3",
        type: "llm",
        position: { x: 400, y: 180 },
        data: {
            label: "LLM",
            prompt: "Analyze product, Write Amazon listing.",
        },
    },
    {
        id: "4",
        type: "llm",
        position: { x: 400, y: 400 },
        data: {
            label: "LLM",
            prompt: "Analyze product, Write Instagram Caption.",
        },
    },
    {
        id: "5",
        type: "llm",
        position: { x: 400, y: -50 },
        data: {
            label: "LLM",
            prompt: "Analyze product, Write SEO description.",
        },
    },

];

const initialEdges: Edge[] = [
    { id: "e1", source: "1", target: "3" },
    { id: "e2", source: "2", target: "3" },
    { id: "e3", source: "1", target: "4" },
    { id: "e4", source: "2", target: "4" },
    { id: "e5", source: "1", target: "5" },
    { id: "e6", source: "2", target: "5" },
];

type FlowState = {
    nodes: Node[];
    edges: Edge[];

    past: Snapshot[];
    future: Snapshot[];

    onNodesChange: (changes: any) => void;
    onEdgesChange: (changes: any) => void;
    onConnect: (connection: any) => void;

    updateNodeData: (id: string, data: any) => void;
    addNode: (type: "text" | "image" | "llm") => void;
    addOutputNode: (llmNodeId: string, text: string) => void;
    deleteNode: (nodeId: string) => void;
    commit: (snapshot: Snapshot) => void;


    undo: () => void;
    redo: () => void;

    loadWorkflow: (nodes: Node[], edges: Edge[]) => void;
    exportWorkflow: () => { nodes: Node[]; edges: Edge[] };

};

export const useFlowStore = create<FlowState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,

    past: [],
    future: [],

    commit: (next: Snapshot) =>
        set((state) => ({
            past: [...state.past, { nodes: state.nodes, edges: state.edges }],
            nodes: next.nodes,
            edges: next.edges,
            future: [],
        })),

    onNodesChange: (changes) => {
        const nodes = get().nodes;

        const updatedNodes = applyNodeChanges(changes, nodes);

        const isDraggingOnly = changes.every(
            (c: any) => c.type === "position" && c.dragging
        );

        if (isDraggingOnly) {
            set({ nodes: updatedNodes });
            return;
        }

        get().commit({ nodes: updatedNodes, edges: get().edges });
    },


    onEdgesChange: (changes) => {
        const updatedEdges = applyEdgeChanges(changes, get().edges);
        get().commit({ nodes: get().nodes, edges: updatedEdges });
    },

    onConnect: (connection) => {
        const updatedEdges = addEdge(connection, get().edges);
        get().commit({ nodes: get().nodes, edges: updatedEdges });
    },

    updateNodeData: (id, data) => {
        const updatedNodes = get().nodes.map((n) =>
            n.id === id ? { ...n, data: { ...n.data, ...data } } : n
        );
        get().commit({ nodes: updatedNodes, edges: get().edges });
    },

    addNode: (type) => {
        const newNode: Node = {
            id: crypto.randomUUID(),
            type,
            position: {
                x: 150 + Math.random() * 300,
                y: 150 + Math.random() * 300,
            },
            data:
                type === "text"
                    ? { label: "Text", text: "", mode: "input" }
                    : type === "image"
                        ? {
                            label: "Image",
                            file: null,
                            base64: null,
                            preview: null,
                            fileName: null,
                            mimeType: null,
                        }
                        : { label: "LLM", prompt: "" },
        };

        get().commit({
            nodes: [...get().nodes, newNode],
            edges: get().edges,
        });
    },

    addOutputNode: (llmNodeId, text) => {
        const outputId = crypto.randomUUID();

        const outputNode: Node = {
            id: outputId,
            type: "text",
            position: {
                x: 700,
                y: 150 + Math.random() * 200,
            },
            data: {
                label: "LLM Output",
                text,
                mode: "output",
            },
        };

        const outputEdge: Edge = {
            id: crypto.randomUUID(),
            source: llmNodeId,
            sourceHandle: "llm-source",
            target: outputId,
            targetHandle: "text-target",
        };

        get().commit({
            nodes: [...get().nodes, outputNode],
            edges: [...get().edges, outputEdge],
        });
    },

    deleteNode: (nodeId) => {
        get().commit({
            nodes: get().nodes.filter((n) => n.id !== nodeId),
            edges: get().edges.filter(
                (e) => e.source !== nodeId && e.target !== nodeId
            ),
        });
    },

    undo: () =>
        set((state) => {
            if (state.past.length === 0) return state;

            const previous = state.past[state.past.length - 1];
            const newPast = state.past.slice(0, -1);

            return {
                nodes: previous.nodes,
                edges: previous.edges,
                past: newPast,
                future: [{ nodes: state.nodes, edges: state.edges }, ...state.future],
            };
        }),

    redo: () =>
        set((state) => {
            if (state.future.length === 0) return state;

            const next = state.future[0];
            const newFuture = state.future.slice(1);

            return {
                nodes: next.nodes,
                edges: next.edges,
                past: [...state.past, { nodes: state.nodes, edges: state.edges }],
                future: newFuture,
            };
        }),

    loadWorkflow: (nodes, edges) =>
        set((state) => ({
            nodes,
            edges,
            past: [],
            future: [],
        })),

    exportWorkflow: () => ({
        nodes: get().nodes,
        edges: get().edges,
    }),

}));
