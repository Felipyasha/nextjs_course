import React, { useState, useCallback, useEffect } from 'react';
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState(() =>{
        const repoStorage = localStorage.getItem('@repos');
        return repoStorage ? JSON.parse(repoStorage) : [];
    });
    const [loading, setloading] = useState(false);
    const [alert, setAlert] = useState(null);    

    //Salvar alterações
    useEffect(() => {
        localStorage.setItem('@repos', JSON.stringify(repositories));

    }, [repositories]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setloading(true);
            setAlert(null);

            try {

                if (newRepo === '') {
                    throw new Error('Você precisa indicar um repositório');
                }

                const response = await api.get(`repos/${newRepo}`);

                const hasRepo = repositories.find(repo => repo.name === newRepo);

                if (hasRepo) {
                    throw new Error('Repositório duplicado');
                }

                const data = {
                    name: response.data.full_name,

                }

                setRepositories([...repositories, data]);
                setNewRepo('');
            } catch (error) {
                setAlert(true);
                console.log(error);

            } finally {
                setloading(false);
            }
        }


        submit();

    }, [newRepo, repositories]);

    function handleinputChange(e) {
        setNewRepo(e.target.value);
        setAlert(null);
    }

    const handleDelete = useCallback((repo) => {
        const find = repositories.filter(r => r.name !== repo);
        setRepositories(find);
    }, [repositories]);

    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Reposirótios
            </h1>

            <Form onSubmit={handleSubmit} error={alert}>
                <input
                    type='text'
                    placeholder='Adicionar Repositórios'
                    value={newRepo}
                    onChange={handleinputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color='#FFF' size={14} />
                    ) : (
                        <FaPlus color='#FFF' size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositories.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to = {`/repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars size={20} />
                        </Link>
                    </li>
                ))}
            </List>

        </Container>
    );
}