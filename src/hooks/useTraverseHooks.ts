import { explorerType } from "../App";

const useTraverse = () => {
  const insertNode = (tree: explorerType, folderId: number, item: string, isFolder: boolean): explorerType => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items = [
        {
          id: Date.now(),
          name: item,
          isFolder,
          items: [],
        },
        ...(tree.items || []),
      ];
      return tree;
    }

    if (tree.items) {
      tree.items = tree.items.map((child) =>
        insertNode(child, folderId, item, isFolder)
      );
    }

    return { ...tree };
  };

  return { insertNode };
};

export default useTraverse;
