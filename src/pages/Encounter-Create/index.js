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
        <section className='flex flex-col items-center mt-28 lg:mt-12'>
            <h1 className='text-3xl'>Create Encounter</h1>
            <form className='flex flex-col items-center w-5/6 lg:w-1/2 2xl:w-1/3' onSubmit={ handleSubmit }>
                <input
                    className='mt-10 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.name}
                    name="name"
                    required
                    placeholder="Enter your encounter's name"
                />
                <input
                    className='m-10 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
                    onChange={handleChange}
                    value={newForm.flavorText}
                    name="flavorText"
                    placeholder="Flavor Text"
                />
                <input
                    className='mb-10 border-2 border-neutral-950 p-2 rounded-lg w-full text-center'
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
                <button className='bg-primary mb-40 border-2 border-neutral-950 p-1 w-1/2 lg:w-1/4 h-16 rounded-lg hover:scale-110 text-2xl font-bold'>Create</button>
            </form>
        </section>
    )
}