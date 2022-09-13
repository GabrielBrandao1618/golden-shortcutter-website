import styled from 'styled-components';
import {Control, Controller} from 'react-hook-form'

import { CustomInputProps, Input } from "../Input";


import {FieldError} from 'react-hook-form'
interface Props extends CustomInputProps {
    name: string;
    control: any;
    error?: FieldError;
}

const Error = styled.span`
    color: red;
    font-size: 12pt;
    font-weight: bold;
`

export function FormInput(props: Props){
    return (
        <Controller 
            name={props.name}
            control={props.control}
            render = {({field: {onChange, value}})=> {
                return (
                    <>
                        <Input
                            value={value ?? ''} 
                            onChange={onChange}
                            {...props}
                        />
                        <Error>{props.error?.message}</Error>
                    </>
                )
            }}
        />
    )
}