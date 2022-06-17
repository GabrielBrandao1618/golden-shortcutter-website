import { FormEvent, ReactNode, useState } from "react"
import styled from 'styled-components'

import { api } from '../services/api'

import { Input } from '../components/Input'
import { CopyLink } from "../components/CopyLink"

type props = {
    className?: string;
}

type shortedLink = {
    name: string;
    ref: string;
}

type createLinkServerResponse = {
    sucess: boolean;
    msg: string;
    shortedLink: shortedLink;
}

function Home({ className }: props) {
    const [customName, setCustomName] = useState('')
    const [url, setUrl] = useState('')
    const [operationSucess, setOperationSucess] = useState(true)

    const [serverResponse, setServerResponse] = useState<createLinkServerResponse>({} as createLinkServerResponse)

    function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        api.post<createLinkServerResponse>('/createLink', {
            ref: url,
            name: customName
        }).then(response => {
            setServerResponse(response.data)
            if (!response.data.sucess) {
                return setOperationSucess(false)
            }
            setOperationSucess(true)
            setUrl('')
            setCustomName('')
        })
    }
    return (
        <div className={className}>
            <form onSubmit={handleFormSubmit}>
                <h1>Golden shortcutter</h1>
                <div className="inputs">
                    <Input
                        type="text"
                        name="custom-name"
                        id="custom-name"
                        onChange={e => setCustomName(e.target.value)}
                        value={customName}
                        required
                        label="Custom name"
                    />
                    <Input
                        type="text"
                        name="url"
                        id="url"
                        onChange={e => setUrl(e.target.value)}
                        value={url}
                        required
                        label="URL"
                    />
                    <button type="submit">Create link</button>
                </div>
            </form>
            <ServerResponseText sucess={operationSucess}>{serverResponse.msg}</ServerResponseText>
            {serverResponse.sucess && (
                <CopyLink customName={serverResponse.shortedLink.name} />
            )}
        </div>
    )
}

type responseTextProps = {
    sucess: boolean;
    children?: ReactNode;
}
const ServerResponseText = styled.p<responseTextProps>`
    color: ${props => props.sucess ? 'green' : 'red'};
    font-weight:bold;
    font-size:12pt;
`
const StyledHome = styled(Home)`
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-flow: column nowrap;
    align-items:center;
    justify-content:center;

    form {
        width: 100%;
        max-width: 500px;
        background-color: #ffc400;
        display:flex;
        flex-flow: column nowrap;
        align-items:center;
        border-radius: 8px;
        padding: 10px;
        box-sizing:border-box;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);

        h1 {
            font-weight:bold;
            width:100%;
            text-align:center;
        }
        .inputs {
            display:flex;
            flex-flow: column nowrap;
            width: 70%;

            & > * {
                margin:5px;
            }

            button[type="submit"] {
                height: 35px;
                background-color:black;
                color: #ffc400;
                border:none;
                font-size: 13pt;
                font-weight: bold;
                cursor:pointer;
                box-sizing:border-box;
                border-radius: 8px;
            }
        }
    }
`

export { StyledHome as Home }