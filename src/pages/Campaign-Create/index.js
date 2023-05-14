import { useState } from 'react'
import { createCampaign } from '../../utilities/campaign-services'

export default function CampaignCreate() {

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
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        setNewForm({ ...newForm, [e.target.name]: e.target.value })
    }

    return (
        <section>
            <h1 className='text-3xl'>Create Campaign</h1>
            <form className='flex flex-col items-center' onSubmit={handleSubmit}>
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.title}
                    name="title"
                    required
                    placeholder="Enter your campaign's title"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.description}
                    name="description"
                    placeholder="Description"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.startLevel}
                    name="startLevel"
                    required
                    type="number"
                    placeholder="Starting Level"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.endLevel}
                    name="endLevel"
                    required
                    type="number"
                    placeholder="Ending Level"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.numOfPlayers}
                    name="numOfPlayers"
                    type="number"
                    placeholder="Numbers of Players"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.image}
                    name="image"
                    placeholder="Campaign Image URL"
                />
                <button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-32 rounded-lg hover:bg-slate-300 mb-40'>Create</button>
            </form>
        </section>
    )
}