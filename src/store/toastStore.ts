import { create } from "zustand";

export type ToastType = "success" | "error" | "warning";

export type Toast = {
    id: string;
    type: ToastType;
    message: string;
};

type ToastStore = {
    toasts: Toast[];
    showToast: (type: ToastType, message: string) => void;
    removeToast: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],

    showToast: (type, message) =>
        set((state) => ({
            toasts: [
                ...state.toasts,
                { id: crypto.randomUUID(), type, message },
            ],
        })),

    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));
