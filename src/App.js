import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import Header from "./Components/Heder";
import { Home } from "./pages/Home";
import { Editar } from "./pages/Editar";
import "./index.css"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path = '/:id?' element={ <Home/>}/> 
    <Route path = '/Editar' element={ <Editar/>}/> 
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
