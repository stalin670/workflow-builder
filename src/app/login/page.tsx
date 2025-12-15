"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.error || "Login failed");
            return;
        }

        localStorage.setItem("userId", data.userId);
        router.push("/");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-bg">
            <div className="bg-panel p-6 rounded w-80 border border-border">
                <h2 className="text-lg mb-4 text-center">Login</h2>

                <input
                    className="w-full mb-3 p-2 bg-node border border-border rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full mb-3 p-2 bg-node border border-border rounded"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                    <p className="text-red-400 text-sm mb-2">{error}</p>
                )}

                <button
                    onClick={handleLogin}
                    className="w-full bg-accent p-2 rounded hover:bg-indigo-500"
                >
                    Login
                </button>

                <p className="text-xs text-center mt-4 text-textMuted">
                    New user?{" "}
                    <span
                        className="text-accent cursor-pointer hover:bg-indigo-500"
                        onClick={() => router.push("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}
