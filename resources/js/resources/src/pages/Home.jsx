import React, { useState, useEffect } from "react";
import Main from "../components/Main/Main";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import repositori from "../utils/repositories";
import Modal from "react-modal";
import axios from "axios";
import DataTable from "react-data-table-component";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "15%",
        bottom: "auto",
        marginRight: "0%",
        transform: "translate(-50%, -50%)",
    },
};

function Home() {
    const [guru, setGuru] = useState("");
    const [siswa, setSiswa] = useState("");
    const [semester, setSemester] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const data = Cookies.get("authentication");
    const token = data.split(",");

    // Data Semester
    const [nSemester, setNSemester] = useState("");
    const [nYears, setNYears] = useState("");

    const currentYear = new Date().getFullYear(); // Get the current year
    const startYear = 1900; // Set a start year
    const years = []; // Initialize an empty array to store years

    // Loop through years from startYear to currentYear
    for (let year = startYear; year <= currentYear; year++) {
        years.push(year); // Add each year to the array
    }

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const dataGuru = async () => {
        try {
            let response = await fetch(`${repositori}guru`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token[0],
                },
            }).then((res) => res.json());

            setGuru(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    const dataSiswa = async () => {
        try {
            let response = await fetch(`${repositori}siswa`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token[0],
                },
            }).then((res) => res.json());
            setSiswa(response.data.length);
        } catch (error) {
            console.log(error);
        }
    };

    // Get data Semester
    const dataSemester = async () => {
        try {
            let response = await axios
                .get(`${repositori}semester`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token[0],
                    },
                })
                .then((res) => res.data);
            setFilter(response.data);
            setSemester(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    // Insert data Semester
    const addSemester = async (e) => {
        e.preventDefault();
        const dataInput = {
            semester: nSemester,
            tahun_pelajaran: nYears,
        };
        try {
            let response = await fetch(`${repositori}semester`, {
                method: "POST",
                body: JSON.stringify(dataInput),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token[0],
                },
            }).then((res) => res.json());
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        dataGuru();
        dataSiswa();
        dataSemester();
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: "Semester",
                    selector: (row) => row.semester,
                    sortable: true,
                },
                {
                    name: "Tahun Pelajaran",
                    selector: (row) => row.tahun_pelajaran,
                    sortable: true,
                },

                {
                    name: "",
                    selector: (row) => (
                        <div className="flex flex-row gap-x-3">
                            <Link to={`/guru/${row.nip}`}>
                                <div className="w-6 h-6 rounded-full shadow-md flex justify-center items-center border border-sky-500 hover:text-white text-sky-500 hover:bg-sky-500 transition duration-200">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-3 h-3"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
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
        const result = semester.filter((item) => {
            return (
                item.semester.toLowerCase().match(search.toLowerCase()) ||
                item.tahun_pelajaran.toLowerCase().match(search.toLowerCase())
            );
        });
        setFilter(result);
    }, [search]);

    return (
        <Main>
            <div className="grid grid-cols-6 bg-slate-100">
                <div className="col-span-5 col-start-2 p-5 overflow-y-auto">
                    <div className="flex justify-start pb-4">
                        <h4 className="font-bold text-base text-slate-500">
                            Dashboard
                        </h4>
                    </div>

                    <div className="flex flex-col gap-y-10">
                        <div className="grid gap-5 grid-col-1 md:grid-cols-2 lg:grid-cols-4">
                            <Link
                                to="/guru"
                                className="p-5 transition duration-300 bg-white rounded-lg shadow-lg group ring-1 ring-slate-900/5 hover:bg-orange-500 hover:ring-orange-500"
                            >
                                <div className="flex items-center gap-x-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-20 h-20 text-orange-500 group-hover:text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white">
                                        Guru
                                    </h3>
                                </div>
                                <div className="flex justify-center pt-1">
                                    <p className="text-xl font-bold text-slate-500 group-hover:text-white">
                                        {guru}
                                    </p>
                                </div>
                            </Link>

                            <Link
                                to="/siswa"
                                className="p-6 transition duration-300 bg-white rounded-lg shadow-lg group ring-1 ring-slate-900/5 hover:bg-lime-500 hover:ring-lime-500"
                            >
                                <div className="flex items-center gap-x-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-20 h-20 text-lime-500 group-hover:text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white">
                                        Siswa
                                    </h3>
                                </div>
                                <div className="flex justify-center pt-1">
                                    <p className="text-xl font-bold text-slate-500 group-hover:text-white">
                                        {siswa}
                                    </p>
                                </div>
                            </Link>

                            <Link className="p-6 transition duration-300 bg-white rounded-lg shadow-lg group ring-1 ring-slate-900/5 hover:bg-indigo-500 hover:ring-indigo-500">
                                <div className="flex items-center gap-x-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-20 h-20 text-indigo-500 group-hover:text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white">
                                        Mapel Pelajaran
                                    </h3>
                                </div>
                                <div className="flex justify-center pt-1">
                                    <p className="text-xl font-bold text-slate-500 group-hover:text-white">
                                        8
                                    </p>
                                </div>
                            </Link>
                            <Link className="p-6 transition duration-300 bg-white rounded-lg shadow-lg group ring-1 ring-slate-900/5 hover:bg-rose-500 hover:ring-rose-500">
                                <div className="flex items-center gap-x-8">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-20 h-20 text-rose-500 group-hover:text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-white">
                                        Jadwal
                                    </h3>
                                </div>
                                <div className="flex justify-center pt-1">
                                    <p className="text-xl font-bold text-slate-500 group-hover:text-white">
                                        8
                                    </p>
                                </div>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                            <div className="flex flex-col p-5 bg-white rounded-md shadow-md">
                                <div className="flex flex-col items-center justify-between py-5 md:flex-row">
                                    <h6 className="text-xl font-bold text-slate-500">
                                        Data tahun ajaran
                                    </h6>
                                    <button
                                        onClick={openModal}
                                        data-bs-toggle="modal"
                                        data-bs-target="#add"
                                        id="addBtnModal"
                                        className="px-2 py-1 text-sm font-bold text-white transition duration-200 rounded-md shadow-md bg-cyan-500 hover:text-cyan-500 hover:bg-white hover:ring hover:ring-cyan-200"
                                    >
                                        Tambah data
                                    </button>
                                </div>
                                <Modal
                                    isOpen={isOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Example Modal"
                                    ariaHideApp={false}
                                >
                                    <div className="w-full overflow-hidden overflow-y-auto border rounded-lg boder-slate-300 ">
                                        <div className="absolute top-1 right-1">
                                            <button
                                                className="outline-none w-5 h-5 border border-slate-300 flex justify-center items-center rounded-full text-slate-500 transition duration-200 hover:border-slate-500 hover:bg-white"
                                                onClick={closeModal}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-3 "
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18 18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex flex-col w-full p-3">
                                            <form
                                                className="flex flex-col w-full gap-y-5"
                                                onSubmit={addSemester}
                                            >
                                                <div className="flex flex-col gap-y-3 relative">
                                                    <label
                                                        htmlFor="password"
                                                        className="font-bold text-base text-slate-500"
                                                    >
                                                        Semester
                                                    </label>

                                                    <input
                                                        type="text"
                                                        name="semester"
                                                        id="semester"
                                                        onChange={(e) =>
                                                            setNSemester(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="border-sky-500 border  rounded-md shadow-md p-2 text-base outline-none"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-y-3 relative">
                                                    <label
                                                        htmlFor="password"
                                                        className="font-bold text-base text-slate-500"
                                                    >
                                                        Tahun Pelajaran
                                                    </label>

                                                    <select
                                                        className="border-sky-500 border  rounded-md shadow-md p-2 text-base outline-none"
                                                        name="years"
                                                        id="years"
                                                        onChange={(e) =>
                                                            setNYears(
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        {years.map((year) => (
                                                            <option
                                                                value={year}
                                                                key={year}
                                                            >
                                                                {year}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex flex-row justify-end">
                                                    <button
                                                        type="submit"
                                                        className="rounded-full outline-none border border-primary shadow-md py-1 px-6 text-sm font-bold text-white bg-primary hover:bg-white hover:text-primary transition duration-200"
                                                    >
                                                        {loading ? (
                                                            <div className="flex flex-row justify-center items-center gap-x-2">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.5"
                                                                    stroke="currentColor"
                                                                    className="size-4 animate-spin"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                                    />
                                                                </svg>
                                                                Loading...
                                                            </div>
                                                        ) : (
                                                            "Simpan"
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Modal>
                                <div className="w-full overflow-hidden overflow-x-scroll border rounded-lg boder-slate-300 md:overflow-hidden">
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
                                                        value={search || ""}
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
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5 text-sky-500"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-x-3">
                                                  
                                                    <div
                                                        className="rounded-md p-1 flex flex-row justify-center items-center font-bold border border-lime-500 text-sm gap-x-1 hover:bg-white hover:text-lime-500 cursor-pointer bg-lime-500 text-white transition duration-200"
                                                       
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
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
            </div>
        </Main>
    );
}

export default Home;
