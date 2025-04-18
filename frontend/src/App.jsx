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
      <div
        id="App"
        className="bg-blue-200 w-screen h-screen flex sm:flex-row flex-col"
      >
        <div id="left" className="bg-gray-200 flex-1 min-h-0 min-w-0">
          <Table data={fileList} />
        </div>
        <div
          id="middle"
          className="bg-gray-600 flex flex-col flex-1 items-center justify-between p-4"
        >
          <div className="flex flex-col items-center space-y-4 w-full mt-5">
            <button
              onMouseDown={pickDir}
              className="h-10 font-medium rounded-sm bg-slate-500 hover:bg-slate-700 text-white w-full"
            >
              {currDir || "Pick a directory"}
            </button>
            <label className="flex items-center space-x-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={showHidden}
                disabled={!currDir}
                onChange={() => {
                  setShowHidden(!showHidden);
                }}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm font-medium">Include hidden files</span>
            </label>
          </div>
          <button
            disabled={!Boolean(currDir)}
            className="h-12 w-full font-semibold rounded-full bg-orange-600 disabled:bg-gray-300 text-white hover:bg-orange-700 transition-colors duration-200"
          >
            Rename
          </button>
        </div>
        <div id="right" className="bg-gray-200 flex-1 min-h-0 min-w-0">
          <Table data={fileList} />
        </div>
      </div>
    </ScrollSync>
  );
}

export default App;
