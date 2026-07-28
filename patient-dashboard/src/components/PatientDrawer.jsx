import Sidebar from "./Sidebar";

function PatientDrawer({ isOpen, onClose, patients, selectedPatient, onSelect }) {
    if (!isOpen) return null;

    const handleSelect = (patient) => {
        onSelect(patient);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <button
                type="button"
                className="absolute inset-0 bg-black/40"
                aria-label="Close patients list"
                onClick={onClose}
            />

            <div className="absolute top-0 left-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                    <h2 className="text-lg font-extrabold text-dark">Patients</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-2 text-dark hover:bg-gray-50"
                        aria-label="Close"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M1 1L13 13M13 1L1 13" stroke="#072635" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden">
                    <Sidebar
                        patients={patients}
                        selectedPatient={selectedPatient}
                        onSelect={handleSelect}
                        inDrawer
                    />
                </div>
            </div>
        </div>
    );
}

export default PatientDrawer;
