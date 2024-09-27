import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import repositori from "../../utils/repositories";
import repoimages from "../../utils/repoimages";

function Header() {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState(Cookies.get("authentication"));
    const [dataUser, setDataUser] = useState([]);

    const showUser = async () => {
        const data = Cookies.get("authentication");
        const token = data.split(",");

        try {
            let response = await fetch(`${repositori}user/${token[1]}/guru`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token[0],
                },
                method: "GET",
            }).then((res) => res.json());
            setDataUser(response.data);
        } catch (error) {}
    };

    useEffect(() => {
        showUser();
    });

    const popUpLogoutButton = async () => {
        const templateModal = withReactContent(Swal).mixin({
            customClass: {
                confirmButton:
                    "bg-sky-500 font-bold text-white outline-none border border-sky-500 rounded-md ml-2 px-2 py-0.5 cursor-pointer",
                cancelButton:
                    "bg-rose-500  font-bold text-white outline-none border border-rose-500 rounded-md mr-2 px-2 py-0.5 cursor-pointer",
            },
            buttonsStyling: false,
        });
        await templateModal
            .fire({
                title: "Logout",
                text: "Apakah anda ingin keluar dari sistem ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const data = Cookies.get("authentication");
                    const auth = data.split(",");

                    await fetch(`${repositori}logout`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + auth[0],
                        },
                    });
                    setUser(Cookies.remove("authentication"));
                    return <Navigate to="/login" replace={true} />;
                }
                return true;
            });
    };

    const showMenu = () => {
        setShow(!show);
    };
    return (
        <div className="container py-4">
            {user == null && <Navigate to="/login" replace={true} />}

            <ul className="flex justify-end md:gap-56">
                <li className="flex items-center justify-between gap-x-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 md:w-7 md:h-7 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                        />
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 md:w-7 md:h-7 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>

                    <div
                        className="flex items-center gap-x-1 cursor-pointer"
                        onClick={showMenu}
                    >
                        {dataUser.status_id == 2 ? (
                            <div className="w-9 h-9 rounded-full shadow-md  p-2 flex justify-center items-center border border-slate-200 overflow-hidden">
                                <img
                                    src={
                                        repoimages + dataUser.guru.image_profile
                                    }
                                    alt="profile"
                                    className="w-full"
                                />
                            </div>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 md:w-7 md:h-7 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="1"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        )}

                        <h5 className="hidden text-slate-500 md:block text-sm">
                            {dataUser ? dataUser.name : ""}
                        </h5>
                    </div>
                    <div
                        className={`${
                            show ? "block" : "hidden"
                        } absolute right-3 top-16 md:top-16`}
                    >
                        <div className="flex flex-col rounded-md shadow-md px-5 py-3 bg-slate-50 gap-y-3">
                            <div className="flex flex-row justify-between items-center gap-x-3 cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-slate-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                                <p className="text-sm text-slate-500">
                                    Setting
                                </p>
                            </div>
                            {dataUser ? (
                                <Link
                                    to="/profile"
                                    className="flex flex-row justify-between items-center gap-x-3 cursor-pointer"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6 text-slate-500"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                        />
                                    </svg>

                                    <p className="text-sm text-slate-500">
                                        Profile
                                    </p>
                                </Link>
                            ) : (
                                ""
                            )}

                            <div
                                className="flex flex-row justify-between items-center gap-x-3 cursor-pointer"
                                onClick={popUpLogoutButton}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 text-slate-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                    />
                                </svg>

                                <p className="text-sm text-slate-500">Logout</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Header;
