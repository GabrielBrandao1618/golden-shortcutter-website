import styled from 'styled-components'

import {copyToClipboard} from '../../lib/copyToClipboard'

type props = {
    customName: string;
    className?: string;
}

function CopyLink({className, customName}:props){
    return (
        <div className={className}>
            <p className="url-text">{window.location.href}{customName}</p>
            <button onClick={e => copyToClipboard(`${window.location.href}${customName}`)}>Copy to clipboard</button>
        </div>
    )
}

const StyledCopyLink = styled(CopyLink)``

export {StyledCopyLink as CopyLink}