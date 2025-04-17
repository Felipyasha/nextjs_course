import React, { useState, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import { Container } from './styles';

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
                    params:{
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

    return (
        <Container>

        </Container>
    );
}