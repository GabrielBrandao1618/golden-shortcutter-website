import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { api } from '../services/api';

type props = {
    className?: string;
}

type params = {
    name:string;
}

type responseBody = {
    visitsCount: number;
}

function Admin({className}:props){
    const {name} = useParams<params>()
    const [response, setResponse] = useState({} as responseBody)

    useEffect(()=>{
        api.get<responseBody>(`/admin/${name}`).then(result => {
            setResponse(result.data)
        })
    }, [])
    return (
        <div className={className}>
            <h2>Admin</h2>
            <p>Número de visitas: {response.visitsCount}</p>
        </div>
    )
}

const StyledAdmin = styled(Admin)`

`

export {StyledAdmin as Admin}