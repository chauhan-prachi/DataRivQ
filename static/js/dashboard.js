let qualityTrendChart = null;
let checkResultsChart = null;

async function loadDashboardData() {
    try {
        const response = await fetch("/api/dashboard/");

        if (!response.ok) {
            throw new Error("Unable to load dashboard data.");
        }

        const data = await response.json();

        renderQualityTrendChart(data.reliability?.history || []);
        renderCheckResultsChart(
            data.quality?.passed_checks || 0,
            data.quality?.failed_checks || 0
        );
        renderActiveIncidents(data.alerts?.active || []);

        updateReliability(data);
    } catch (error) {
        console.error("Dashboard data loading failed:", error);

        const container = document.getElementById("dashboardIncidents");

        if (container) {
            container.innerHTML = `
                <div class="incident-empty">
                    <strong>Unable to load incidents</strong>
                    <span>Please refresh the dashboard and try again.</span>
                </div>
            `;
        }
    }
}

function renderQualityTrendChart(runs) {
    const canvas = document.getElementById("qualityTrendChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    if (qualityTrendChart) {
        qualityTrendChart.destroy();
        qualityTrendChart = null;
    }

    const validRuns = runs.filter(
        run =>
            run.quality_score !== null &&
            run.quality_score !== undefined &&
            Number.isFinite(Number(run.quality_score))
    );

    if (!validRuns.length) {
        return;
    }

    qualityTrendChart = new Chart(canvas, {
        type: "line",
        data: {
            labels: validRuns.map(run => run.date),
            datasets: [{
                label: "Quality Score",
                data: validRuns.map(run => Number(run.quality_score)),
                borderColor: "#4f46e5",
                backgroundColor: "rgba(79, 70, 229, 0.10)",
                tension: 0.35,
                fill: true,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: "index"
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback(value) {
                            return value + "%";
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label(context) {
                            return "Quality: " + context.parsed.y + "%";
                        }
                    }
                }
            }
        }
    });
}

function renderCheckResultsChart(passed, failed) {
    const canvas = document.getElementById("checkResultsChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    if (checkResultsChart) {
        checkResultsChart.destroy();
        checkResultsChart = null;
    }

    checkResultsChart = new Chart(canvas, {
        type: "doughnut",
        data: {
            labels: ["Passed", "Failed"],
            datasets: [{
                data: [
                    Math.max(0, Number(passed) || 0),
                    Math.max(0, Number(failed) || 0)
                ],
                backgroundColor: ["#16a34a", "#dc2626"],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: "68%",
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}

function renderActiveIncidents(alerts) {
    const container = document.getElementById("dashboardIncidents");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (!Array.isArray(alerts) || alerts.length === 0) {
        container.innerHTML = `
            <div class="incident-empty">
                <div class="incident-empty-icon">✓</div>
                <strong>No active incidents</strong>
                <span>Your data platform has no unresolved alerts.</span>
            </div>
        `;
        return;
    }

    alerts.forEach(alert => {
        const incident = document.createElement("div");
        incident.className = "dashboard-incident";

        const severity = String(alert.severity || "LOW").toLowerCase();
        const pipelineName = alert.pipeline?.name || "Unknown pipeline";
        const runId = alert.pipeline_run?.id
            ? "#" + alert.pipeline_run.id
            : "—";

        incident.innerHTML = `
            <div class="incident-severity ${escapeHtml(severity)}">
                ${escapeHtml(alert.severity || "LOW")}
            </div>
            <div class="incident-content">
                <strong>${escapeHtml(alert.title || "Untitled incident")}</strong>
                <p>${escapeHtml(alert.message || "No additional details available.")}</p>
                <div class="incident-meta">
                    <span>${escapeHtml(pipelineName)}</span>
                    <span>Run ${escapeHtml(runId)}</span>
                    <span>${escapeHtml(formatIncidentDate(alert.created_at))}</span>
                </div>
            </div>
            <a href="/alerts/" class="incident-link">Investigate →</a>
        `;

        container.appendChild(incident);
    });
}

function updateReliability(data) {
    const reliability = data.reliability || {};
    const score = Number(reliability.score);

    if (!Number.isFinite(score)) {
        return;
    }

    const safeScore = Math.max(0, Math.min(100, score));
    const ring = document.querySelector(".reliability-ring");

    if (ring) {
        ring.style.setProperty("--reliability", safeScore + "%");
    }

    const scoreElement = document.getElementById("reliabilityScore");

    if (scoreElement) {
        scoreElement.textContent = Math.round(safeScore);
    }

    const gradeElement = document.getElementById("reliabilityGrade");

    if (gradeElement) {
        gradeElement.textContent =
            safeScore >= 90 ? "Excellent" :
            safeScore >= 75 ? "Good" :
            safeScore >= 50 ? "Needs attention" :
            "Critical";
    }

    const statusElement = document.getElementById("reliabilityStatus");

    if (statusElement) {
        statusElement.textContent =
            safeScore >= 75 ? "Healthy" :
            safeScore >= 50 ? "Needs attention" :
            "At risk";
    }
}

function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
}

function formatIncidentDate(value) {
    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleString();
}

document.addEventListener("DOMContentLoaded", () => {
    loadDashboardData();

    const refreshButton = document.getElementById("refreshDashboard");

    if (refreshButton) {
        refreshButton.addEventListener("click", () => {
            loadDashboardData(); // smoother refresh without full reload
        });
    }
});
