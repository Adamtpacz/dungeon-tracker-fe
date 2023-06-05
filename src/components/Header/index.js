const bannerImage = "https://images.squarespace-cdn.com/content/v1/5b47bb08f8370a85913c511a/1585289546773-TRHH538SP1HR05O2IPVZ/D%26D+Page+Header.png?format=1000w"

export default function Header() {
    return (
        <header className="p-1">
            <img className="border-2 border-black rounded-2xl" alt="Banner" src={bannerImage}/>
        </header>
    )
}