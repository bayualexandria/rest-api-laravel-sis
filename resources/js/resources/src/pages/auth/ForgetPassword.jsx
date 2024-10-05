import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import logo from "../../assets/images/logo-pendidikan.png";
import { Link } from "react-router-dom";
import repositori from "../../utils/repositories";

function ForgetPassword() {
    const [user, setuser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();

    const data = { email };

    const forgetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const responsen = await fetch(`${repositori}auth/forgot-password`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());
            setLoading(false);
            console.log(responsen);
        } catch (e) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        setuser(Cookies.get("authentication"));
    }, []);

    return (
        <>
            {user && <Navigate to="/" replace={true} />}
            <div className="bg-sky-500 w-full h-screen flex justify-center items-center flex-col px-3">
                <h1 className="font-bold text-white text-2xl ">
                    Sistem Informasi Sekolah
                </h1>
                <div className="md:w-1/3 w-full rounded-md shadow-lg bg-white px-7 pt-5 pb-10 mt-10 gap-y-5 flex flex-col">
                    <div className="flex w-full justify-center">
                        <img
                            src={logo}
                            alt="logo-pendidikan"
                            className="w-20"
                        />
                    </div>
                    <form
                        className="flex flex-col gap-y-7"
                        onSubmit={forgetPassword}
                    >
                        <div className="flex flex-col gap-y-3">
                            <label
                                htmlFor="username"
                                className="font-bold text-base text-slate-500"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={(e) => setEmail(e.target.value)}
                                className="border-sky-500 border  rounded-md shadow-md p-2 text-sm outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-full outline-none p-2 border border-sky-500 bg-sky-500 text-base text-white font-bold"
                        >
                            {loading ? (
                                <div className="flex flex-row items-center justify-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 animate-spin"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                                        />
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                "Reset password"
                            )}
                        </button>
                    </form>
                    <Link
                        to="/forget-password"
                        className="flex row justify-center w-full"
                    >
                        <div className="outline-none cursor-pointer text-sm font-thin text-sky-500">
                            Lupa password?
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;
