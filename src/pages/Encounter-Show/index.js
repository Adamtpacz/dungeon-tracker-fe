import { getMonster } from "../../utilities/dnd-services"
import { getEncounter } from "../../utilities/encounter-services"
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

const defaultImage = "https://cdn.shopify.com/s/files/1/0247/5206/2530/articles/Shadow_Map_2000x.jpg"

export default function EncounterShow() {

    const { id } = useParams()
    const [monster, setMonster] = useState({ index: "" })
    const [isLoading, setIsLoading] = useState(true)
    const [encounter, setEncounter] = useState()

    async function handleRequest() {
        try {
            const apiResponse = await getEncounter(id)
            setEncounter(apiResponse)
            // console.log("encounter:", encounter)
            // console.log("monsters:", encounter.monsters)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMonster({ ...monster, [e.target.name]: e.target.value })
            const apiResponse = await getMonster(monster.index.toLowerCase())
            console.log(apiResponse)
        } catch (err) {
            console.log(err)
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
                        return <div className="m-4">{monster}</div>
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