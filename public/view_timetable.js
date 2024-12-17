document.getElementById('timetableForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const batch = document.getElementById('batch').value;
    const branch = document.getElementById('branch').value;

    try {
        const response = await fetch(`/api/timetable?batch=${batch}&branch=${branch}`);
        const data = await response.json();

        if (response.ok) {
            renderDetailedTimetable(data); // Existing detailed table
            renderCompactTimetable(data); // New compact table
        } else {
            alert(data.error || 'Failed to fetch timetable');
        }
    } catch (error) {
        console.error('Error fetching timetable:', error);
        alert('An error occurred while fetching the timetable');
    }
});

function renderDetailedTimetable(data) {
    const container = document.getElementById('timetableResults');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p>No timetable available for the selected batch and branch.</p>';
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Day', 'Time', 'Course', 'Classroom', 'Instructor'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

function renderCompactTimetable(data) {
    const compactContainer = document.getElementById('compactTimetable');
    compactContainer.innerHTML = '';

    if (data.length === 0) {
        compactContainer.innerHTML = '<p>No timetable available for the selected batch and branch.</p>';
        return;
    }

    // Extract unique days and sort time slots
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let timeSlots = [...new Set(data.map(entry => entry.Time))];
    timeSlots = timeSlots.sort((a, b) => {
        const parseTime = time => {
            const [start] = time.split('-'); // Extract start time (e.g., "8:00" from "8:00-9:00")
            const [hours, minutes] = start.split(':').map(Number);
            return hours * 60 + minutes; // Convert to total minutes for comparison
        };
    
        return parseTime(a) - parseTime(b);
    });
    

    // Create the table
    const table = document.createElement('table');
    table.classList.add('compact-timetable');

    // Create the header row
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>Day / Time</th>` + timeSlots.map(slot => `<th>${slot}</th>`).join('');
    table.appendChild(headerRow);

    // Create rows for each day
    days.forEach(day => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${day}</td>`; // First cell is the day name

        // Populate the row with time slots
        timeSlots.forEach(slot => {
            const cell = document.createElement('td');
            const course = data.find(entry => entry.Day === day && entry.Time === slot);

            cell.textContent = course ? course.Course : ''; // Only course name in compact view
            row.appendChild(cell);
        });

        table.appendChild(row);
    });

    compactContainer.appendChild(table);
}
