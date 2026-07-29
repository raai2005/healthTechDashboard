import { useState } from "react";

function DownloadIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 10L4 6H6.5V2H9.5V6H12L8 10Z" fill="#072635" />
            <path d="M2 13.5H14V15H2V13.5Z" fill="#072635" />
        </svg>
    );
}

function ChevronIcon({ open }) {
    return (
        <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className={`transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
        >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#072635" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LabResults({ results }) {
    const [openIndex, setOpenIndex] = useState(null);

    if (!results?.length) return null;

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <aside className="w-full shrink-0 rounded-3xl bg-white p-4 sm:p-5">
            <h2 className="mb-4 text-xl font-extrabold text-dark sm:text-2xl">Lab Results</h2>

            {/* Mobile: accordion */}
            <div className="space-y-2 lg:hidden">
                {results.map((result, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div key={result} className="overflow-hidden rounded-lg bg-bg">
                            <button
                                type="button"
                                onClick={() => toggleItem(index)}
                                className="flex w-full items-center justify-between px-4 py-3 text-left"
                            >
                                <span className="text-sm font-bold text-dark">{result}</span>
                                <ChevronIcon open={isOpen} />
                            </button>

                            {isOpen && (
                                <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
                                    <span className="text-sm text-gray-text">
                                        Download report
                                    </span>
                                    <button
                                        type="button"
                                        className="shrink-0 p-1"
                                        aria-label={`Download ${result}`}
                                    >
                                        <DownloadIcon />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Desktop: scroll list */}
            <div className="scroll-lab-4 scrollbar-thin hidden space-y-2 overflow-y-auto pr-1 lg:block">
                {results.map((result) => (
                    <div
                        key={result}
                        className="flex h-[44px] items-center justify-between rounded-lg bg-bg px-4 transition-colors hover:bg-[#EDEDED]"
                    >
                        <span className="truncate text-sm text-dark">{result}</span>
                        <button type="button" className="shrink-0 p-1" aria-label={`Download ${result}`}>
                            <DownloadIcon />
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default LabResults;
