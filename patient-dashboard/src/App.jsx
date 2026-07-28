import { useEffect, useState } from "react";
import api from "./services/api";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import LabResults from "./components/LabResults";

function App() {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
            <Header />

            <div className="mx-2 mt-3 flex flex-col gap-3 sm:mx-4 sm:mt-4 sm:gap-4 xl:flex-row xl:items-start">
                <div className="order-4 xl:order-1">
                    <Sidebar
                        patients={patients}
                        selectedPatient={selectedPatient}
                        onSelect={setSelectedPatient}
                    />
                </div>

                <div className="order-1 min-w-0 flex-1 xl:order-2">
                    <Dashboard patient={selectedPatient} />
                </div>

                <div className="order-2 flex w-full flex-col gap-4 xl:order-3 xl:w-[367px] xl:shrink-0">
                    <Profile patient={selectedPatient} />
                    <LabResults results={selectedPatient?.lab_results} />
                </div>
            </div>
        </div>
    );
}

export default App;
