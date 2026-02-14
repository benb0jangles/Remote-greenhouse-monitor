// ========== CONFIGURATION ==========
const THINGSPEAK_CHANNEL_ID = '3245000';  // Your ThingSpeak channel ID
const THINGSPEAK_READ_API_KEY = '';  // Leave empty - channel is public
// ===================================

// Ideal ranges for each sensor
const idealRanges = {
    temperature: { min: 7, max: 36, unit: '°C', cardId: 'statCardTemp' },
    humidity:    { min: 0, max: 50, unit: '%', cardId: 'statCardHumidity' },
    pressure:    null,
    lux:         { min: 7000, max: 30000, unit: 'lux', cardId: 'statCardLux' },
    soil:        { min: 20, max: 60, unit: '%', cardId: 'statCardSoil' }
};

// Approximate UK location for sunrise/sunset calculation
const LATITUDE = 51.5;
const LONGITUDE = -0.1;

let currentTimeRange = '24h';
let charts = {};

// Time range configurations (using ThingSpeak 'days' parameter for accurate filtering)
const timeRanges = {
    '24h': { days: 1, label: '24 Hours' },
    '7d': { days: 7, label: '7 Days' },
    '30d': { days: 30, label: '30 Days' },
    '1y': { days: 365, label: '1 Year' }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadData();

    // Auto-refresh every 5 minutes
    setInterval(() => {
        loadData();
    }, 5 * 60 * 1000);
});

function initializeEventListeners() {
    // Time range buttons
    document.querySelectorAll('.range-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active button
            document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            // Update time range and reload data
            currentTimeRange = e.target.dataset.range;
            loadData();
        });
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
        loadData();
    });
}

async function loadData() {
    const range = timeRanges[currentTimeRange];
    const url = buildThingSpeakURL(range.days);

    try {
        document.getElementById('lastUpdate').textContent = 'Loading...';

        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();

        if (!data.feeds || data.feeds.length === 0) {
            throw new Error('No data available');
        }

        updateCurrentValues(data.feeds[data.feeds.length - 1]);
        updateCharts(data.feeds);
        updateLastUpdateTime(data.feeds[data.feeds.length - 1].created_at);

    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('lastUpdate').textContent = 'Error loading data';
    }
}

function buildThingSpeakURL(days) {
    let url = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/feeds.json?days=${days}`;

    if (THINGSPEAK_READ_API_KEY && THINGSPEAK_READ_API_KEY !== 'YOUR_READ_API_KEY') {
        url += `&api_key=${THINGSPEAK_READ_API_KEY}`;
    }

    return url;
}

// ========== COLOR-CODING & FROST DETECTION ==========

function getValueState(value, range) {
    if (value === null || isNaN(value)) return 'unknown';
    const span = range.max - range.min;
    const edgeMargin = span * 0.1;
    if (value >= range.min && value <= range.max) return 'in-range';
    if (value >= range.min - edgeMargin && value <= range.max + edgeMargin) return 'warning';
    return 'danger';
}

function applyCardState(cardId, state) {
    const card = document.getElementById(cardId);
    if (!card) return;
    card.classList.remove('stat-in-range', 'stat-warning', 'stat-danger');
    if (state === 'in-range') card.classList.add('stat-in-range');
    else if (state === 'warning') card.classList.add('stat-warning');
    else if (state === 'danger') card.classList.add('stat-danger');
}

function updateFrostAlert(tempValue) {
    const frostAlert = document.getElementById('frostAlert');
    const frostText = document.getElementById('frostAlertText');
    if (tempValue !== null && !isNaN(tempValue) && tempValue < 3) {
        frostText.textContent = `Frost Warning: Temperature is ${tempValue.toFixed(1)}°C — risk of frost damage!`;
        frostAlert.style.display = 'flex';
    } else {
        frostAlert.style.display = 'none';
    }

    const heatAlert = document.getElementById('heatAlert');
    const heatText = document.getElementById('heatAlertText');
    if (tempValue !== null && !isNaN(tempValue) && tempValue > 37) {
        heatText.textContent = `Heat Warning: Temperature is ${tempValue.toFixed(1)}°C — risk of heat stress!`;
        heatAlert.style.display = 'flex';
    } else {
        heatAlert.style.display = 'none';
    }
}

function updateCurrentValues(latestData) {
    const values = {
        temperature: latestData.field1 ? parseFloat(latestData.field1) : null,
        humidity: latestData.field2 ? parseFloat(latestData.field2) : null,
        pressure: latestData.field3 ? parseFloat(latestData.field3) : null,
        lux: latestData.field4 ? parseFloat(latestData.field4) : null,
        soil: latestData.field5 ? parseFloat(latestData.field5) : null
    };

    document.getElementById('currentTemp').textContent =
        values.temperature !== null ? values.temperature.toFixed(1) : '--';
    document.getElementById('currentHumidity').textContent =
        values.humidity !== null ? values.humidity.toFixed(1) : '--';
    document.getElementById('currentPressure').textContent =
        values.pressure !== null ? values.pressure.toFixed(1) : '--';
    document.getElementById('currentLux').textContent =
        values.lux !== null ? values.lux.toFixed(0) : '--';
    document.getElementById('currentSoil').textContent =
        values.soil !== null ? values.soil.toFixed(1) : '--';

    // Apply color-coded states to stat cards
    for (const [key, range] of Object.entries(idealRanges)) {
        if (!range) continue;
        const state = getValueState(values[key], range);
        applyCardState(range.cardId, state);
    }

    // Frost alert
    updateFrostAlert(values.temperature);
}

// ========== SUNRISE / SUNSET CALCULATION ==========

function getSunTimes(date, lat, lng) {
    // Simple solar calculation (accurate to ~5 minutes)
    const rad = Math.PI / 180;
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const declination = -23.45 * Math.cos(rad * (360 / 365) * (dayOfYear + 10));
    const hourAngle = Math.acos(
        -Math.tan(lat * rad) * Math.tan(declination * rad)
    ) / rad;
    const solarNoon = 12 - lng / 15; // approximate solar noon in UTC hours
    const sunriseUTC = solarNoon - hourAngle / 15;
    const sunsetUTC = solarNoon + hourAngle / 15;

    const sunrise = new Date(date);
    sunrise.setUTCHours(0, 0, 0, 0);
    sunrise.setUTCMinutes(sunriseUTC * 60);

    const sunset = new Date(date);
    sunset.setUTCHours(0, 0, 0, 0);
    sunset.setUTCMinutes(sunsetUTC * 60);

    return { sunrise, sunset };
}

function generateNightAnnotations(labels) {
    // Only for 24h and 7d ranges
    if (currentTimeRange !== '24h' && currentTimeRange !== '7d') return {};

    if (!labels || labels.length < 2) return {};

    const startDate = new Date(labels[0]);
    const endDate = new Date(labels[labels.length - 1]);
    const annotations = {};
    let idx = 0;

    // Iterate day by day across the range
    const current = new Date(startDate);
    current.setUTCHours(0, 0, 0, 0);
    // Start one day before to capture the previous night
    current.setUTCDate(current.getUTCDate() - 1);

    const limit = new Date(endDate);
    limit.setUTCDate(limit.getUTCDate() + 1);

    while (current <= limit) {
        const { sunrise, sunset } = getSunTimes(current, LATITUDE, LONGITUDE);

        // Evening night band: sunset to midnight
        const midnight = new Date(current);
        midnight.setUTCDate(midnight.getUTCDate() + 1);
        midnight.setUTCHours(0, 0, 0, 0);

        if (sunset < endDate && midnight > startDate) {
            annotations[`night_eve_${idx}`] = {
                type: 'box',
                xMin: Math.max(sunset.getTime(), startDate.getTime()),
                xMax: Math.min(midnight.getTime(), endDate.getTime()),
                backgroundColor: 'rgba(30, 30, 60, 0.08)',
                borderWidth: 0,
                drawTime: 'beforeDatasetsDraw'
            };
        }

        // Morning night band: midnight to sunrise
        const nextDay = new Date(current);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);
        const { sunrise: nextSunrise } = getSunTimes(nextDay, LATITUDE, LONGITUDE);

        if (midnight < endDate && nextSunrise > startDate) {
            annotations[`night_morn_${idx}`] = {
                type: 'box',
                xMin: Math.max(midnight.getTime(), startDate.getTime()),
                xMax: Math.min(nextSunrise.getTime(), endDate.getTime()),
                backgroundColor: 'rgba(30, 30, 60, 0.08)',
                borderWidth: 0,
                drawTime: 'beforeDatasetsDraw'
            };
        }

        current.setUTCDate(current.getUTCDate() + 1);
        idx++;
    }

    return annotations;
}

// ========== CHART ANNOTATIONS ==========

function buildAnnotations(labels, idealRange) {
    const annotations = {};

    // Ideal range band
    if (idealRange) {
        annotations.idealBand = {
            type: 'box',
            yMin: idealRange.min,
            yMax: idealRange.max,
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
            borderColor: 'rgba(76, 175, 80, 0.2)',
            borderWidth: 1,
            drawTime: 'beforeDatasetsDraw',
            label: {
                display: false
            }
        };
    }

    // Day/night shading
    const nightAnnotations = generateNightAnnotations(labels);
    Object.assign(annotations, nightAnnotations);

    return annotations;
}

// ========== CHARTS ==========

function updateCharts(feeds) {
    const labels = feeds.map(feed => new Date(feed.created_at));

    const datasets = {
        temperature: {
            data: feeds.map(feed => parseFloat(feed.field1)),
            label: 'Temperature (°C)',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            color: 'rgb(255, 99, 132)'
        },
        humidity: {
            data: feeds.map(feed => parseFloat(feed.field2)),
            label: 'Humidity (%)',
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            color: 'rgb(54, 162, 235)'
        },
        pressure: {
            data: feeds.map(feed => parseFloat(feed.field3)),
            label: 'Pressure (hPa)',
            borderColor: 'rgb(255, 206, 86)',
            backgroundColor: 'rgba(255, 206, 86, 0.1)',
            color: 'rgb(255, 206, 86)'
        },
        lux: {
            data: feeds.map(feed => parseFloat(feed.field4)),
            label: 'Light (lux)',
            borderColor: 'rgb(255, 159, 64)',
            backgroundColor: 'rgba(255, 159, 64, 0.1)',
            color: 'rgb(255, 159, 64)'
        },
        soil: {
            data: feeds.map(feed => parseFloat(feed.field5)),
            label: 'Soil Moisture (%)',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            color: 'rgb(75, 192, 192)'
        }
    };

    createOrUpdateChart('tempChart', labels, datasets.temperature, idealRanges.temperature);
    createOrUpdateChart('humidityChart', labels, datasets.humidity, idealRanges.humidity);
    createOrUpdateChart('pressureChart', labels, datasets.pressure, idealRanges.pressure);
    createOrUpdateChart('luxChart', labels, datasets.lux, idealRanges.lux);
    createOrUpdateChart('soilChart', labels, datasets.soil, idealRanges.soil);
}

function createOrUpdateChart(chartId, labels, dataset, idealRange) {
    const ctx = document.getElementById(chartId).getContext('2d');

    // Destroy existing chart if it exists
    if (charts[chartId]) {
        charts[chartId].destroy();
    }

    const annotations = buildAnnotations(labels, idealRange);

    // Create new chart
    charts[chartId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: dataset.label,
                data: dataset.data,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor,
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 2,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        title: function(context) {
                            const date = new Date(context[0].label);
                            return date.toLocaleString();
                        }
                    }
                },
                annotation: {
                    annotations: annotations
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        tooltipFormat: 'MMM dd, yyyy HH:mm',
                        displayFormats: getTimeDisplayFormat()
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0,
                        autoSkip: true,
                        maxTicksLimit: 10
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1);
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function getTimeDisplayFormat() {
    switch(currentTimeRange) {
        case '24h':
            return {
                hour: 'HH:mm',
                minute: 'HH:mm'
            };
        case '7d':
            return {
                day: 'MMM dd',
                hour: 'MMM dd HH:mm'
            };
        case '30d':
            return {
                hour: 'MMM dd',
                day: 'MMM dd',
                week: 'MMM dd'
            };
        case '1y':
            return {
                month: 'MMM yyyy',
                day: 'MMM dd'
            };
        default:
            return {
                day: 'MMM dd'
            };
    }
}

function updateLastUpdateTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 60000);

    let timeAgo;
    if (diffMinutes < 1) {
        timeAgo = 'Just now';
    } else if (diffMinutes < 60) {
        timeAgo = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        const days = Math.floor(diffMinutes / 1440);
        timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
    }

    document.getElementById('lastUpdate').textContent = `Last update: ${timeAgo}`;
}
