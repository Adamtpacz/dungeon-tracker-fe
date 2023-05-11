import { useState, useEffect } from 'react'
import { allCampaigns } from '../../utilities/campaign-services'
import { Link } from 'react-router-dom'

const defaultImage = "https://t3.ftcdn.net/jpg/05/47/69/40/360_F_547694087_0CoRsUGjizVDmt3ev8q2nwiR8BDYRWxJ.jpg"

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
                        <img alt="Campaign Graphic" className="Campaign-image" src={campaign.image || defaultImage}/>
                    </Link>
                    <Link to={`/campaign/${campaign._id}/edit`}><button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1'>Edit</button></Link>
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