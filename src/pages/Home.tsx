import { FormEvent, useState } from "react"
import styled from 'styled-components'

import {api} from '../services/api'

type props = {
    className?: string;
}

type shortedLink = {
    name:string;
    ref:string;
}

type createLinkServerResponse = {
    Sucess:boolean;
    Msg: string;
    ShortedLink: shortedLink;
}

function Home({className}:props){
    const [customName, setCustomName] = useState('')
    const [url, setUrl] = useState('')

    const [serverResponse, setServerResponse] = useState('')

    function handleFormSubmit(e:FormEvent){
        e.preventDefault()
        api.post<createLinkServerResponse>('/createLink', {
            ref:url,
            name:customName
        }).then(response => setServerResponse(response.data.Msg))
        setUrl('')
        setCustomName('')
    }
    return (
        <div className={className}>
            <h2>Home</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="custom-name">Custom name</label>
                <input 
                    type="text" 
                    name="custom-name" 
                    id="custom-name" 
                    onChange={e => setCustomName(e.target.value)}
                    value={customName}
                    required
                />
                <label htmlFor="url">URL</label>
                <input 
                    type="text" 
                    name="url" 
                    id="url" 
                    onChange={e => setUrl(e.target.value)}
                    value={url}
                    required
                />
                <button type="submit">Criar link</button>
            </form>
            <p>{serverResponse}</p>
        </div>
    )
}

const StyledHome = styled(Home)`
    width: 100vw;
    height: 100vh;
`

export {StyledHome as Home}