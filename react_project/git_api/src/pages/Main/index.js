import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';
import api from '../../services/api';

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        async function submit() {

            const response = await api.get(`repos/${newRepo}`);
            const data = {
                name: response.data.full_name,

            }

            setRepositories([...repositories, data]);
            setNewRepo('');
        }

        submit();

    }, [newRepo, repositories]);

    function handleinputChange(e) {
        setNewRepo(e.target.value);
    }

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

                <SubmitButton>
                    <FaPlus color='#FFF' size={14} />
                </SubmitButton>
            </Form>

        </Container>
    );
}