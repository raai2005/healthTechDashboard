function PatientSummary({ patient }) {
    if (!patient) return null;

    const latest = patient.diagnosis_history[0];
    const alerts = [
        latest.blood_pressure.systolic.levels,
        latest.heart_rate.levels,
    ].filter((level) => level !== "Normal");

    return (
        <section className="rounded-3xl bg-white p-4 lg:hidden">
            <div className="flex items-center gap-3">
                <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="h-14 w-14 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-lg font-extrabold text-dark">
                        {patient.name}
                    </h2>
                    <p className="text-sm text-gray-text">
                        {patient.gender}, {patient.age} years
                    </p>
                </div>
            </div>

            {alerts.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {alerts.slice(0, 2).map((alert) => (
                        <span
                            key={alert}
                            className="rounded-full bg-[#FFF3D6] px-3 py-1 text-xs font-medium text-dark"
                        >
                            {alert}
                        </span>
                    ))}
                </div>
            )}
        </section>
    );
}

export default PatientSummary;
