
import { useState } from 'react';
import Name from './components/Name'

function App(){
  const [dev, setDev] = useState('Yasha');

  function changeName(nome){
    setDev(nome);
  }

  return (
    <div>
      <h1>Mim de um emprego papai, tô me esforçando!!</h1>
      <h2>Sou eu o grande {dev}</h2>
      <button onClick={ () => changeName('Felipyasha') }>
        Trocar Dev
      </button>
      
    </div>
  );
}

export default App;
