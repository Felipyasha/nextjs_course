import React, { useState, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton} from './styles';
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {

  const params = useParams();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {

    async function load() {
      const nomeRepo = params.repositorio;

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);



      setRepository(repositorioData.data);
      setIssues(issuesData.data);
      setloading(false);

    }

    load();

  }, [params.repositorio]);

  if (loading) {
    return (
      <Loading>
        <h1>
          Carregando
        </h1>
      </Loading>
    )
  }
  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color='#000' size={30}/>
      </BackButton>

      <Owner>
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login }
        />
        <h1>
          {repository.name}
        </h1>
        <p>
          {repository.description}
        </p>
      </Owner>
    </Container>
  );
}