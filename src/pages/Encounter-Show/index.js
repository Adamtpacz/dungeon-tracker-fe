import { getMonster } from "../../utilities/dnd-services"
import { useState, useEffect } from 'react'
export default function EncounterShow() {

    const [ monster, setMonster ] = useState({
        index: "goblin"
    })
    const [ isLoading, setIsLoading ] = useState(true)

    async function handleRequest() {
        try {
            const apiResponse = await getMonster(monster.index)
            setMonster(apiResponse)
            console.log(monster)
            setIsLoading(false)
        } catch(err) {
            console.log(err)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await getMonster(monster)
            setMonster({
                index: ""
            })
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const loaded = () => {
        return (
            <section className="flex flex-col items-center">
            <h1>Encounter Show Page</h1>
            <form className="">
                <input 
                className="text-center m-2 border-2 border-neutral-950 p-1 rounded-lg" 
                placeholder="Monster Name"
                name="index"
                />
                <button className="bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-20 rounded-lg">Add</button>
            </form>
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