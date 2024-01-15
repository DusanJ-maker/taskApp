import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProductsView from './components/Products/ProductsView';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<ProductsView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
