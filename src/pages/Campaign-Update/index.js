import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCampaign, updateCampaign, deleteCampaign } from '../../utilities/campaign-services'

export default function CampaignUpdate() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [campaign, setCampaign] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        startLevel: "",
        endLevel: "",
        numOfPlayers: "",
        image: ""
    })

    async function handleRequest() {
        try {
            const campaignToEdit = await getCampaign(id)
            setCampaign(campaignToEdit)
            const { title, description, startLevel, endLevel, numOfPlayers, image } = campaignToEdit
            setEditForm({ title, description, startLevel, endLevel, numOfPlayers, image })
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
    }, [isLoading])

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const updatedCampaign = await updateCampaign(id, editForm)

            if (updatedCampaign._id) {
                navigate(`/campaign/${id}`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            navigate(`/campaign/${id}/edit`)
        }
    }

    async function handleDelete() {
        try {
            const delResponse = await deleteCampaign(id)
            console.log(delResponse)

            if (delResponse._id) {
                navigate('/')
            } else {
                throw new Error("Something went wrong")
            }
        } catch (err) {
            console.log(err)
            navigate(`/campaign/${id}`)
        }
    }

    const loaded = () => {
        return (
            <section className='flex flex-col items-center mt-12'>
                <h1 className='text-3xl'>Edit details for {campaign.title}</h1>
                <form className='flex flex-col items-center w-5/6' onSubmit={handleSubmit}>
                    <label className='text-xl'>Title</label>
                    <input
                        className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                        onChange={handleChange}
                        value={editForm.title}
                        name="title"
                        required
                        placeholder="Enter your campaign's title"
                    />
                    <label className='text-xl'>Description</label>
                    <input
                        className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                        onChange={handleChange}
                        value={editForm.description}
                        type="textarea"
                        name="description"
                        placeholder="Description"
                    />
                    <label className='text-xl'>Starting Level</label>
                    <input
                        className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                        onChange={handleChange}
                        value={editForm.startLevel}
                        name="startLevel"
                        required
                        type="number"
                        placeholder="Starting Level"
                    />
                    <label className='text-xl'>Ending Level</label>
                    <input
                        className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                        onChange={handleChange}
                        value={editForm.endLevel}
                        name="endLevel"
                        required
                        type="number"
                        placeholder="Ending Level"
                    />
                    <label className='text-xl'>Number of Players</label>
                    <input
                        className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                        onChange={handleChange}
                        value={editForm.numOfPlayers}
                        name="numOfPlayers"
                        type="number"
                        placeholder="Numbers of Players"
                    />
                    <label className='text-xl'>Campaign Image URL</label>
                    <input
                        className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                        onChange={handleChange}
                        value={editForm.image}
                        name="image"
                        placeholder="Campaign Image URL"
                    />
                    <button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-1/2 h-16 rounded-lg hover:bg-slate-300 text-2xl font-bold'>Submit</button>
                </form>
                <div className='flex justify-center w-5/6'>
                    <button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-1/2 h-16 rounded-lg hover:bg-slate-300 text-2xl font-bold' onClick={handleDelete}>Delete</button>
                </div>
            </section>
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