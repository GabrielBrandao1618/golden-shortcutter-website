import styled from 'styled-components'

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
type props = {
    className?:string;
}
function Redirect({className}:props){
    const {name} = useParams<Params>()

    const [url, setUrl] = useState('')
    const [urlExists, setUrlExists] = useState(true)

    useEffect(() => {
        api.get<getUrlServerResponse>(`/getUrl/${name}`).then(response => {
            if(response.data.ref.trim() === ''){
                setUrlExists(false)
            }
            setUrl(response.data.ref)
        })
    }, [])
    useEffect(()=> {
        if(url.trim() !== ''){
            window.location.replace(url)
        }
    }, [url])
    return (
        <div className={className}>
            <div className="menu">
                <h1>{urlExists? 'Hold up!' : 'Oh...'}</h1>
                {urlExists? (
                    <p className="paragraph">You're being redirected to another website...</p>
                ) : (
                    <p className="error-text">The website you're trying to access doesn't exist...</p>
                )}
            </div>
        </div>
    )
}

const StyledRedirect = styled(Redirect)`
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content:center;

    .menu {
        width:100%;
        max-width: 400px;
        background-color:#ffc400;
        border-radius: 8px;

        h1, p {
            width: 100%;
            text-align:center;
        }
        p {
            font-size:12pt;
        }
        
        p.error-text {
            color:red;
            font-weight: bold;
            font-size:13pt;
        }
    }
`

export {StyledRedirect as Redirect}