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
                <div key={campaign._id} className='border-2 border-black flex flex-col justify-center items-center rounded-3xl p-4 pb-1 bg-slate-200 mb-8 w-fit'>
                    <Link to={`/campaign/${campaign._id}`}>
                        <h1 className='font-bold text-2xl mb-4'>{campaign.title}</h1>
                        <img alt="Campaign Graphic" className="border-2 border-black rounded-3xl hover:scale-105 mb-4 h-96" src={campaign.image || defaultImage}/>
                    </Link>
                    <Link to={`/campaign/${campaign._id}/edit`}><button className='bg-slate-400 hover:bg-slate-300 m-2 border-2 rounded-lg border-neutral-950 p-1 w-16'>Edit</button></Link>
                </div>
            )
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section className='grid gap-4 grid-cols-4 px-72 mb-0'>
            {isLoading ? loading() : loaded()}
        </section>
    )
}