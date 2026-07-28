import { useEffect, useState } from "react";
import api from "./services/api";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import LabResults from "./components/LabResults";
import PatientSummary from "./components/PatientSummary";
import PatientDrawer from "./components/PatientDrawer";

function App() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await api.get("/");

            setPatients(response.data);

            const jessica = response.data.find(
                (patient) => patient.name === "Jessica Taylor"
            );

            setSelectedPatient(jessica);
        } catch (err) {
            console.log(err);
            setError("Failed to load patients.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg">
                <p className="text-lg font-bold text-dark">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg">
                <p className="text-lg font-bold text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg pb-4 sm:pb-6">
            <Header onOpenPatients={() => setDrawerOpen(true)} />

            <div className="mx-2 mt-3 flex flex-col gap-3 sm:mx-4 sm:mt-4 sm:gap-4 lg:flex-row lg:items-start">
                <div className="hidden lg:block lg:shrink-0">
                    <Sidebar
                        patients={patients}
                        selectedPatient={selectedPatient}
                        onSelect={setSelectedPatient}
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-3 lg:gap-4">
                    <PatientSummary patient={selectedPatient} />
                    <Dashboard patient={selectedPatient} />
                </div>

                <div className="flex w-full flex-col gap-3 lg:w-[367px] lg:shrink-0 lg:gap-4">
                    <div className="order-2 lg:order-1">
                        <Profile patient={selectedPatient} />
                    </div>
                    <div className="order-1 lg:order-2">
                        <LabResults results={selectedPatient?.lab_results} />
                    </div>
                </div>
            </div>

            <PatientDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                patients={patients}
                selectedPatient={selectedPatient}
                onSelect={setSelectedPatient}
            />
        </div>
    );
}

export default App;
