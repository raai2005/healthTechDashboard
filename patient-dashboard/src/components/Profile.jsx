import LabResults from "./LabResults";

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
    if (!patient) return null;

    return (
        <aside className="flex h-[calc(100vh-120px)] w-[367px] shrink-0 flex-col overflow-hidden rounded-3xl bg-white px-6 py-8">
            <div className="flex flex-col items-center">
                <img
                    src={patient.profile_picture}
                    alt={patient.name}
                    className="h-[200px] w-[200px] rounded-full object-cover"
                />
                <h2 className="mt-6 text-2xl font-extrabold text-dark">{patient.name}</h2>
            </div>

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

            <div className="scrollbar-thin flex-1 overflow-y-auto">
                <LabResults results={patient.lab_results} />
            </div>
        </aside>
    );
}

export default Profile;
