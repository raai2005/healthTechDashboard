function DiagnosticList({ diagnostics }) {
    if (!diagnostics?.length) return null;

    return (
        <div className="mt-6 rounded-3xl bg-white p-4 sm:p-5 xl:mt-8">
            <h2 className="mb-4 text-xl font-extrabold text-dark sm:mb-5 sm:text-2xl">
                Diagnostic List
            </h2>

            {/* Mobile: stacked cards */}
            <div className="scroll-diagnostic-3 scrollbar-thin space-y-2 overflow-y-auto pr-1 lg:hidden">
                {diagnostics.map((item) => (
                    <div key={item.name} className="rounded-2xl bg-bg p-4">
                        <p className="text-sm font-bold text-dark">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-text">{item.description}</p>
                        <p className="mt-2 text-sm font-medium text-dark">{item.status}</p>
                    </div>
                ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden overflow-x-auto lg:block">
                <div className="min-w-[520px]">
                    <div className="mb-2 grid grid-cols-[1.1fr_1.6fr_0.9fr] gap-4 rounded-2xl bg-bg px-6 py-3">
                        <span className="text-sm font-bold text-dark">Problem/Diagnosis</span>
                        <span className="text-sm font-bold text-dark">Description</span>
                        <span className="text-sm font-bold text-dark">Status</span>
                    </div>

                    <div className="scroll-diagnostic-3 scrollbar-thin space-y-2 overflow-y-auto pr-1">
                        {diagnostics.map((item) => (
                            <div
                                key={item.name}
                                className="grid h-[52px] grid-cols-[1.1fr_1.6fr_0.9fr] items-center gap-4 rounded-2xl bg-bg px-6"
                            >
                                <span className="truncate text-sm font-bold text-dark">
                                    {item.name}
                                </span>
                                <span className="truncate text-sm text-gray-text">
                                    {item.description}
                                </span>
                                <span className="truncate text-sm text-dark">{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagnosticList;
