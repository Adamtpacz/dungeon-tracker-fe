import { useState } from 'react'
import { useNavigate } from 'react-router'
import { createCampaign } from '../../utilities/campaign-services'

export default function CampaignCreate() {

    const navigate = useNavigate()

    const [newForm, setNewForm] = useState({
        title: "",
        description: "",
        startLevel: "",
        endLevel: "",
        numOfPlayers: "",
        image: ""
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await createCampaign(newForm)
            setNewForm({
                title: "",
                description: "",
                startLevel: "",
                endLevel: "",
                numOfPlayers: "",
                image: ""
            })
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        setNewForm({ ...newForm, [e.target.name]: e.target.value })
    }

    return (
        <section className='flex flex-col items-center mt-12'>
            <h1 className='text-3xl'>Create Campaign</h1>
            <form className='flex flex-col items-center w-5/6 lg:w-1/2 2xl:w-1/3' onSubmit={handleSubmit}>
                <input
                    className='my-8 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.title}
                    name="title"
                    required
                    placeholder="Enter your campaign's title"
                />
                <input
                    className='mb-8 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.description}
                    name="description"
                    placeholder="Description"
                />
                <input
                    className='mb-8 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.startLevel}
                    name="startLevel"
                    required
                    type="number"
                    placeholder="Starting Level"
                />
                <input
                    className='mb-8 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.endLevel}
                    name="endLevel"
                    required
                    type="number"
                    placeholder="Ending Level"
                />
                <input
                    className='mb-8 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.numOfPlayers}
                    name="numOfPlayers"
                    type="number"
                    placeholder="Numbers of Players"
                />
                <input
                    className='mb-8 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.image}
                    name="image"
                    placeholder="Campaign Image URL"
                />
                <button className='bg-primary mb-8 border-2 border-neutral-950 p-1 w-1/2 lg:w-1/4 h-16 rounded-lg hover:scale-110 text-2xl font-bold'>Create</button>
            </form>
        </section>
    )
}