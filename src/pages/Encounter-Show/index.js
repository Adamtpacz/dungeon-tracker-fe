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
                <div className="lg:flex lg:justify-center">
                    <div className="border-2 border-black rounded-3xl p-8 m-4 bg-secondary flex flex-col lg:w-1/3">
                        <h1 className='font-bold text-2xl mb-4'>{encounter.name}</h1>
                        <p><strong>Flavor Text:</strong> {encounter.flavorText}</p>
                    </div>
                    <div className="border-2 border-black rounded-3xl p-6 m-4 bg-secondary">
                        <h2 className="font-bold text-2xl mb-4">Encounter Map</h2>
                        <img alt="Encounter Battle Map" className="w-96 h-fit rounded-3xl border-2 border-black" src={encounter.map || defaultImage} />
                    </div>
                </div>
                <form className="flex flex-col items-center w-5/6 lg:w-1/2 2xl:w-2/5" onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        className="text-center m-2 border-2 border-neutral-950  p-2 rounded-lg w-full"
                        placeholder="Monster Name"
                        name="index"
                        value={monster.index}
                    />
                    <button className="bg-primary hover:scale-110 m-2 border-2 border-neutral-950 p-3 rounded-lg text-lg font-bold">Add Monster</button>
                </form>
                <div className="mt-4 grid gap-2 grid-cols-3 lg:flex lg:flex-wrap lg:w-1/2 lg:justify-center 2xl:w-2/5">
                    {encounter.monsters?.map((monster) => {
                        return (
                            <Link to={`/encounter/${id}/${monster}`}><div key={monster} className="bg-secondary hover:scale-110 border-2 border-black mx-2 mb-2 h-24 w-28 text-center font-bold rounded-lg flex justify-center items-center">{monster.toUpperCase()}</div></Link>
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