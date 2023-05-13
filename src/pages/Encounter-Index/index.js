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
    const [campaign, setCampaign] = useState(null)

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
                    <Link to={`/encounter/${encounter._id}`}>
                        <div key={encounter._id} className='Campaign-card'>
                            <h1 className='font-bold text-2xl'>{encounter.name}</h1>
                            <p><strong>Flavor Text:</strong> {encounter.flavorText}</p>
                            <img alt="Encounter Battle Map" className="Campaign-image" src={encounter.map || defaultImage} />
                        </div>
                    </Link>
                )
            }
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {/* <h1 className='font-bold text-2xl'>Encounters for <span className='text-red-700'>{campaign.title}</span></h1> */}
            <section className='Campaign-list my-0'>
                {isLoading ? loading() : loaded()}
            </section>
            <div className='flex justify-center my-8'>
                <Link to={`/campaign/${id}/encounters/new`}><button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1'>Add Encounter</button></Link>
            </div>
        </div>

    )
}