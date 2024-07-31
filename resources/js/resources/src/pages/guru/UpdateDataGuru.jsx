import React from "react";
import { useParams } from "react-router-dom";

function UpdateDataGuru() {
    const { nip } = useParams();
    return <div>UpdateDataGuru{nip}</div>;
}

export default UpdateDataGuru;
