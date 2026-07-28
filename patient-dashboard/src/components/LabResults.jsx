function DownloadIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 10L4 6H6.5V2H9.5V6H12L8 10Z" fill="#072635" />
            <path d="M2 13.5H14V15H2V13.5Z" fill="#072635" />
        </svg>
    );
}

function LabResults({ results }) {
    if (!results?.length) return null;

    return (
        <aside className="w-full shrink-0 rounded-3xl bg-white p-4 sm:p-5 xl:w-[367px]">
            <h2 className="mb-4 text-xl font-extrabold text-dark sm:text-2xl">Lab Results</h2>

            <div className="scroll-lab-4 scrollbar-thin space-y-2 overflow-y-auto pr-1">
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
