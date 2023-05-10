import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getCampaign } from '../../utilities/campaign-services'

export default function CampaignShow() {

    const { id } = useParams()
    // console.log("documentId:", id)
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
            <div className='Campaign-details'>
                <h1>Campaign Show Page</h1>
                <h2>{campaign.title}</h2>
                <p>Description: {campaign.description}</p>
                <p>Starting Level: {campaign.startLevel}</p>
                <p>Ending Level: {campaign.startLevel}</p>
                <p>Number of Players: {campaign.numOfPlayers}</p>
                <img alt="Campaign Art" src={campaign.image}/>
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