import { getMonster } from "../../utilities/dnd-services"
import { useState, useEffect } from 'react'
export default function EncounterShow() {

    const [ monster, setMonster ] = useState({
        index: ""
    })
    const [ isLoading, setIsLoading ] = useState(true)

    // async function handleRequest() {
    //     try {
    //         const apiResponse = await getMonster(monster.index)
    //         setMonster(apiResponse)
    //         console.log(monster)
    //         setIsLoading(false)
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    
    // useEffect(() => {
    //     handleRequest()
    // }, [isLoading])
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMonster({ ...monster, [e.target.name]: e.target.value })
            const apiResponse = await getMonster(monster.index.toLowerCase())
            console.log(apiResponse)
        } catch(err) {
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
            <form className="" onSubmit={handleSubmit}>
                <input 
                onChange={handleChange}
                className="text-center m-2 border-2 border-neutral-950 p-1 rounded-lg" 
                placeholder="Monster Name"
                name="index"
                value={monster.index}
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
        <section className="flex flex-col items-center">
            <h1>Encounter Show Page</h1>
            <form className="" onSubmit={handleSubmit}>
                <input 
                onChange={handleChange}
                className="text-center m-2 border-2 border-neutral-950 p-1 rounded-lg" 
                placeholder="Monster Name"
                name="index"
                value={monster.index}
                />
                <button className="bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-20 rounded-lg">Add</button>
            </form>
        </section>
    )
}