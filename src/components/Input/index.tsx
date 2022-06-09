import styled from 'styled-components'

import {InputHTMLAttributes} from 'react'

type props = InputHTMLAttributes<HTMLInputElement> & {
    label:string;
    className?: string;
}

function Input({label, className, name, ...inputProps}:props){
    return (
        <div className={className}>
            <input type="text" {...inputProps} />
            <label htmlFor={name}>{label}</label>
        </div>
    )
}

const StyledInput = styled(Input)`
    position:relative;
    height:40px;
    label {
        font-weight:bold;
        color: #383838;
        position:absolute;
        left:0;
        top:0;
        transition: all .2s ease-in-out;
        pointer-events:none;
        padding: 3px;
    }
    input {
        border:none;
        outline:none;
        height: 30px;
        font-size: 12pt;
        box-sizing:border-box;
        width: 100%;
        background:none;
        border-bottom: 1px solid black;
    }

    input:valid + label, input:focus + label {
        transform: translateY(-15px);
        font-size: 9pt;
        bottom:unset;
        color: #383838aa
    }
`

export {StyledInput as Input}