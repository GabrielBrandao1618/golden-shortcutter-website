import styled from 'styled-components'

import { copyToClipboard } from '../../lib/copyToClipboard'

type props = {
    customName: string;
    className?: string;
}

function CopyLink({ className, customName }: props) {
    return (
        <div className={className}>
            <p className="url-text">{window.location.href}{customName}</p>
            <button onClick={e => copyToClipboard(`${window.location.href}${customName}`)}>
                <img src="/assets/icons/copy.svg" alt="Copiar texto" />
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