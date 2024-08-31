import { useEffect, useState } from "react"
import explorer from "./data/folderData"
import Folder from "./components/Folder"

export type explorerType = {
  id: string,
  name: string,
  isFolder: boolean,
  items?: explorerType[]
}

function App() {
  const [explorerData, setExplorerData] = useState<(explorerType | null)>(null)

  //set functions should be called inside useEffect or an event handler to prevent the infinite re-rendering
  useEffect(() => {
    setExplorerData(explorer)
  }, [])

  return (
    <div>
      <Folder explorer={explorer} />
    </div>
  )

}

export default App