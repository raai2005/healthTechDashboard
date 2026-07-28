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

function CompactVitalCard({ title, value, unit, status, bgColor, icon }) {
    return (
        <div className="rounded-2xl p-3" style={{ backgroundColor: bgColor }}>
            <div className="flex items-center gap-2">
                <img src={icon} alt="" className="h-8 w-8 object-contain" />
                <p className="text-xs font-medium text-dark">{title}</p>
            </div>
            <p className="mt-2 text-xl font-extrabold text-dark">
                {value}
                {unit && <span className="text-sm font-bold">{unit}</span>}
            </p>
            <p className="mt-1 text-xs text-gray-text">{status}</p>
        </div>
    );
}

function CompactBPCard({ systolic, diastolic }) {
    return (
        <div className="rounded-2xl bg-bp-bg p-3">
            <p className="text-xs font-medium text-dark">Blood Pressure</p>
            <p className="mt-2 text-xl font-extrabold text-dark">
                {systolic.value}/{diastolic.value}
            </p>
            <p className="mt-1 text-xs text-gray-text">
                Sys: {systolic.levels}
            </p>
        </div>
    );
}

function VitalCard({ title, value, unit, status, bgColor, icon }) {
    const isNormal = status === "Normal";
    const isLower = status.toLowerCase().includes("lower");
    const isHigher = status.toLowerCase().includes("higher");

    return (
        <div
            className="flex h-[242px] w-full flex-col items-start justify-between rounded-2xl px-4 py-5"
            style={{ backgroundColor: bgColor }}
        >
            <img src={icon} alt={title} className="h-[96px] w-[96px] object-contain" />
            <div>
                <p className="text-sm font-medium text-dark">{title}</p>
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
            {/* Mobile: 2x2 vital snapshot */}
            <div className="mb-4 grid grid-cols-2 gap-3 lg:hidden">
                <CompactBPCard systolic={systolic} diastolic={diastolic} />
                <CompactVitalCard
                    title="Heart Rate"
                    value={latest.heart_rate.value}
                    unit=" bpm"
                    status={latest.heart_rate.levels}
                    bgColor="#FFE6F1"
                    icon="/assets/HeartBPM.png"
                />
                <CompactVitalCard
                    title="Temperature"
                    value={latest.temperature.value}
                    unit="°F"
                    status={latest.temperature.levels}
                    bgColor="#FFE6E9"
                    icon="/assets/temperature.png"
                />
                <CompactVitalCard
                    title="Respiratory Rate"
                    value={latest.respiratory_rate.value}
                    unit=" bpm"
                    status={latest.respiratory_rate.levels}
                    bgColor="#E0F3FA"
                    icon="/assets/respiratory_rate.png"
                />
            </div>

            <h1 className="mb-4 hidden text-2xl font-extrabold text-dark lg:mb-5 lg:block">
                Diagnosis History
            </h1>

            <div className="rounded-2xl bg-white p-4 sm:p-5">
                <h2 className="mb-4 text-lg font-extrabold text-dark lg:hidden">
                    Diagnosis History
                </h2>

                <div className="rounded-2xl bg-bp-bg p-4 sm:p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-lg font-bold text-dark">Blood Pressure</h2>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 text-sm font-normal text-dark"
                        >
                            Last 6 months
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                                <path d="M5 6L0 0H10L5 6Z" fill="#072635" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                        <div className="min-w-0 w-full flex-1">
                            <BloodPressureChart history={patient.diagnosis_history} />
                        </div>

                        <div className="hidden shrink-0 flex-col justify-center gap-6 lg:flex lg:w-[170px]">
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-systolic" />
                                    <span className="text-sm font-bold text-dark">Systolic</span>
                                </div>
                                <p className="text-[22px] font-extrabold text-dark">
                                    {systolic.value}
                                </p>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <TrendIcon direction="up" />
                                    <span className="text-xs text-gray-text">
                                        {systolic.levels}
                                    </span>
                                </div>
                            </div>

                            <div className="h-px w-full bg-[#CBC8D4]" />

                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-diastolic" />
                                    <span className="text-sm font-bold text-dark">Diastolic</span>
                                </div>
                                <p className="text-[22px] font-extrabold text-dark">
                                    {diastolic.value}
                                </p>
                                <div className="mt-1 flex items-center gap-1.5">
                                    <TrendIcon direction="down" />
                                    <span className="text-xs text-gray-text">
                                        {diastolic.levels}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 hidden grid-cols-3 gap-4 lg:grid">
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
