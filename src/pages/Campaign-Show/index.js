import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getCampaign } from '../../utilities/campaign-services'
import { Link } from 'react-router-dom'

const defaultImage = "https://t3.ftcdn.net/jpg/05/47/69/40/360_F_547694087_0CoRsUGjizVDmt3ev8q2nwiR8BDYRWxJ.jpg"

export default function CampaignShow() {

    const { id } = useParams()
    const [ campaign, setCampaign ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)

    async function handleRequest() {
        try {
            const campaignData = await getCampaign(id)
            console.log(campaignData)
            setCampaign(campaignData)
            console.log("Current campaign:", campaign)
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
            <div className='Campaign-details flex flex-col items-center'>
                <h1>Campaign Show Page</h1>
                <h2>{campaign.title}</h2>
                <p>Description: {campaign.description}</p>
                <p>Starting Level: {campaign.startLevel}</p>
                <p>Ending Level: {campaign.startLevel}</p>
                <p>Number of Players: {campaign.numOfPlayers}</p>
                <img className='w-96' alt="Campaign Art" src={campaign.image || defaultImage}/>
                <Link to={`/campaign/${campaign._id}/encounters`}><button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1'>Go to Encounters</button></Link>
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
            { isLoading ? loading() : loaded() }
        </section>
    )
}