import './App.css';
import CardDetails from './components/CardDetails';
import Cards from './components/Cards';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path = '/' element={<Cards/>}/>
        <Route path = '/cart/:id' element={<CardDetails/>}/>
      </Routes>
    </>
  );
}

export default App;
