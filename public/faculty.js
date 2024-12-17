window.onload = () => {
    // Get the faculty ID from the URL query parameter (e.g., ?id=0020)
    const urlParams = new URLSearchParams(window.location.search);
    const facultyId = urlParams.get('id');

    if (!facultyId) {
        alert('Faculty ID is required!');
        return;
    }

    // Fetch the faculty information, courses, and schedule
    fetch(`/api/faculty-dashboard?id=${facultyId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }

            // Display faculty information
            document.getElementById('facultyName').textContent = `Welcome, ${data.facultyInfo.Name}`;
            document.getElementById('facultyEmail').textContent = `Email: ${data.facultyInfo.Email}`;
            document.getElementById('facultyDepartment').textContent = `Department: ${data.facultyInfo.Dept_Name}`;

            // Display courses
            const coursesList = document.getElementById('coursesList');
            data.courses.forEach(course => {
                const li = document.createElement('li');
                li.textContent = `${course.Crs_Name} (${course.Crs_Code})`;
                coursesList.appendChild(li);
            });

            // Display schedule
            const scheduleTable = document.getElementById('scheduleTable');
            data.schedule.forEach(schedule => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${schedule.Day}</td>
                    <td>${schedule.Time}</td>
                    <td>${schedule.Crs_Name}</td>
                    <td>${schedule.Classroom_no}</td>
                `;
                scheduleTable.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error fetching faculty data:', error);
            alert('Failed to fetch faculty data');
        });
};
