import { Link } from 'react-router-dom'

const homeIcon = "https://img.icons8.com/color/12x/dungeons-and-dragons.png"

const plusIcon = "https://static.vecteezy.com/system/resources/previews/000/567/102/original/additional-plus-icon-vector.jpg"

export default function Nav() {
    return (
        <nav className='Nav-global flex flex-col fixed m-0 text-white shadow-lg'>
            <Link to="/">
                <img alt="D&D Logo" src={homeIcon}/>
            </Link>
            <Link to="/campaign/new">
                <img alt="Plus Icon" src={plusIcon}/>
            </Link>
        </nav>
    )
}

