import { useEffect, useState } from "react";
import api from "./services/api";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

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
        <div className="min-h-screen bg-bg pb-6">
            <Header />

            <div className="mx-4 mt-4 flex items-start gap-4">
                <Sidebar
                    patients={patients}
                    selectedPatient={selectedPatient}
                    onSelect={setSelectedPatient}
                />

                <Dashboard patient={selectedPatient} />

                <Profile patient={selectedPatient} />
            </div>
        </div>
    );
}

export default App;
