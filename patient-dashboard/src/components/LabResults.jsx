function DownloadIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M8 11L3 6H6V1H10V6H13L8 11Z"
                fill="#072635"
            />
            <path
                d="M1 14H15V16H1V14Z"
                fill="#072635"
            />
        </svg>
    );
}

function LabResults({ results }) {
    if (!results?.length) return null;

    return (
        <div>
            <h2 className="mb-4 text-2xl font-extrabold text-dark">Lab Results</h2>

            <div className="space-y-2">
                {results.map((result) => (
                    <div
                        key={result}
                        className="flex items-center justify-between rounded-lg bg-bg px-4 py-3"
                    >
                        <span className="text-sm text-dark">{result}</span>
                        <button type="button" className="shrink-0 p-1">
                            <DownloadIcon />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LabResults;
