import {Route, BrowserRouter, Routes} from 'react-router-dom'

import {Home} from './Home'
import {Redirect} from './Redirect'

function RootRouter() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/getUrl/:name" element={<Redirect/>} />
        </Routes>
      </BrowserRouter>
    )
}
export {RootRouter as Router}