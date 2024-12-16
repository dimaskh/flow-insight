// Chart data
const chartData = {
    labels: ['2024 Oct 1', '2024 Oct 7', '2024 Oct 14', '2024 Oct 21', '2024 Oct 28', '2024 Nov 5'],
    datasets: [
        {
            label: 'Lead Time',
            data: [70, 95, 48, 73, 95, 85],
            borderColor: '#6C5CE7',
            tension: 0.4,
            fill: false
        },
        {
            label: 'Reaction Time',
            data: [90, 22, 91, 85, 25, 85],
            borderColor: '#FF7675',
            tension: 0.4,
            fill: false
        },
        {
            label: 'Cycle Time',
            data: [95, 78, 88, 20, 15, 55],
            borderColor: '#FFA502',
            tension: 0.4,
            fill: false
        },
        {
            label: 'Review Time',
            data: [65, 28, 18, 80, 15, 45],
            borderColor: '#00B894',
            tension: 0.4,
            fill: false
        }
    ]
};

// Initialize main chart
const ctx = document.getElementById('mainChart');
const mainChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#E9ECEF'
                },
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        elements: {
            point: {
                radius: 4,
                hoverRadius: 6
            }
        }
    }
});

// Mini charts data
const miniChartsData = {
    reactionTime: {
        data: [80, 60, 90, 70, 85, 75],
        color: '#FF7675'
    },
    cycleTime: {
        data: [70, 85, 75, 90, 80, 85],
        color: '#FFA502'
    },
    measurement: {
        data: [75, 85, 70, 90, 80, 75],
        color: '#6C5CE7'
    }
};

// Create mini charts
const createMiniChart = (containerId, data) => {
    const container = document.querySelector(containerId);
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
        type: 'line',
        data: {
            labels: Array(6).fill(''),
            datasets: [{
                data: data.data,
                borderColor: data.color,
                tension: 0.4,
                fill: false,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            elements: {
                line: {
                    borderWidth: 2
                }
            }
        }
    });
};

// Initialize mini charts
Object.entries(miniChartsData).forEach(([key, data]) => {
    createMiniChart(`#${key}Chart`, data);
});

// Chart type switcher
document.querySelectorAll('.btn-chart').forEach(button => {
    button.addEventListener('click', () => {
        const buttons = document.querySelectorAll('.btn-chart');
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const chartType = button.textContent.toLowerCase();
        mainChart.config.type = chartType;
        mainChart.update();
    });
});

// Filter checkboxes
document.querySelectorAll('.checkbox input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const datasetLabel = checkbox.parentElement.textContent.trim();
        const datasetIndex = chartData.datasets.findIndex(ds => ds.label === datasetLabel);
        
        if (datasetIndex !== -1) {
            const isVisible = mainChart.isDatasetVisible(datasetIndex);
            mainChart.setDatasetVisibility(datasetIndex, !isVisible);
            mainChart.update();
        }
    });
});

// Handle responsive sidebar
const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
};

// Reset filters button
document.querySelector('.btn-reset')?.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.checkbox input');
    checkboxes.forEach(checkbox => {
        checkbox.checked = true;
        const event = new Event('change');
        checkbox.dispatchEvent(event);
    });
});
