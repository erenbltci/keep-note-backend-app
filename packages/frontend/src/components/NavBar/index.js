import './index.scss'

import { Link } from 'react-router-dom'

function Navbar() {

    return (
        <nav>
            <ul>
                <Link to='/'>Add Note</Link>
                <Link to='/mynotes'>My Notes</Link>
            </ul>
        </nav>
    );

}

export default Navbar;
