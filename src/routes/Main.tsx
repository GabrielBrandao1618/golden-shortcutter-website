import {Route, BrowserRouter, Routes} from 'react-router-dom'

import { Admin } from '../pages/Admin'
import {Home} from '../pages/Home'
import {Redirect} from '../pages/Redirect'

function MainRoutes() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/getUrl/:name" element={<Redirect/>} />
            <Route path="/admin/:name" element={<Admin />}/>
        </Routes>
      </BrowserRouter>
    )
}
export {MainRoutes as Router}