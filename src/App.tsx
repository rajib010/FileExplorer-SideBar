import { useEffect, useState } from "react";
import explorer from "./data/folderData";
import Folder from "./components/Folder";
import useTraverse from "./hooks/useTraverseHooks";

export type explorerType = {
  id: number;
  name: string;
  isFolder: boolean;
  items?: explorerType[];
};

function App() {
  const [explorerData, setExplorerData] = useState<explorerType | null>(null);

  useEffect(() => {
    setExplorerData(explorer);
  }, []);

  const { insertNode } = useTraverse();

  const handleInsertNode = (folderId: number, item: string, isFolder: boolean) => {
    if (explorerData) {
      const finalTree = insertNode(explorerData, folderId, item, isFolder);
      setExplorerData(finalTree);
    }
  };

  return (
    <div>
      {explorerData && <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />}
    </div>
  );
}

export default App;
