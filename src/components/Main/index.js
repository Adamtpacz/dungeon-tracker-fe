import { Routes, Route } from "react-router-dom"
import CampaignIndex from "../../pages/Campaign Index"
import CampaignShow from "../../pages/Campaign Show"

export default function Main() {
    return (
        <main>
            <h1>Main Component</h1>
            <Routes>
                <Route path='/' element={ <CampaignIndex /> } />
                <Route path='/campaign/:id' element={ <CampaignShow /> } />
            </Routes>
        </main>
    )
}