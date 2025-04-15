import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produto from "./pages/Produto";
import Erro from './pages/Erro'

const Rotas = () => {
    return(
        <BrowserRouter>
           <Routes>
                <Route path="/" element={<Home />}> </Route>
                <Route path="/sobre" element={<Sobre />}> </Route>
                <Route path="/contato" element={<Contato />}> </Route>
                <Route path="/produto/:id" element={<Produto />}> </Route>

                <Route path="/*" element={<Erro />}> </Route>
           </Routes>
        </BrowserRouter>
    )
}

export default Rotas;