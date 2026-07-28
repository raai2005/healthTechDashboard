const navItems = [
    { label: "Overview", icon: "/assets/home.svg" },
    { label: "Patients", icon: "/assets/group.svg", active: true },
    { label: "Schedule", icon: "/assets/calendar.svg" },
    { label: "Message", icon: "/assets/chat.svg" },
    { label: "Transactions", icon: "/assets/creditcard.svg" },
];

function Header() {
    return (
        <header className="mx-2 mt-3 rounded-[32px] bg-white px-3 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)] sm:mx-4 sm:mt-4 sm:rounded-[40px] sm:px-4 lg:rounded-[70px] lg:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center justify-between gap-3">
                    <img src="/assets/logo.svg" alt="Tech.Care" className="h-7 w-auto sm:h-8" />

                    <div className="flex items-center gap-2 lg:hidden">
                        <img
                            src="/assets/avatar.png"
                            alt="Dr. Jose Simmons"
                            className="h-9 w-9 rounded-full object-cover"
                        />
                        <button type="button" className="p-1">
                            <img src="/assets/gear.svg" alt="Settings" className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <nav className="scrollbar-thin flex items-center gap-1 overflow-x-auto pb-1 lg:overflow-visible lg:pb-0">
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            className={`flex shrink-0 items-center gap-2 rounded-[41px] px-3 py-2 text-xs font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-sm ${
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
                            <span className="whitespace-nowrap">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
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
            </div>
        </header>
    );
}

export default Header;
