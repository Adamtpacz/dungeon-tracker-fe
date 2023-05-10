import { Routes, Route } from "react-router-dom"
import CampaignIndex from "../../pages/Campaign-Index"
import CampaignShow from "../../pages/Campaign-Show"
import CampaignCreate from "../../pages/Campaign-Create"

export default function Main() {
    return (
        <main>
            <h1>Dungeon Tracker</h1>
            <Routes>
                <Route path='/' element={ <CampaignIndex /> } />
                <Route path='/campaign/:id' element={ <CampaignShow /> } />
                <Route path='/campaign/new' element={ <CampaignCreate /> } />
            </Routes>
        </main>
    )
}