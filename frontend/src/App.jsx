import { useState, useEffect } from 'react';
import { ListDir, PickDir } from "../wailsjs/go/main/App";

function App() {
    const [currDir, setCurrDir] = useState("");
    const [fileList, setFileList] = useState([]); // State for the file list
    const updateResultText = (result) => setResultText(result);

    // Fetch the file list when the component mounts
    useEffect(() => {
        if (currDir != "")
            ListDir(currDir)
                .then((files) => {
                    console.log("Files:", files); // Debug the result
                    setFileList(files); // Update state with the resolved array
                })
                .catch((err) => {
                    console.error("Error fetching ListDir:", err);
                    setFileList([]); // Handle error by setting an empty array
                });
    }, [currDir]); // Empty dependency array means this runs once on mount

    function pickDir() {
        PickDir().then(setCurrDir)
    }

    return (
        <div id="App" className="bg-blue-200 w-screen h-screen flex flex-row">
            <div id="left" className="bg-lime-300 flex-1 overflow-auto">
                {fileList.map((item, index) => (
                    <div key={index} className='bg-white whitespace-nowrap'>{item}</div>
                ))}
            </div>
            <div id="middle" className="bg-amber-500 flex flex-col flex-1 items-center justify-center">
                <button onClick={pickDir} className="bg-red-800 px-5 rounded-md">Pick directory</button>
                <div id="result" className='bg-green-500'>current directory: {currDir}</div>
            </div>
            <div id="right" className="bg-red-800 flex-1">
                ho
            </div>
        </div>
    );
}

export default App;
