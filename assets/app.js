alert("This website is created for a real life example of Math expresion and input output conditional statement.");
// Add subject row
document.getElementById('addSubject').addEventListener('click', function () {
    const subjectInputs = document.getElementById('subjectInputs');
    const newRow = document.createElement('div');
    newRow.className = 'subject-row';
    newRow.innerHTML = `
                <input type="text" class="subject-name" placeholder="Subject name">
                <input type="number" class="subject-marks" min="0" max="100" placeholder="Marks (0-100)">
                <button class="remove-btn">×</button>
            `;
    subjectInputs.appendChild(newRow);

    // Add event listener to remove button
    newRow.querySelector('.remove-btn').addEventListener('click', function () {
        subjectInputs.removeChild(newRow);
    });
});

// Add event listeners to initial remove buttons
document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function () {
        if (document.querySelectorAll('.subject-row').length > 1) {
            this.closest('.subject-row').remove();
        }
    });
});

function calculateGrades() {
    // Get student information
    const studentName = document.getElementById('studentName').value || 'Student';
    const studentClass = document.getElementById('studentClass').value || 'N/A';

    // Get all subject inputs
    const subjectRows = document.querySelectorAll('.subject-row');
    const subjects = [];
    let totalMarks = 0;
    let validSubjects = 0;

    // Process each subject
    subjectRows.forEach(row => {
        const nameInput = row.querySelector('.subject-name');
        const marksInput = row.querySelector('.subject-marks');

        const name = nameInput.value.trim();
        const marks = parseInt(marksInput.value) || 0;

        if (name && !isNaN(marks)) {
            // Determine grade for this subject
            const gradeInfo = getGradeInfo(marks);

            subjects.push({
                name: name,
                marks: marks,
                grade: gradeInfo[0],
                gradeClass: gradeInfo[1]
            });

            totalMarks += marks;
            validSubjects++;
        }
    });

    if (validSubjects === 0) {
        alert('Please enter at least one valid subject with marks');
        return;
    }

    // Calculate average
    const averageMarks = totalMarks / validSubjects;
    const overallGradeInfo = getGradeInfo(averageMarks);

    // Generate report card
    document.getElementById('studentInfo').innerHTML = `
                <h3>${studentName} - Grade ${studentClass}</h3>
                <p>Report generated on: ${new Date().toLocaleDateString()}</p>
            `;

    // Add subjects to report
    const subjectList = document.getElementById('subjectList');
    subjectList.innerHTML = '<h3>Subject-wise Performance:</h3>';

    subjects.forEach(subject => {
        const subjectElement = document.createElement('div');
        subjectElement.className = 'subject-item';
        subjectElement.innerHTML = `
                    <span>${subject.name}</span>
                    <span class="${subject.gradeClass}">${subject.marks}/100 (${subject.grade})</span>
                `;
        subjectList.appendChild(subjectElement);
    });

    // Update totals
    document.getElementById('totalMarks').textContent = `${totalMarks}/${validSubjects * 100}`;
    document.getElementById('averageMarks').textContent = `${averageMarks.toFixed(2)}%`;
    document.getElementById('overallGrade').textContent = overallGradeInfo[0];
    document.getElementById('overallGrade').className = 'grade-value ' + overallGradeInfo[1];

    // Add comments
    const commentsText = document.getElementById('commentsText');
    if (averageMarks >= 90) {
        commentsText.textContent = 'Excellent performance! Keep up the great work!';
    } else if (averageMarks >= 80) {
        commentsText.textContent = 'Very good performance. Just a little more effort for excellence!';
    } else if (averageMarks >= 70) {
        commentsText.textContent = 'Good performance. There\'s room for improvement.';
    } else if (averageMarks >= 60) {
        commentsText.textContent = 'Satisfactory performance. Need to focus more on studies.';
    } else {
        commentsText.textContent = 'Needs improvement. Please seek help from teachers and put more effort.';
    }

    // Show report card
    document.getElementById('reportCard').style.display = 'block';
}

function getGradeInfo(marks) {
    if (marks >= 90) return ['A', 'grade-A'];
    if (marks >= 80) return ['B', 'grade-B'];
    if (marks >= 70) return ['C', 'grade-C'];
    if (marks >= 60) return ['D', 'grade-D'];
    return ['F', 'grade-F'];
}
