import { explorerType } from "../App";
import { useState } from "react";

type folderProps = {
  explorer: explorerType;
  handleInsertNode: (folderId: number, item: string, isFolder: boolean) => void;
};

function Folder({ explorer, handleInsertNode }: folderProps) {
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (e: React.FormEvent<HTMLButtonElement>, isFolder: boolean) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="max-w-md gap-2 flex flex-col px-5 border-b-2 border-l-2">
        <div className="flex w-md bg-slate-400 flex-row justify-between">
          <p className="" onClick={() => setExpand(!expand)}>📂 {explorer.name}</p>
          <div className="text-[0.6vw] flex flex-row gap-2 p-2">
            <button className="bg-white p-[0.1vw] rounded" onClick={(e) => handleNewFolder(e, false)}>+file</button>
            <button className="bg-white p-[0.1vw] rounded" onClick={(e) => handleNewFolder(e, true)}>+folder</button>
          </div>
        </div>
        <div className="" hidden={!expand}>
          {showInput.visible && (
            <div className="">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="border border-black mb-2"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items &&
            explorer.items.map((subFolder, index) => (
              <Folder handleInsertNode={handleInsertNode} explorer={subFolder} key={index} />
            ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col px-5">
        <span>📄{explorer.name}</span>
      </div>
    );
  }
}

export default Folder;
