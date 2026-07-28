function MoreIcon() {
    return (
        <svg width="18" height="4" viewBox="0 0 18 4" fill="none" aria-hidden="true">
            <circle cx="2" cy="2" r="2" fill="#072635" />
            <circle cx="9" cy="2" r="2" fill="#072635" />
            <circle cx="16" cy="2" r="2" fill="#072635" />
        </svg>
    );
}

function Sidebar({ patients, selectedPatient, onSelect }) {
    return (
        <aside className="flex h-[calc(100vh-120px)] w-[367px] shrink-0 flex-col overflow-hidden rounded-3xl bg-white">
            <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <h2 className="text-2xl font-extrabold text-dark">Patients</h2>
                <button type="button" className="p-1">
                    <img src="/assets/search.png" alt="Search" className="h-5 w-5" />
                </button>
            </div>

            <div className="scrollbar-thin flex-1 overflow-y-auto px-2 pb-4">
                {patients.map((patient) => {
                    const isSelected = selectedPatient?.name === patient.name;

                    return (
                        <button
                            key={patient.name}
                            type="button"
                            onClick={() => onSelect(patient)}
                            className={`mb-0.5 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                                isSelected ? "bg-primary-light" : "hover:bg-gray-50"
                            }`}
                        >
                            <img
                                src={patient.profile_picture}
                                alt={patient.name}
                                className="h-12 w-12 shrink-0 rounded-full object-cover"
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
