import React, {useState} from "react";
import styled from "styled-components";

const baseTree = require("./TreeDB.json");
const TreeLine = styled.button`
  font-family: Menlo, Consolas, monospace;
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

function AddItem({ parent, funcs }) {
  return (
    <li>
      <TreeLine onClick={() => funcs.addChild(parent)}>+</TreeLine>
    </li>
  );
}

function TreeItem({ item, funcs }) {
  const { toggleOpen, makeParent } = funcs;
  return (
    <li>
      <TreeLine
        onClick={() => toggleOpen(item)}
        onDoubleClick={() => makeParent(item)}
      >
        {item.name}
        {item.children && <span>{item.isOpen ? "[-]" : "[+]"}</span>}
      </TreeLine>
      {item.children && item.isOpen && (
        <TreeList item={item} tree={item.children} funcs={funcs} />
      )}
    </li>
  );
}

function TreeList({ item, tree, funcs }) {
  return (
    <ul>
      {tree.map(child => (
        <TreeItem item={child} funcs={funcs} />
      ))}
      <AddItem parent={item} funcs={funcs} />
    </ul>
  );
}

function Tree() {
  const [tree, setTree] = useState(baseTree);

  const toggleOpen = item => {
    const newTree = [...tree];
    item.isOpen = !item.isOpen;
    setTree(newTree);
  };
  const makeParent = item => {
    const newTree = [...tree];
    item.children = [];
    setTree(newTree);
  };
  const addChild = parent => {
    const newTree = [...tree];
    if (!parent) {
      newTree.push({ name: "New Item" });
    } else {
      parent.children.push({ name: "New Item" });
    }
    setTree(newTree);
  };

  const funcs = {
    toggleOpen,
    addChild,
    makeParent
  };
  return (
    <div className="App">
      <h1> MY TRY TO CREATE A TREE COMPONENT</h1>
      <TreeList tree={tree} funcs={funcs} />
    </div>
  );
}
export default Tree