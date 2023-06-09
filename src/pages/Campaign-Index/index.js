import { useState, useEffect } from 'react'
import { allCampaigns } from '../../utilities/campaign-services'
import { Link } from 'react-router-dom'

const defaultImage = "https://t3.ftcdn.net/jpg/05/47/69/40/360_F_547694087_0CoRsUGjizVDmt3ev8q2nwiR8BDYRWxJ.jpg"

export default function CampaignIndex() {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ campaigns, setCampaigns ] = useState(null)

    async function handleRequest() {
        try {
            const apiResponse = await allCampaigns()
            setCampaigns(apiResponse)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const loaded = () => {
        return campaigns?.map((campaign) => {
            return (
                <div key={campaign._id} className='border-2 border-black flex flex-col justify-center items-center rounded-3xl py-4 my-4 bg-slate-200 w-full'>
                    <Link to={`/campaign/${campaign._id}`}>
                        <h1 className='font-bold text-2xl mb-4'>{campaign.title}</h1>
                        <img alt="Campaign Graphic" className="border-2 border-black rounded-3xl hover:scale-105 mb-4 h-96" src={campaign.image || defaultImage} />
                    </Link>
                    <div className='w-full flex justify-center p-2'>
                        <Link to={`/campaign/${campaign._id}/edit`}><button className='bg-slate-400 hover:bg-slate-300 border-2 rounded-lg border-black w-32 h-12 text-xl font-bold'>Edit</button></Link>
                    </div>
                </div>
            )
        })
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section className='flex flex-col justify-center items-center mx-6 lg:grid lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 lg:gap-x-4'>
            {isLoading ? loading() : loaded()}
        </section>
    )
}