import {Menu} from './Menu'
import { Link } from 'react-router'

export const PageNotFound = () => (
    <div>
        <h1>Are you drunk?</h1>
        <Link to="/" activeClassName="selected">
            Go Home
        </Link>
    </div>    
)