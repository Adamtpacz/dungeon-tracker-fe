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
                    <div key={encounter._id} className='border-2 border-black flex flex-col items-center rounded-3xl p-8 pb-1 bg-secondary mb-4'>
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
            <h1 className='text-4xl mt-10 mb-4 font-semibold'>Encounters for <span className='text-lime-800 font-bold'>{campaign.title}</span></h1>
            <div className='flex justify-center mb-10'>
                <Link to={`/campaign/${id}/encounters/new`}>
                    <button className='bg-primary hover:scale-110 border-2 rounded-lg border-black p-4 h-16 text-xl font-bold'>Add Encounter</button>
                </Link>
            </div>
            <section className='flex flex-col justify-center mx-6 lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-x-4'>
                {isLoading ? loading() : loaded()}
            </section>
        </div>

    )
}