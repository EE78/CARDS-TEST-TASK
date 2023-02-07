import React, { useState } from "react";
import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import Cards from "./components/Cards/Cards";
import Tree from "./components/Tree/Tree";

function App() {
  const [cardsToRender, setCardsToRender] = useState(false);
  const [treeToRender, setTreeToRender] = useState(false);

  return (
    <div className="app">
      <Header />
      <div className="app__variants">
      <button
        onClick={() => {
          setCardsToRender((prevState) => !prevState);
        }}
      >
        CARDS
      </button>
      {cardsToRender ? <Cards /> : null}

      <button
        onClick={() => {
          setTreeToRender((prevState) => !prevState);
        }}
      >
        TREE
      </button>
      {treeToRender ? <Tree /> : null}
      </div>
      <Footer />
    </div>
  );
}

export default App;
