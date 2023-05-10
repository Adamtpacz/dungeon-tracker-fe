import { useState } from 'react'

export default function CampaignCreate() {

    const [ newForm, setNewForm ] = useState({
        title: "",
        description: "",
        startLevel: null,
        endLevel: null,
        numOfPlayers: null,
        image: ""
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            
        } catch(err) {

        }
    }

    async function handleChange(e) {

    }

    return (
        <section>
            <h1>Campaign Create Page</h1>
            <form className='Campaign-form' onSubmit={ handleSubmit }>
                <input
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
                    placeholder="Starting Level"
                />
                <input
                    onChange={handleChange}
                    value={newForm.endLevel}
                    name="endLevel"
                    required
                    placeholder="Ending Level"
                />
                <input
                    onChange={handleChange}
                    value={newForm.numOfPlayers}
                    name="numOfPlayers"
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