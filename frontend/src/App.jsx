import { useState, useEffect } from "react";
import { ListDir, PickDir } from "../wailsjs/go/main/App";
import Table from "./Table";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

function App() {
  const [currDir, setCurrDir] = useState("");
  const [showHidden, setShowHidden] = useState(true);
  const [fileList, setFileList] = useState([]); // State for the file list

  // Fetch the file list when the component mounts
  useEffect(() => {
    // if (currDir != "")
    ListDir(currDir, showHidden)
      .then((files) => {
        setFileList(files); // Update state with the resolved array
      })
      .catch((err) => {
        console.error("Error fetching ListDir:", err);
        setFileList([]);
      });
  }, [currDir, showHidden]);

  function pickDir() {
    // PickDir().then(setCurrDir);

    PickDir().then((dir) => {
      setCurrDir(dir);
    });
  }

  return (
    <ScrollSync>
      <div id="App" className="bg-blue-200 w-screen h-screen flex flex-row">
        <div id="left" className="bg-gray-200 flex-1 ">
          <Table data={fileList} />
        </div>
        <div
          id="middle"
          className="bg-gray-600 flex flex-col flex-1 items-center justify-center"
        >
          <label className="flex items-center space-x-2 text-white cursor-pointer">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={() => {
                setShowHidden(!showHidden);
              }}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium">Show hidden files</span>
          </label>
          <button
            onClick={pickDir}
            className="h-10 px-6 font-semibold rounded-full bg-orange-600 text-white"
          >
            {currDir || "Pick a directory"}
          </button>
        </div>
        <div id="right" className="bg-gray-200 flex-1">
          <Table data={fileList} />
        </div>
      </div>
    </ScrollSync>
  );
}

export default App;
