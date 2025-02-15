
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [user, setUser] = useState({});

  function handleRegister(e) {
    e.preventDefault();
    setUser({
      name: name,
      age: age,
      email: email,
    })
  }

  return (
    <div>
      <h1>Cadastro de Usuário</h1>

      <form onSubmit={handleRegister}>
        <label>Nome: </label><br/>
        <input 
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br/>

        <label>Email: </label><br/>
        <input 
          placeholder="Digite seu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>

        <label>Idade: </label><br/>
        <input 
          placeholder="Digite sua Idade"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        /><br/>

        <button type="submit">Registrar</button>

        <br/>
        <br/>

        <div>
          <span>Bem vindo {user.name}</span><br/>
          <span>Email:  {user.email}</span><br/>
          <span>Idade:  {user.age}</span><br/>
        </div>
      </form>
    </div>
  );
}

export default App;
