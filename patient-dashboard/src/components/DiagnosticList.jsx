function getStatusStyles(status) {
    switch (status) {
        case "Under Observation":
            return "bg-[#FFF3D6]";
        case "Cured":
            return "bg-[#C8FFE8]";
        case "Inactive":
            return "bg-[#EAEAEA]";
        case "Untreated":
            return "bg-[#FFE7E7]";
        default:
            return "bg-gray-100";
    }
}

function DiagnosticList({ diagnostics }) {
    if (!diagnostics?.length) return null;

    return (
        <div className="mt-8 rounded-2xl bg-white p-5">
            <h2 className="mb-5 text-2xl font-extrabold text-dark">Diagnostic List</h2>

            <div className="overflow-hidden">
                <div className="mb-2 grid grid-cols-[1.2fr_1.8fr_1fr] gap-4 rounded-2xl bg-bg px-6 py-3">
                    <span className="text-sm font-bold text-dark">Problem/Diagnosis</span>
                    <span className="text-sm font-bold text-dark">Description</span>
                    <span className="text-sm font-bold text-dark">Status</span>
                </div>

                <div className="space-y-2">
                    {diagnostics.map((item) => (
                        <div
                            key={item.name}
                            className="grid grid-cols-[1.2fr_1.8fr_1fr] items-center gap-4 rounded-2xl bg-bg px-6 py-4"
                        >
                            <span className="text-sm font-bold text-dark">{item.name}</span>
                            <span className="text-sm text-gray-text">{item.description}</span>
                            <span
                                className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-normal text-dark ${getStatusStyles(item.status)}`}
                            >
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DiagnosticList;
