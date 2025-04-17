import React from 'react';
import { useParams } from 'react-router-dom';

export default function Repositorio() {

    const params = useParams();

    return (
        <h1 style={{ color: '#FFF' }}>
            {decodeURIComponent(params.repositorio)}
        </h1>
    );
}