import { useState, useEffect } from 'react'
import { allCampaigns } from '../../utilities/campaign-services'
import { Link } from 'react-router-dom'

export default function CampaignIndex(props) {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ campaigns, setCampaigns ] = useState(null)

    async function handleRequest() {
        try {
            const apiResponse = await allCampaigns()
            setCampaigns(apiResponse)
            setIsLoading(false)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const loaded = () => {
        return campaigns?.map((campaign) => {
            return (
                <div key={campaign._id} className='Campaign-card'>
                    <Link to={`/campaign/${campaign._id}`}>
                        <h1>{campaign.title}</h1>
                        <img alt="Campaign Graphic" className="Campaign-image" src={campaign.image}/>
                    </Link>
                </div>
            )
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section className='Campaign-list'>
            {isLoading ? loading() : loaded()}
        </section>
    )
}