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
    color: rgb(255, 28, 28);
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
                        <Error>{props.error?.message}</Error>
                        <Input
                            value={value ?? ''} 
                            onChange={onChange}
                            {...props}
                        />
                    </>
                )
            }}
        />
    )
}