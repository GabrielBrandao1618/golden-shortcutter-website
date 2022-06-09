import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

import {api} from '../services/api'

type Params = {
    name:string;
}

type getUrlServerResponse = {
    ref: string;
    name: string;
}

function Redirect(){
    const {name} = useParams<Params>()

    const [url, setUrl] = useState('')

    useEffect(() => {
        api.get<getUrlServerResponse>(`/getUrl/${name}`).then(response => setUrl(response.data.ref))
    }, [])
    useEffect(()=> {
        if(url.trim() !== ''){
            window.location.replace(url)
        }
    }, [url])
    return (
        <div>
            <h2>Aguarde</h2>
            <p>Em alguns instantes você será redirecionado para onde deseja</p>
        </div>
    )
}

export {Redirect}