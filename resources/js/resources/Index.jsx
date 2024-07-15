import React from "react";
import ReactDOM from "react-dom/client";

export default function Index() {
    return (
        <>
            <div className="bg-sky-500 w-full h-screen flex justify-center items-center flex-col gap-y-10">
                <h1 className="font-bold text-white text-2xl">Sistem Informasi Sekolah</h1>
                <div className="w-1/3 rounded-md shadow-lg bg-white p-5">
                <form action="" className="flex flex-col gap-y-5">
                    <div className="flex flex-col gap-y-3">
                        <label
                            htmlFor="username"
                            className="font-bold text-sm text-slate-500"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name=""
                            id=""
                            className="rounded-md shadow-md border border-sky-500 py-1 px-2"
                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <label
                            htmlFor="password"
                            className="font-bold text-sm text-slate-500"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name=""
                            id=""
                            className="rounded-md shadow-md border border-sky-500 py-1 px-2"
                        />
                    </div>
                </form>
                </div>
            </div>
        </>
    );
}

if (document.getElementById("root")) {
    ReactDOM.createRoot(document.getElementById("root")).render(<Index />);
}
