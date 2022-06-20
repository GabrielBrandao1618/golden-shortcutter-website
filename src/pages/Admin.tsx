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
            <div className="menu">
                <h1>Visits count on current link:</h1>
                <p>{response.visitsCount}</p>
            </div>
        </div>
    )
}

const StyledAdmin = styled(Admin)`
    width:100vw;
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content: center;

    .menu{
        box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
        padding: 5px;
        border-radius: 8px;
        width: 100%;
        max-width: 300px;

        p {
            color: #ffc400;
            font-weight: bold;
            font-size: 15pt;
            width:100%;
            text-align:center;
        }
        
        h1 {
            width:100%;
            text-align:center;
        }
    }
`

export {StyledAdmin as Admin}