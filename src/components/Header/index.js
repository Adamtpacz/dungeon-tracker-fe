const bannerImage = "https://images.ctfassets.net/swt2dsco9mfe/1dQoOoGmRy9NMlAU2aEULd/e8a5f6134a5afba59b3a0cac3cf4f31d/tiamat-email.jpg?q=70"

export default function Header() {
    return (
        <header className="Header h-72 overflow-hidden">
            <img className="" alt="Banner" src={bannerImage}/>
        </header>
    )
}