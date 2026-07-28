const navItems = [
    { label: "Overview", icon: "/assets/home.svg" },
    { label: "Patients", icon: "/assets/group.svg", active: true },
    { label: "Schedule", icon: "/assets/calendar.svg" },
    { label: "Message", icon: "/assets/chat.svg" },
    { label: "Transactions", icon: "/assets/creditcard.svg" },
];

function Header() {
    return (
        <header className="mx-4 mt-4 flex items-center justify-between rounded-[70px] bg-white px-6 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-2">
                <img src="/assets/logo.svg" alt="Tech.Care" className="h-8 w-auto" />
            </div>

            <nav className="flex items-center gap-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className={`flex items-center gap-2 rounded-[41px] px-4 py-2.5 text-sm font-bold transition-colors ${
                            item.active
                                ? "bg-primary text-dark"
                                : "text-dark hover:bg-gray-50"
                        }`}
                    >
                        <img
                            src={item.icon}
                            alt=""
                            className={`h-4 w-4 ${item.active ? "brightness-0" : ""}`}
                        />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <img
                        src="/assets/avatar.png"
                        alt="Dr. Jose Simmons"
                        className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="text-left">
                        <p className="text-sm font-bold text-dark">Dr. Jose Simmons</p>
                        <p className="text-xs text-gray-text">General Practitioner</p>
                    </div>
                </div>

                <div className="h-11 w-px bg-gray-200" />

                <button type="button" className="p-1">
                    <img src="/assets/gear.svg" alt="Settings" className="h-5 w-5" />
                </button>

                <button type="button" className="p-1">
                    <img src="/assets/elipses.svg" alt="Menu" className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}

export default Header;
