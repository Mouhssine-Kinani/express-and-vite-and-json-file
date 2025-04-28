import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Header from "./components/Header";
import Read from "./app/read";
import ItemView from "./app/ItemView";
import ItemCreate from "./app/ItemCreate";
import ItemUpdate from "./app/ItemUpdate";
import ItemDelete from "./app/ItemDelete";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Read />} />
            <Route path="/item/view" element={<ItemView />} />
            <Route path="/item/create" element={<ItemCreate />} />
            <Route path="/item/update" element={<ItemUpdate />} />
            <Route path="/item/delete" element={<ItemDelete />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
