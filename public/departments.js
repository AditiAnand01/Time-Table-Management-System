document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("departments-container");

    // Fetch department data from the API
    fetch('/api/departments')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch department data');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                container.innerHTML = "<p>No department data available.</p>";
                return;
            }

            // Generate HTML for each department and faculty
            const htmlContent = data.map(dept => `
                <div class="department">
                    <h2>${dept.Dept_Name}</h2>
                    <ul>
                        ${dept.Faculties.map(faculty => `
                            <li>
                                <strong>${faculty.Name}</strong> - 
                                <a href="mailto:${faculty.Email}">${faculty.Email}</a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `).join('');

            container.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error(error);
            container.innerHTML = "<p>Error fetching department data.</p>";
        });
});
