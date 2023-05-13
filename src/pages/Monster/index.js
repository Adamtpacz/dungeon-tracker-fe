import { useParams } from "react-router"
import { useState, useEffect } from 'react'
import { getMonster } from "../../utilities/dnd-services"

export default function Monster() {

    const { monsterIndex } = useParams()
    // console.log(monsterIndex)

    const [monster, setMonster] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    async function handleRequest() {
        try {
            const apiResponse = await getMonster(monsterIndex)
            setMonster(apiResponse)
            console.log(apiResponse)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const loaded = () => {
        return (
            <section className="flex flex-col items-center">
                <h1>Monster Details Page</h1>
                <div className="border-2 border-black w-1/2 my-8 rounded-3xl p-8 flex flex-col">
                    <h1 className="text-2xl font-bold">{monster.name}</h1>
                    <ul className="list-disc list-inside"><span className="font-bold text-xl">Stats</span>
                        <li>Size: {monster.size}</li>
                        <li>Hit Points: {monster.hit_points}</li>
                        <li>Armor Class: {monster.armor_class[0].value}</li>
                        <li>Challenge Rating: {monster.challenge_rating}</li>
                        <li>Exp Points: {monster.xp}</li>
                        <li>Actions:</li>
                        {monster.actions?.map((action) => {
                            return (
                                <div className="border-2 border-black m-2 p-2 rounded-md" key={action.name}>
                                    {action.desc}
                                </div>
                            )
                        })}
                    </ul>
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