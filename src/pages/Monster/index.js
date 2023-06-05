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
            <section className="flex flex-col items-center mx-6">
                <div className="border-2 border-black my-8 rounded-3xl p-8 flex flex-col bg-slate-200 mb-32">
                    <h1 className="text-5xl font-bold">{monster.name}</h1>
                    <ul className="list-disc list-inside"><span className="font-bold text-xl">Stats</span>
                        <li><strong>Size:</strong> {monster.size}</li>
                        <li><strong>Hit Points:</strong> {monster.hit_points}</li>
                        <li><strong>Armor Class:</strong> {monster.armor_class[0].value}</li>
                        <li><strong>Challenge Rating:</strong> {monster.challenge_rating}</li>
                        <li><strong>Exp Points:</strong> {monster.xp}</li>
                        <h2 className="font-bold text-3xl">Actions:</h2>
                        {monster.actions?.map((action) => {
                            return (
                                <div className="border-2 border-black m-2 p-2 rounded-md bg-slate-400" key={action.name}>
                                    <h2 className="font-bold text-xl">{action.name}</h2>
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