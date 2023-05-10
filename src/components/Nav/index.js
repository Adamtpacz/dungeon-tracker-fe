import { Link } from 'react-router-dom'

const homeIcon = "https://img.icons8.com/color/12x/dungeons-and-dragons.png"

export default function Nav(props) {
    return (
        <nav className='Nav-global'>
            <Link to="/">
                <img alt="D&D Logo" src={homeIcon}/>
            </Link>
            <p>Dungeon Tracker</p>
        </nav>
    )
}

