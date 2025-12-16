"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Toast as ToastType } from "@/store/toastStore";

const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
};

const styles = {
    success: "border-green-500/30 bg-green-500/10 text-green-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
    warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
};

export default function Toast({
    toast,
    onClose,
}: {
    toast: ToastType;
    onClose: () => void;
}) {
    const Icon = icons[toast.type];

    return (
        <div
            className={`flex items-center gap-3 p-3 border rounded-lg shadow-lg backdrop-blur ${styles[toast.type]}`}
        >
            <Icon size={18} />
            <span className="text-sm flex-1">{toast.message}</span>

            <button
                onClick={onClose}
                className="text-xs opacity-70 hover:opacity-100"
            >
                ✕
            </button>
        </div>
    );
}
