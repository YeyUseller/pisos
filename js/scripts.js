document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

function initMiniCalendar() {
    const calendarEl = document.getElementById('miniCalendar');
    const month = 2; // Marzo
    const year = 2024;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let adjustedFirstDay = firstDay - 1;
    if (adjustedFirstDay < 0) adjustedFirstDay = 6;

    for (let i = 0; i < adjustedFirstDay; i++) {
        calendarEl.innerHTML += `<div class="calendar-day h-8 flex items-center justify-center text-gray-400">${new Date(year, month, -(adjustedFirstDay - i - 1)).getDate()}</div>`;
    }

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const bookedDays = [5, 8, 12, 15, 20, 25, 26];

    for (let i = 1; i <= daysInMonth; i++) {
        let className = 'calendar-day h-8 flex items-center justify-center cursor-pointer';
        if (i === currentDay && month === currentMonth && year === currentYear) {
            className += ' bg-blue-100 text-blue-800 font-bold';
        }
        if (bookedDays.includes(i)) {
            className += ' booked';
        }
        calendarEl.innerHTML += `<div class="${className}" data-day="${i}">${i}</div>`;
    }

    const totalCells = Math.ceil((adjustedFirstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (adjustedFirstDay + daysInMonth);

    for (let i = 1; i <= remainingCells; i++) {
        calendarEl.innerHTML += `<div class="calendar-day h-8 flex items-center justify-center text-gray-400">${i}</div>`;
    }

    document.querySelectorAll('.calendar-day:not(.booked)').forEach(day => {
        if (!day.classList.contains('text-gray-400')) {
            day.addEventListener('click', function() {
                document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
                this.classList.add('selected');
            });
        }
    });
}

function initReservationChart() {
    const ctx = document.getElementById('reservationChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [
                {
                    label: 'Reservas 2023',
                    data: [15, 18, 20, 25, 28, 35, 42, 40, 32, 28, 20, 18],
                    borderColor: 'rgb(209, 213, 219)',
                    backgroundColor: 'rgba(209, 213, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Reservas 2024',
                    data: [18, 22, 24, null, null, null, null, null, null, null, null, null],
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 50
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMiniCalendar();
    initReservationChart();
});
