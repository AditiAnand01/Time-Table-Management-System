document.addEventListener('DOMContentLoaded', () => {
    const studentId = new URLSearchParams(window.location.search).get('id'); // Get student ID from URL

    if (!studentId) {
        alert('No student ID found!');
        return;
    }

    // Fetch and display student info
    fetch(`/api/student-info?studentId=${studentId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('student-name').textContent = data.Name;
            document.getElementById('student-email').textContent = data.Email;
            document.getElementById('student-department').textContent = data.Dept_Name;
            document.getElementById('student-batch').textContent = data.Batch;
        });

    // Fetch and display courses
    fetch(`/api/student-courses?studentId=${studentId}`)
        .then(response => response.json())
        .then(courses => {
            const courseList = document.getElementById('course-list');
            courses.forEach(course => {
                const li = document.createElement('li');
                li.textContent = `${course.Crs_Code} - ${course.Crs_Name}`;
                courseList.appendChild(li);
            });
        });

    // Fetch and display timetable
    fetch(`/api/student-timetable?studentId=${studentId}`)
        .then(response => response.json())
        .then(timetable => {
            const timetableBody = document.getElementById('timetable-body');
            timetable.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.Day}</td>
                    <td>${row.Time}</td>
                    <td>${row.Course}</td>
                    <td>${row.Classroom}</td>
                    <td>${row.Instructor}</td>
                `;
                timetableBody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error('Error fetching timetable:', err);
        });
});
