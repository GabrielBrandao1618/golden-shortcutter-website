import { ReactNode, useEffect, useState } from "react"
import styled from 'styled-components'

import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Control, SubmitHandler, useForm, UseFormHandleSubmit} from 'react-hook-form'

import { api } from '../services/api'

import { CopyLink } from "../components/CopyLink"
import { FormInput } from "../components/FormInput"

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

const formSchema = yup.object().shape({
    name: yup.string().required('Custom name is required'),
    ref: yup.string().required('Url is required').url('Must be a URL')
})

type formValues = yup.TypeOf<typeof formSchema>

function Home({ className }: props) {
    const [operationSucess, setOperationSucess] = useState(true)
    const [serverResponse, setServerResponse] = useState<createLinkServerResponse>({} as createLinkServerResponse)

    const {control, handleSubmit, formState:{errors}} = useForm<formValues>({
        resolver: yupResolver(formSchema)
    })

    const onSubmit: SubmitHandler<formValues> = async (data) => {
        const response = await api.post<createLinkServerResponse>('/createLink', {
            ref: data.ref,
            name: data.customName
        })
        console.log(response.data)
        setServerResponse(response.data)
        if (!response.data.sucess) {
            return setOperationSucess(false)
        }
        setOperationSucess(true)
    }


    return (
        <div className={className}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Golden shortcutter</h1>
                <div className="inputs">
                    <FormInput
                        control={control}
                        type="text"
                        name="name"
                        id="custom-name"
                        label="Custom name"
                        error={errors.name}
                    />
                    <FormInput
                        control={control}
                        type="text"
                        name="ref"
                        id="url"
                        label="URL"
                        error={errors.ref}
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