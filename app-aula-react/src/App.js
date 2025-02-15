
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([
    'ba',
    'li',
    'nha'
  ]);
 
  function handleRegister(e) {
    e.preventDefault();
    setTasks([...tasks, input]);
    setInput('');
  }

  return (
    <div>
      <h1>Cadastro de Usuário</h1>

      <form onSubmit={handleRegister}>
        <label>Nome da tarefa</label><br/>
        <input 
          placeholder="Digite uma tarefa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        /><br/>

        <button type="submit">Registrar</button>

        <br/>
        <br/>

        <ul>
          {tasks.map( task => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
