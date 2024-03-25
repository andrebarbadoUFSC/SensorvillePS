import React from 'react';
import ReactForm from './ReactForm'; // Ajuste o caminho se o ReactForm estiver em um subdiretório
import './App.scss';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <ReactForm />
    </div>
  );
}

export default App;