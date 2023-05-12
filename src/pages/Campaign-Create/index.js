import { useState } from 'react'
import { createCampaign } from '../../utilities/campaign-services'

export default function CampaignCreate() {

    const [ newForm, setNewForm ] = useState({
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
        } catch(err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        setNewForm({ ...newForm, [e.target.name]: e.target.value })
    }

    return (
        <section>
            <h1>Campaign Create Page</h1>
            <form className='Campaign-form' onSubmit={ handleSubmit }>
                <input
                    className=''
                    onChange={handleChange}
                    value={newForm.title}
                    name="title"
                    required
                    placeholder="Enter your campaign's title"
                />
                <input
                    onChange={handleChange}
                    value={newForm.description}
                    name="description"
                    placeholder="Description"
                />
                <input
                    onChange={handleChange}
                    value={newForm.startLevel}
                    name="startLevel"
                    required
                    type="number"
                    placeholder="Starting Level"
                />
                <input
                    onChange={handleChange}
                    value={newForm.endLevel}
                    name="endLevel"
                    required
                    type="number"
                    placeholder="Ending Level"
                />
                <input
                    onChange={handleChange}
                    value={newForm.numOfPlayers}
                    name="numOfPlayers"
                    type="number"
                    placeholder="Numbers of Players"
                />
                <input
                    onChange={handleChange}
                    value={newForm.image}
                    name="image"
                    placeholder="Campaign Image URL"
                />
                <button>Create</button>
            </form>
        </section>
    )
}