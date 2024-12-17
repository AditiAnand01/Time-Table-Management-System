// Function to create a table from JSON data
function generateTable(data, columns) {
    let table = `<table border="1" cellpadding="5" cellspacing="0"><tr>`;
    // Add table headers
    columns.forEach(column => {
        table += `<th>${column}</th>`;
    });
    table += `</tr>`;
    // Add table rows
    data.forEach(row => {
        table += `<tr>`;
        columns.forEach(column => {
            table += `<td>${row[column]}</td>`; // Match keys from API response
        });
        table += `</tr>`;
    });
    table += `</table>`;
    return table;
}

// Fetch Free Classrooms
document.getElementById('freeClassroomsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const timeSlot = document.getElementById('timeSlot').value;

    if (!timeSlot) {
        alert("Please enter a time slot.");
        return;
    }

    try {
        const response = await fetch(`/api/free-classrooms?timeSlot=${timeSlot}`);
        const data = await response.json();
        const resultsDiv = document.getElementById('freeClassroomsResults');
        resultsDiv.innerHTML = generateTable(data, ["Classroom_no", "Capacity"]);
    } catch (error) {
        console.error("Error fetching free classrooms:", error);
        alert("Failed to fetch free classrooms.");
    }
});

// Fetch Students Info (Dept/Batch)
document.getElementById('studentsDeptBatchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const courseCode = document.getElementById('courseCode').value;

    if (!courseCode) {
        alert("Please enter a course code.");
        return;
    }

    try {
        const response = await fetch(`/api/student-info-for-a-course?courseCode=${courseCode}`);
        const data = await response.json();
        const resultsDiv = document.getElementById('studentsDeptBatchResults');
        resultsDiv.innerHTML = generateTable(data, ["Dept_ID", "Batch", "num_students"]);
    } catch (error) {
        console.error("Error fetching student info:", error);
        alert("Failed to fetch student info.");
    }
});

// Fetch Student Info
document.getElementById('studentInfoForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const courseCode = document.getElementById('courseCode').value;

    if (!courseCode) {
        alert("Please enter a course code.");
        return;
    }

    try {
        const response = await fetch(`/api/student-info-for-course?courseCode=${courseCode}`);
        const data = await response.json();
        const resultsDiv = document.getElementById('studentInfoResults');
        resultsDiv.innerHTML = generateTable(data, ["Stud_ID", "Name", "Email"]);
    } catch (error) {
        console.error("Error fetching student info:", error);
        alert("Failed to fetch student info.");
    }
});


// Fetch Free Time Slots
document.getElementById('freeTimeSlotsForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const courseCode = document.getElementById('courseCode').value;

    if (!courseCode) {
        alert("Please enter a course code.");
        return;
    }

    try {
        const response = await fetch(`/api/free-time-slots?courseCode=${courseCode}`);
        const data = await response.json();
        const resultsDiv = document.getElementById('freeTimeSlotsResults');
        resultsDiv.innerHTML = generateTable(data, ["Slot_ID"]);
    } catch (error) {
        console.error("Error fetching free time slots:", error);
        alert("Failed to fetch free time slots.");
    }
});

document.getElementById('viewSlotsBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/view-slots');
        const data = await response.json();

        if (data.length === 0) {
            document.getElementById('viewSlotsResults').innerHTML = `<p>No slots found.</p>`;
            return;
        }

        const resultsDiv = document.getElementById('viewSlotsResults');
        resultsDiv.innerHTML = generateTable(data, ["Slot_ID", "Day", "Time"]);
    } catch (error) {
        console.error("Error fetching slots:", error);
        alert("Failed to fetch slots.");
    }
});


document.getElementById('bookSlotForm').addEventListener('submit', async event => {
    event.preventDefault();
    const courseCode = document.getElementById('bookCourseCode').value;
    const slotId = document.getElementById('bookSlotId').value;
    const classroomNo = document.getElementById('bookClassroomNo').value;

    if (!courseCode || !slotId || !classroomNo) {
        alert('Please fill all fields.');
        return;
    }

    try {
        const response = await fetch('/api/book-slot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseCode, slotId, classroomNo })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error booking slot:', error);
        alert('Failed to book the slot.');
    }
});




document.getElementById('logoutBtn').addEventListener('click', function () {
    window.location.href = '/'; // Redirect to the home page
});

