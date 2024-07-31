import React, { useState, useEffect } from "react";
import Main from "../../components/Main/Main";
import DataTable from "react-data-table-component";
import Cookies from "js-cookie";
import axios from "axios";
import { Link } from "react-router-dom";
import repositori from "../../utils/repositories";

function Siswa() {
    const [user, setUser] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState([]);

    const dataUser = async () => {
        const dataToken = Cookies.get("authentication");
        const token = dataToken.split(",");
        try {
            const response = await axios
                .get(`${repositori}siswa`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token[0],
                    },
                })
                .then((res) => res.data);
            console.log(response.data);
            setUser(response.data);
            setFilter(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        dataUser();
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: "Nama Lengkap",
                    selector: (row) => row.nama,
                    sortable: true,
                },
                {
                    name: "NIS",
                    selector: (row) => row.nis,
                    sortable: true,
                },
                {
                    name: "Jenis Kelamin",
                    selector: (row) => row.jenis_kelamin,
                    sortable: true,
                },
                {
                    name: "No. Handphone",
                    selector: (row) => row.no_hp,
                    sortable: true,
                },
                {
                    name: "Alamat",
                    selector: (row) => row.alamat,
                    sortable: true,
                },
                {
                    name: "",
                    selector: (row) => (
                        <div className="flex flex-row gap-x-3">
                            <Link to={`/siswa/${row.nis}`}>
                                <div className="w-6 h-6 rounded-full shadow-md flex justify-center items-center border border-sky-500 hover:text-white text-sky-500 hover:bg-sky-500 transition duration-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                        />
                                    </svg>
                                </div>
                            </Link>
                            <Link>
                                <div className="w-6 h-6 rounded-full shadow-md flex justify-center items-center border border-rose-500 hover:text-white text-rose-500 hover:bg-rose-500 transition duration-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-4 h-4"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    ),
                    sortable: true,
                },
            ]);

            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const result = user.filter((item) => {
            return (
                item.nama.toLowerCase().match(search.toLowerCase()) ||
                item.nis.toLowerCase().match(search.toLowerCase()) ||
                item.jenis_kelamin.toLowerCase().match(search.toLowerCase()) ||
                item.no_hp.toLowerCase().match(search.toLowerCase()) ||
                item.alamat.toLowerCase().match(search.toLowerCase())
            );
        });
        setFilter(result);
    }, [search]);

    const exportExcel = () => {};

    return (
        <Main>
            <div className="grid grid-cols-6 bg-slate-100">
                <div className="col-span-5 col-start-2 p-5 overflow-y-auto">
                    <div className="flex justify-start py-4">
                        <h4 className="font-bold text-xl text-slate-500">
                            Data Siswa
                        </h4>
                    </div>
                    <div className="flex flex-col gap-y-10">
                        <div className="grid gap-5 grid-col-1 ">
                            <div className="p-5 transition duration-300 bg-white rounded-lg shadow-md ">
                                <DataTable
                                    data={filter}
                                    columns={columns}
                                    progressPending={pending}
                                    pagination
                                    selectableRowsHighlight
                                    highlightOnHover
                                    subHeader
                                    subHeaderComponent={
                                        <div className="w-full flex flex-row justify-between items-center">
                                            <div className="flex flex-row w-1/8 relative">
                                                <input
                                                    type="text"
                                                    className="rounded-md pr-2 pl-8 py-1 border border-sky-500 outline-none"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter search....."
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className="w-5 h-5 text-sky-500"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-row">
                                                <div
                                                    className="rounded-md p-1 flex flex-row justify-center items-center font-bold border border-lime-500 text-sm gap-x-1 hover:bg-white hover:text-lime-500 cursor-pointer bg-lime-500 text-white transition duration-200"
                                                    onClick={exportExcel}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="1.5"
                                                        stroke="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                                        />
                                                    </svg>
                                                    <p>Excel</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default Siswa;
