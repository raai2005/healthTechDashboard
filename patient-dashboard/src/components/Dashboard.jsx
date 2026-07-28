import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DiagnosticList from "./DiagnosticList";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip
);

function BloodPressureChart({ history }) {
    const sortedHistory = [...history]
        .slice(0, 6)
        .reverse();

    const labels = sortedHistory.map(
        (item) => `${item.month.slice(0, 3)}, ${item.year}`
    );

    const systolicData = sortedHistory.map(
        (item) => item.blood_pressure.systolic.value
    );

    const diastolicData = sortedHistory.map(
        (item) => item.blood_pressure.diastolic.value
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: "Systolic",
                data: systolicData,
                borderColor: "#E66FD2",
                backgroundColor: "transparent",
                pointBackgroundColor: "#E66FD2",
                pointBorderColor: "#E66FD2",
                pointRadius: 5,
                pointHoverRadius: 6,
                borderWidth: 2,
                tension: 0.4,
            },
            {
                label: "Diastolic",
                data: diastolicData,
                borderColor: "#8C6FE6",
                backgroundColor: "transparent",
                pointBackgroundColor: "#8C6FE6",
                pointBorderColor: "#8C6FE6",
                pointRadius: 5,
                pointHoverRadius: 6,
                borderWidth: 2,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                    color: "#072635",
                    font: { family: "Manrope", size: 12 },
                },
            },
            y: {
                min: 60,
                max: 180,
                ticks: {
                    stepSize: 20,
                    color: "#072635",
                    font: { family: "Manrope", size: 12 },
                    padding: 8,
                },
                grid: {
                    color: "#CBC8D4",
                    drawBorder: false,
                },
                border: { display: false, dash: [4, 4] },
            },
        },
    };

    return (
        <div className="h-[220px] w-full sm:h-[260px] lg:h-[298px]">
            <Line data={chartData} options={options} />
        </div>
    );
}

function TrendIcon({ direction }) {
    if (direction === "up") {
        return (
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M5 0L10 6H0L5 0Z" fill="#072635" />
            </svg>
        );
    }

    return (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
            <path d="M5 6L0 0H10L5 6Z" fill="#072635" />
        </svg>
    );
}

function VitalCard({ title, value, unit, status, bgColor, icon }) {
    const isNormal = status === "Normal";
    const isLower = status.toLowerCase().includes("lower");
    const isHigher = status.toLowerCase().includes("higher");

    return (
        <div
            className="flex flex-1 flex-col items-center rounded-2xl px-4 py-4"
            style={{ backgroundColor: bgColor }}
        >
            <div className="mb-3 flex h-[96px] w-[96px] items-center justify-center">
                <img src={icon} alt={title} className="h-full w-full object-contain" />
            </div>
            <p className="text-base font-medium text-dark">{title}</p>
            <p className="mt-1 text-[30px] font-extrabold leading-none text-dark">
                {value}
                {unit && <span className="text-lg font-bold">{unit}</span>}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
                {!isNormal && (
                    <TrendIcon direction={isHigher ? "up" : isLower ? "down" : "down"} />
                )}
                <span className="text-sm text-gray-text">{status}</span>
            </div>
        </div>
    );
}

function Dashboard({ patient }) {
    if (!patient) return null;

    const latest = patient.diagnosis_history[0];
    const systolic = latest.blood_pressure.systolic;
    const diastolic = latest.blood_pressure.diastolic;

    return (
        <main className="min-w-0 flex-1">
            <h1 className="mb-4 text-xl font-extrabold text-dark sm:mb-5 sm:text-2xl">
                Diagnosis History
            </h1>

            <div className="rounded-2xl bg-white p-4 sm:p-5">
                <div className="rounded-2xl bg-bp-bg p-4 sm:p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-lg font-bold text-dark">Blood Pressure</h2>
                        <button
                            type="button"
                            className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm font-normal text-dark"
                        >
                            Last 6 months
                            <img src="/assets/download.png" alt="" className="h-2.5 w-2.5" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="min-w-0 flex-1">
                            <BloodPressureChart history={patient.diagnosis_history} />
                        </div>

                        <div className="flex shrink-0 flex-row gap-8 border-t border-gray-200 pt-4 lg:w-[208px] lg:flex-col lg:justify-center lg:border-t-0 lg:pt-2">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 rounded-full bg-systolic" />
                                    <span className="text-base font-bold text-dark">Systolic</span>
                                </div>
                                <p className="text-[22px] font-extrabold text-dark">
                                    {systolic.value}
                                </p>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <TrendIcon direction="up" />
                                    <span className="text-sm text-gray-text">
                                        {systolic.levels}
                                    </span>
                                </div>
                            </div>

                            <div className="w-px self-stretch bg-gray-300 lg:hidden" />
                            <div className="hidden h-px w-full bg-gray-300 lg:block" />

                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="h-3.5 w-3.5 rounded-full bg-diastolic" />
                                    <span className="text-base font-bold text-dark">Diastolic</span>
                                </div>
                                <p className="text-[22px] font-extrabold text-dark">
                                    {diastolic.value}
                                </p>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <TrendIcon direction="down" />
                                    <span className="text-sm text-gray-text">
                                        {diastolic.levels}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <VitalCard
                        title="Respiratory Rate"
                        value={latest.respiratory_rate.value}
                        unit=" bpm"
                        status={latest.respiratory_rate.levels}
                        bgColor="#E0F3FA"
                        icon="/assets/respiratory_rate.png"
                    />
                    <VitalCard
                        title="Temperature"
                        value={latest.temperature.value}
                        unit="°F"
                        status={latest.temperature.levels}
                        bgColor="#FFE6E9"
                        icon="/assets/temperature.png"
                    />
                    <VitalCard
                        title="Heart Rate"
                        value={latest.heart_rate.value}
                        unit=" bpm"
                        status={latest.heart_rate.levels}
                        bgColor="#FFE6F1"
                        icon="/assets/HeartBPM.png"
                    />
                </div>
            </div>

            <DiagnosticList diagnostics={patient.diagnostic_list} />
        </main>
    );
}

export default Dashboard;
