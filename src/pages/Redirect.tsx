import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

import {api} from '../services/api'
import axios from 'axios'

type Params = {
    name:string;
}

function Redirect(){
    const {name} = useParams<Params>()

    const [url, setUrl] = useState('')

    useEffect(() => {
        api.get(`/getUrl/${name}`).then(console.log)
    }, [])
    return (
        <div>
            <h2>Tela de redirecionamento</h2>
            <p>Redirecionando para: {name}</p>
        </div>
    )
}

export {Redirect}