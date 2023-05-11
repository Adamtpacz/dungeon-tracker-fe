import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCampaign, updateCampaign } from '../../utilities/campaign-services'

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
            console.log("Campaign to edit:", campaignToEdit)
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
            // console.log(editForm)
            const updatedCampaign = await updateCampaign(id, editForm)

            if (updatedCampaign._id) {
                // console.log(updatedPerson)
                navigate(`/campaign/${id}`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            navigate(`/campaign/${id}/edit`)
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