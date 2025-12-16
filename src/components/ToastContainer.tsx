"use client";

import { useEffect } from "react";
import { useToastStore } from "@/store/toastStore";
import Toast from "./Toast";

export default function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    useEffect(() => {
        const timers = toasts.map((toast) =>
            setTimeout(() => removeToast(toast.id), 3000)
        );

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [toasts, removeToast]);

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}
