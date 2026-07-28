function MoreIcon() {
    return (
        <svg width="18" height="4" viewBox="0 0 18 4" fill="none" aria-hidden="true">
            <circle cx="2" cy="2" r="2" fill="#072635" />
            <circle cx="9" cy="2" r="2" fill="#072635" />
            <circle cx="16" cy="2" r="2" fill="#072635" />
        </svg>
    );
}

function Sidebar({ patients, selectedPatient, onSelect, inDrawer = false }) {
    return (
        <aside
            className={`flex w-full flex-col overflow-hidden bg-white ${
                inDrawer ? "h-full rounded-none" : "rounded-3xl lg:w-[417px] lg:shrink-0"
            }`}
        >
            {!inDrawer && (
                <div className="flex shrink-0 items-center justify-between px-4 pt-5 pb-4 sm:px-5">
                    <h2 className="text-xl font-extrabold text-dark sm:text-2xl">Patients</h2>
                    <button type="button" className="p-1">
                        <img src="/assets/search.png" alt="Search" className="h-[18px] w-[18px]" />
                    </button>
                </div>
            )}

            <div
                className={`scrollbar-thin overflow-y-auto px-2 pb-4 ${
                    inDrawer ? "flex-1 pt-2" : "scroll-patients"
                }`}
            >
                {patients.map((patient) => {
                    const isSelected = selectedPatient?.name === patient.name;

                    return (
                        <button
                            key={patient.name}
                            type="button"
                            onClick={() => onSelect(patient)}
                            className={`mb-8 flex h-[48px] w-full items-center gap-3 rounded-lg pl-5 pr-4 text-left transition-colors ${
                                isSelected ? "bg-primary-light" : "hover:bg-gray-50"
                            }`}
                        >
                            <img
                                src={patient.profile_picture}
                                alt={patient.name}
                                className="h-9 w-9 shrink-0 rounded-full object-cover"
                            />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-dark">
                                    {patient.name}
                                </p>
                                <p className="text-sm text-gray-text">
                                    {patient.gender}, {patient.age}
                                </p>
                            </div>

                            <MoreIcon />
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}

export default Sidebar;
