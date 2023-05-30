const bannerImage = "https://images.squarespace-cdn.com/content/v1/5b47bb08f8370a85913c511a/1585289546773-TRHH538SP1HR05O2IPVZ/D%26D+Page+Header.png?format=1000w"

export default function Header() {
    return (
        <header className="h-72 px-4 py-4">
            <img className="border-4 border-black h-full w-full rounded-3xl" alt="Banner" src={bannerImage}/>
        </header>
    )
}