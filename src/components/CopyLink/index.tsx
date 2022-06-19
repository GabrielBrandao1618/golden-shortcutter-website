import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'

import { copyToClipboard } from '../../lib/copyToClipboard'

type props = {
    customName: string;
    className?: string;
}

function CopyLink({ className, customName }: props) {
    const [copied, setCopied] = useState(false)
    useEffect(()=>{
        setCopied(false)
    }, [customName])
    return (
        <div className={className}>
            <p className="url-text">{window.location.href}getUrl/{customName}</p>
            <button onClick={e => {
                copyToClipboard(`${window.location.href}getUrl/${customName}`)
                setCopied(true)
            }}>
                {!copied ? (
                    <img src="/assets/icons/copy.svg" alt="Copiar texto" />
                ) : (
                    <img src="/assets/icons/check.svg" alt="Texto copiado!" />
                )}
            </button>
        </div>
    )
}

const StyledCopyLink = styled(CopyLink)`
    display:flex;
    flex-flow: row nowrap;
    align-items:center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, .3);
    border-radius: 8px;
    padding: 8px;
    gap:5px;

    button {
        border:none;
        border-radius: 8px;
        width: 40px;
        height:40px;
        padding:0;
        cursor:pointer;

        img{
            width:80%;
            height:80%;
        }
    }
`

export { StyledCopyLink as CopyLink }