import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { allEncounters } from '../../utilities/encounter-services'
import { getCampaign } from '../../utilities/campaign-services'
import { Link } from 'react-router-dom'

const defaultImage = "https://cdn.shopify.com/s/files/1/0247/5206/2530/articles/Shadow_Map_2000x.jpg"

export default function EncounterIndex() {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [encounters, setEncounters] = useState(null)
    const [campaign, setCampaign] = useState([])

    async function handleRequest() {
        try {
            const apiResponse = await allEncounters(id)
            const campaignData = await getCampaign(id)
            setCampaign(campaignData)
            setEncounters(apiResponse)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const loaded = () => {
        return encounters?.map((encounter) => {
            if (encounter.campaign === id) {
                return (
                    <div key={encounter._id} className='border-2 border-black flex flex-col items-center rounded-3xl p-8 pb-1 bg-slate-200 mb-4'>
                        <Link to={`/encounter/${encounter._id}`}>
                            <h1 className='font-bold text-2xl mb-4'>{encounter.name}</h1>
                            <p className='mb-4'><strong>Flavor Text:</strong> {encounter.flavorText}</p>
                            <img className="border-2 border-black rounded-3xl hover:scale-105 mb-4" alt="Encounter Battle Map" src={encounter.map || defaultImage} />
                        </Link>
                    </div>
                )
            }
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1 className='text-4xl mb-4 font-semibold'>Encounters for <span className='text-cyan-700 font-bold'>{campaign.title}</span></h1>
            <div className='flex justify-center mb-4'>
                <Link to={`/campaign/${id}/encounters/new`}>
                    <button className='bg-slate-400 hover:bg-slate-300 border-2 rounded-lg border-black p-4 h-16 text-xl font-bold'>Add Encounter</button>
                </Link>
            </div>
            <section className='flex flex-col justify-center items-end mx-6'>
                {isLoading ? loading() : loaded()}
            </section>
        </div>

    )
}