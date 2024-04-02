import './App.css'
import JogoDaVelha from './pages/JogoDaVelha'
import Layout from './pages/Layout.js';
import Home from './pages/Home.js';
import JogoBolinha from "./pages/JogoBolinha.js";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="jogo-da-velha" element={<JogoDaVelha />} />
            <Route path="novo-jogo" element={<JogoBolinha />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
