import { Link } from 'react-router-dom'

const homeIcon = "https://i.etsystatic.com/22360457/r/il/447352/2199635638/il_570xN.2199635638_svz8.jpg"

const plusIcon = "https://static.vecteezy.com/system/resources/previews/000/567/102/original/additional-plus-icon-vector.jpg"

export default function Nav() {
    return (
        <nav className='Nav-global flex flex-col fixed p-4'>
            <Link to="/">
                <img className='w-16 rounded-xl mb-4' alt="D&D Logo" src={homeIcon}/>
            </Link>
            <Link to="/campaign/new">
                <img className='w-16 rounded-xl' alt="Plus Icon" src={plusIcon}/>
            </Link>
        </nav>
    )
}

