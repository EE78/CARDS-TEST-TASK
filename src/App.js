import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import CardsItem from "./components/CardsItem/CardsItem";

function App() {
  return (
    <div className="app">
      <Header />
      <CardsItem  />
      <Footer />
    </div>
  );
}

export default App;
