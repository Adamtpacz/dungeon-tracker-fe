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
                navigate(`/`)
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
            <section>
                <h1>Edit page for {campaign.title}</h1>
                <form className='Campaign-form' onSubmit={ handleSubmit }>
                <input
                    className='m-2 border-2 border-neutral-950 p-1'
                    onChange={handleChange}
                    value={editForm.title}
                    name="title"
                    required
                    placeholder="Enter your campaign's title"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-1'
                    onChange={handleChange}
                    value={editForm.description}
                    name="description"
                    placeholder="Description"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-1'
                    onChange={handleChange}
                    value={editForm.startLevel}
                    name="startLevel"
                    required
                    type="number"
                    placeholder="Starting Level"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-1'
                    onChange={handleChange}
                    value={editForm.endLevel}
                    name="endLevel"
                    required
                    type="number"
                    placeholder="Ending Level"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-1'
                    onChange={handleChange}
                    value={editForm.numOfPlayers}
                    name="numOfPlayers"
                    type="number"
                    placeholder="Numbers of Players"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-1'
                    onChange={handleChange}
                    value={editForm.image}
                    name="image"
                    placeholder="Campaign Image URL"
                />
                <button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1'>Submit</button>
            </form>
            <div className='flex justify-center'>
                <button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-20' onClick={handleDelete}>Delete</button>
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