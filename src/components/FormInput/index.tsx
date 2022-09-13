import {Controller} from 'react-hook-form'

import { CustomInputProps, Input } from "../Input";

interface Props extends CustomInputProps {
    name: string;
    control: any
    error: any;
}

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
                        <span>{props.error?.message}</span>
                    </>
                )
            }}
        />
    )
}