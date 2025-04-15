import  React  from 'react';
import { FaGithub, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

export default function Main(){
    return(
        <Container>
            <h1>
                <FaGithub size={25}/>
                Meus Reposirótios
            </h1>

            <Form onSubmit={() =>{}}>
                <input type='text' placeholder='Adicionar Repositórios'/>

                <SubmitButton>
                    <FaPlus color='#FFF' size={14}/>
                </SubmitButton>
            </Form>

        </Container>
    );
}