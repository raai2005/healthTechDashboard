import { useState } from "react";

function formatDate(dateString) {
    const [month, day, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50">
                <img src={icon} alt="" className="h-5 w-5" />
            </div>
            <div className="text-left">
                <p className="text-sm text-gray-text">{label}</p>
                <p className="mt-0.5 text-sm font-bold text-dark">{value}</p>
            </div>
        </div>
    );
}

function Profile({ patient }) {
    const [expanded, setExpanded] = useState(false);

    if (!patient) return null;

    const details = (
        <>
            <div className="mt-8 space-y-6">
                <InfoRow
                    icon="/assets/BirthIcon.svg"
                    label="Date Of Birth"
                    value={formatDate(patient.date_of_birth)}
                />
                <InfoRow
                    icon="/assets/FemaleIcon.svg"
                    label="Gender"
                    value={patient.gender}
                />
                <InfoRow
                    icon="/assets/PhoneIcon.svg"
                    label="Contact Info."
                    value={patient.phone_number}
                />
                <InfoRow
                    icon="/assets/PhoneIcon.svg"
                    label="Emergency Contacts"
                    value={patient.emergency_contact}
                />
                <InfoRow
                    icon="/assets/InsuranceIcon.svg"
                    label="Insurance Provider"
                    value={patient.insurance_type}
                />
            </div>

            <button
                type="button"
                className="mt-8 w-full rounded-full bg-primary py-3.5 text-sm font-bold text-dark transition-opacity hover:opacity-90"
            >
                Show All Information
            </button>
        </>
    );

    return (
        <>
            {/* Mobile: collapsed demographics */}
            <aside className="w-full shrink-0 rounded-3xl bg-white p-4 lg:hidden">
                <button
                    type="button"
                    onClick={() => setExpanded(!expanded)}
                    className="flex w-full items-center justify-between"
                >
                    <span className="text-lg font-extrabold text-dark">Patient Details</span>
                    <svg
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                        aria-hidden="true"
                    >
                        <path
                            d="M1 1.5L6 6.5L11 1.5"
                            stroke="#072635"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                {expanded && <div className="mt-4">{details}</div>}
            </aside>

            {/* Desktop: full profile */}
            <aside className="hidden w-full shrink-0 rounded-3xl bg-white px-6 py-8 lg:block lg:w-[367px]">
                <div className="flex flex-col items-center">
                    <img
                        src={patient.profile_picture}
                        alt={patient.name}
                        className="h-[200px] w-[200px] rounded-full object-cover"
                    />
                    <h2 className="mt-6 text-2xl font-extrabold text-dark">{patient.name}</h2>
                </div>
                {details}
            </aside>
        </>
    );
}

export default Profile;
