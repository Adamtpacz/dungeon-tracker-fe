import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getCampaign } from '../../utilities/campaign-services'
import { Link } from 'react-router-dom'

const defaultImage = "https://t3.ftcdn.net/jpg/05/47/69/40/360_F_547694087_0CoRsUGjizVDmt3ev8q2nwiR8BDYRWxJ.jpg"

export default function CampaignShow() {

    const { id } = useParams()
    const [campaign, setCampaign] = useState()
    const [isLoading, setIsLoading] = useState(true)

    async function handleRequest() {
        try {
            const campaignData = await getCampaign(id)
            setCampaign(campaignData)
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
            <div className='flex justify-center'>
                <div className='border-2 border-black rounded-3xl p-8 m-4 bg-slate-200'>
                    <img className='w-96 h-full rounded-3xl border-2 border-black' alt="Campaign Art" src={campaign.image || defaultImage} />
                </div>
                <div className='border-2 border-black rounded-3xl h-fit p-8 m-4 bg-slate-200 flex flex-col'>
                    <h2 className='text-3xl'>{campaign.title}</h2>
                    <p><strong>Description:</strong> {campaign.description}</p>
                    <p><strong>Starting Level:</strong> {campaign.startLevel}</p>
                    <p><strong>Ending Level:</strong> {campaign.startLevel}</p>
                    <p><strong>Number of Players:</strong> {campaign.numOfPlayers}</p>
                    <Link className='flex justify-center' to={`/campaign/${campaign._id}/encounters`}><button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1 rounded-lg'>Go to Encounters</button></Link>
                </div>
            </div>
        )
    }

    const loading = () => {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <section>
            {isLoading ? loading() : loaded()}
        </section>
    )
}