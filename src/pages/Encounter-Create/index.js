import { useState } from 'react'
import { createEncounter } from '../../utilities/encounter-services'
import { useParams, useNavigate} from 'react-router'

export default function EncounterCreate() {

    const { id } = useParams()
    const navigate = useNavigate()
    console.log("campaign id:", id)
    
    const [newForm, setNewForm] = useState({
        name: "",
        flavorText: "",
        map: "",
        campaign: id
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await createEncounter(newForm, id)
            console.log("form data:", newForm)
            setNewForm({
                name: "",
                flavorText: "",
                map: "",
                campaign: id
            })
            navigate(`/campaign/${id}/encounters`)
        } catch (err) {
            console.log(err)
        }
    }

    function handleChange(e) {
        setNewForm({ ...newForm, [e.target.name]: e.target.value })
    }

    return (
        <section>
            <h1 className='text-3xl mb-6'>Create Encounter</h1>
            <form className='flex flex-col items-center' onSubmit={ handleSubmit }>
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.name}
                    name="name"
                    required
                    placeholder="Enter your encounter's name"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.flavorText}
                    name="flavorText"
                    placeholder="Flavor Text"
                />
                <input
                    className='m-2 border-2 border-neutral-950 p-2 rounded-lg w-1/3 text-center'
                    onChange={handleChange}
                    value={newForm.map}
                    name="map"
                    placeholder="Map Image URL"
                />
                <input
                    onChange={handleChange}
                    value={newForm.campaign}
                    name="campaign"
                    type="hidden"
                />
                <button className='bg-slate-400 m-2 border-2 border-neutral-950 p-1 w-32 rounded-lg hover:bg-slate-300 mb-64'>Create</button>
            </form>
        </section>
    )
}