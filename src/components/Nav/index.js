import { Link } from 'react-router-dom'

const homeIcon = "https://i.etsystatic.com/22360457/r/il/447352/2199635638/il_570xN.2199635638_svz8.jpg"

const plusIcon = "https://static.vecteezy.com/system/resources/previews/000/567/102/original/additional-plus-icon-vector.jpg"

export default function Nav() {
    return (
        <nav className='border-y-2 border-black flex mt-2 justify-between items-center p-2 sticky top-0 bg-slate-200'>
            <Link to="/">
                <img className='border-2 border-black hover:scale-110 w-20 rounded-xl' alt="D&D Logo" src={homeIcon}/>
            </Link>
            <h1 className="font-bold text-4xl">Dungeon Tracker</h1>
            <Link to="/campaign/new">
                <img className='border-2 border-black hover:scale-110 w-20 rounded-xl' alt="Plus Icon" src={plusIcon}/>
            </Link>
        </nav>
    )
}

