import React, { useState, useCallback } from 'react';
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Container, Form, SubmitButton, List, DeleteButton } from './styles';
import api from '../../services/api';

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setloading] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {
            setloading(true);
            try {
                const response = await api.get(`repos/${newRepo}`);
                const data = {
                    name: response.data.full_name,

                }

                setRepositories([...repositories, data]);
                setNewRepo('');
            } catch (error) {
                console.log(error);

            } finally {
                setloading(false);
            }
        }


        submit();

    }, [newRepo, repositories]);

    function handleinputChange(e) {
        setNewRepo(e.target.value);
    }

    const handleDelete = useCallback((repo) => {
        const find = repositories.filter(r => r.name!== repo);
        setRepositories(find);
    },[repositories]);

    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Reposirótios
            </h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Adicionar Repositórios'
                    value={newRepo}
                    onChange={handleinputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner  color='#FFF' size={14} />
                    ) : (
                        <FaPlus color='#FFF' size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositories.map(repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() =>handleDelete(repo.name)}>
                                <FaTrash size={14}/>
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <a href=''>
                            <FaBars size={20}/>
                        </a>
                    </li>
                ))}
            </List>

        </Container>
    );
}