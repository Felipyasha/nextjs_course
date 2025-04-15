import { Link } from 'react-router-dom';

export default function Sobre() {
  return (
    <div>
      <h1>Felipyasha é o melhor que tem no mercado, contratem!!</h1>
      <Link to='/'> Home </Link><br />
      <Link to='/contato'> Contato </Link>
    </div>
  );
}

