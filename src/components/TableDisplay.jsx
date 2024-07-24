import {useState} from "react";

export default function TableDisplay() {
    const [jsonData, setJsonData] = useState(null);
    if (!jsonData) {
        return (
            <div className="m-2 flex justify-center flex-col items-center w-screen h-screen gap-2">
                <p className="text-6xl text-center">Upload the JSON Format of all the PPT links </p>
                <input type="file" className="file-input w-full max-w-xs mt-4 border-2 border-black"/>
                <button className="btn mt-2 border-1 border-black"
                        onClick={() => {
                            const file = document.querySelector('.file-input').files[0];
                            if (!file.name.endsWith(".json")) {
                                alert("Please upload a json file");
                            } else if (file) {
                                const reader = new FileReader();
                                reader.readAsText(file);
                                reader.onload = () => {
                                    setJsonData(JSON.parse(reader.result));
                                };
                            } else {
                                alert("Please upload a file");
                            }
                        }}
                >Upload
                </button>
            </div>
        )
    }

    return (<div className="m-2">
        <div className="flex justify-center gap-3">
            <button className="btn border-1 border-black" onClick={() => setJsonData(null)}>
                Clear
            </button>
        </div>
        {Object.keys(jsonData).map((key) => (
            <div key={`table_${key}`} className="overflow-x-auto my-2">
                <h1 className="text-2xl font-bold text-center m-2">{key}</h1>
                <table className="table table-zebra border-2 border-black">
                    <thead>
                    <tr>
                        {Object.keys(jsonData[key][0]).map((header) => (
                            <th key={`table_${key}_header_${header}`}
                                className={"border-2 text-center text-lg border-black"}
                            >{header}</th>))}
                    </tr>
                    </thead>
                    <tbody>
                    {jsonData[key].map((row, index) => (<tr key={`table_${key}_row_${index}`}>
                        {Object.values(row).map((value, index) => (
                            <td key={`table_${key}_row_${index}_cell_${value}`}
                                className={"border-2 text-center border-black"}
                            >{value}</td>
                        ))}
                    </tr>))}
                    </tbody>
                </table>
            </div>))}
    </div>)
}
