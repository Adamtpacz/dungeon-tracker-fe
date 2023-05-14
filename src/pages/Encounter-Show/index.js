import { getMonster } from "../../utilities/dnd-services"
import { getEncounter, updateEncounter } from "../../utilities/encounter-services"
import { updateCampaign } from "../../utilities/campaign-services"
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Link } from "react-router-dom"

const defaultImage = "https://cdn.shopify.com/s/files/1/0247/5206/2530/articles/Shadow_Map_2000x.jpg"

export default function EncounterShow() {

    const navigate = useNavigate()
    const { id } = useParams()
    const [ monster, setMonster ] = useState({ index: "" })
    const [ isLoading, setIsLoading ] = useState(true)
    const [ encounter, setEncounter ] = useState()

    async function handleRequest() {
        try {
            const apiResponse = await getEncounter(id)
            setEncounter(apiResponse)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMonster({ ...monster, [e.target.name]: e.target.value })
            const monsterIndex = monster.index.toLowerCase()
            encounter.monsters.push(monsterIndex)            
            const updatedEncounter = await updateEncounter(id, {monsters: encounter.monsters})

            if(updatedEncounter._id) {
                navigate(`/encounter/${id}`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            console.log(err)
            navigate('/')
        }
    }

    function handleChange(e) {
        setMonster({ ...monster, [e.target.name]: e.target.value })
    }

    const loaded = () => {
        return (
            <section className="flex flex-col items-center">
                <h1>Encounter Show Page</h1>
                <div className="grid grid-cols-5 grid-rows-1 w-full h-64 m-4">
                    <div className="border-2 border-black m-4 rounded-2xl col-start-1 col-end-4 p-8">
                        <h1 className='font-bold text-2xl'>{encounter.name}</h1>
                        <p><strong>Flavor Text:</strong> {encounter.flavorText}</p>
                    </div>
                    <div className="border-2 border-red-700 m-4 rounded-2xl col-start-4 col-end-6 flex p-4 justify-center">
                        <img alt="Encounter Battle Map" className="" src={encounter.map || defaultImage} />
                    </div>
                </div>
                <form className="flex flex-col items-center w-80" onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        className="text-center m-2 border-2 border-neutral-950 p-1 rounded-lg w-full"
                        placeholder="Monster Name"
                        name="index"
                        value={monster.index}
                    />
                    <button className="bg-slate-400 m-2 border-2 border-neutral-950 p-2 rounded-lg">Add Monster</button>
                </form>
                <div className="border-2 border-black w-1/2 h-16 my-8 flex justify-center">
                    {encounter.monsters?.map((monster) => {
                        return (
                            <Link to={`/encounter/${id}/${monster}`}><div key={monster} className="m-2 border-2 border-black p-2">{monster.toUpperCase()}</div></Link>
                        )
                    })}
                </div>
            </section>
        )
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            {isLoading ? loading() : loaded()}
        </section>
    )
}