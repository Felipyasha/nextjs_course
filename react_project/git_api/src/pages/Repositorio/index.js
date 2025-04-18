import React, { useState, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles';
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {

  const params = useParams();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {state:'all', label: 'Todas', active: true},
    {state:'open', label: 'Abertas', active: false},
    {state:'closed', label: 'Fechadas', active: false}
  ]);

  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {

    async function load() {
      const nomeRepo = params.repositorio;

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ]);



      setRepository(repositorioData.data);
      setIssues(issuesData.data);
      console.log(issuesData.data);

      setloading(false);

    }

    load();

  }, [params.repositorio, filters]);

  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = params.repositorio;

      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5,
        }
      });

      setIssues(response.data);

    }

    loadIssue();

  }, [page, params.repositorio, filterIndex, filters]); 

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

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
        <FaArrowLeft color='#000' size={30} />
      </BackButton>

      <Owner>
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />
        <h1>
          {repository.name}
        </h1>
        <p>
          {repository.description}
        </p>
      </Owner>
      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button
            type='button'
            key={filter.label}
            onClick={() => handleFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>

                {issue.labels.map(label => (
                  <span key={String(label.id)}>
                    {label.name}
                  </span>
                ))}
              </strong>

              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <PageActions>
        <button
          type='buttom'
          onClick={() => handlePage('back')}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type='buttom' onClick={() => handlePage('next')}>
          Proxima
        </button>
      </PageActions>
    </Container>
  );
}