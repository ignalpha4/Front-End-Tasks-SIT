let studentData = []; 

//-----------------row addition-------------------------------
function addrow() {
    let new_row = document.createElement('div');
    new_row.classList.add('row', 'education_row');

    // Determine if it's the initial row (first or second)
    const isInitialRow = $('.education_row').length < 2;

    new_row.innerHTML = `
        <div class="col-lg">
            <label for="degree">Degree/Board</label>
            <input type="text" class="form-control degree" placeholder="Enter degree/board" name="degree" required>
            <div class="degree_v"></div>
        </div>
        <div class="col-lg">
            <label for="college">School/College</label>
            <input type="text" class="form-control college" placeholder="Enter your School/College Name" name="college" required>
            <div class="college_v"></div>
        </div>
        <div class="col-lg">
            <label for="start_date">Start Date</label>
            <input type="month" class="form-control start_date" placeholder="Enter start date" name="start_date" required>
        </div>
        <div class="col-lg">
            <label for="passout_date">Passout year</label>
            <input type="month" class="form-control passout_date" placeholder="Enter passout date" name="passout_date" required>
            <div class="passout_v"></div>
        </div>
        <div class="col-lg">
            <label for="percentage">Percentage</label>
            <input type="number" class="form-control percentage" placeholder="Don't use % sign" name="percentage" required>
            <div class="p_v"></div>
        </div>
        <div class="col-lg">
            <label for="backlog">Backlogs</label>
            <input type="number" class="form-control backlog" placeholder="If any" name="backlog">
            <div class="backlog_v"></div>
        </div>
        <div class="col-lg">
            ${isInitialRow ? '' : `<div class="sub_btn"><button type="button" class="my_btn" onclick="delete_row(this)"> - </button></div>`}
        </div>
        <span style="margin-top:15px"></span>
        <hr>
    `;

    $(".for_addition").append(new_row);
}


function delete_row(button){
    let row=button.parentNode.parentNode.parentNode;
    row.remove();
}

// Function to update the HTML tables with student data

function updateTables() {
    // Clear existing table data
    let t1 = $('.t1').DataTable();
    let t2 = $('.t2').DataTable();
    t1.clear().draw();
    t2.clear().draw();

    // Loop through the studentData array and add rows to the tables
    studentData.forEach(student => {
        // Personal Info table
        let personalInfoRow = [student.first_name, student.last_name, student.dob, student.email, student.address, student.graduationYear, '<button type="button" class="btn btn-primary btn-sm" onclick="editRow(' + studentData.indexOf(student) + ')"><i class="fa-solid fa-pen-to-square fa-lg"></i></button><button type="button" class="btn btn-danger btn-sm" onclick="deleteStudent(' + studentData.indexOf(student) + ')"><i class="fa-solid fa-trash"></i></button>'];
        t1.row.add(personalInfoRow).draw();

        // Educational Info table
        student.education.forEach(education => {
            let educationalInfoRow = [education.degree, education.college, education.start_date, education.passout_date, education.percentage, education.backlog];
            t2.row.add(educationalInfoRow).draw();
        });
    });
}



//------------------form submission---------------------------------------------------------------------------
function submit_data(event) {
    event.preventDefault();

    let editIndex = $('#edit_index').value;
    
    // If editIndex is -1, it means we are adding a new user
    if (editIndex === '-1') {
        // Adding a new user
        let student_details = {
            first_name: document.getElementById('fname').value,
            last_name: document.getElementById('lname').value,
            dob: document.getElementById('dob').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            graduationYear: document.getElementById('g_year').value,
            education: []
        };
        let educationRows = document.querySelectorAll('.education_row');
        educationRows.forEach(row => {
            let education_details = {
                degree: row.querySelector('.degree').value,
                college: row.querySelector('.college').value,
                start_date: row.querySelector('.start_date').value,
                passout_date: row.querySelector('.passout_date').value,
                percentage: row.querySelector('.percentage').value,
                backlog: row.querySelector('.backlog').value
            };
            student_details.education.push(education_details);
        });
        
        studentData.push(student_details);
    } else {
        // Editing an existing user
        let student = studentData[editIndex];
        student.first_name = document.getElementById('fname').value;
        student.last_name = document.getElementById('lname').value;
        student.dob = document.getElementById('dob').value;
        student.email = document.getElementById('email').value;
        student.address = document.getElementById('address').value;
        student.graduationYear = document.getElementById('g_year').value;

        let educationRows = document.querySelectorAll('.education_row');
        student.education = [];
        educationRows.forEach(row => {
            let education_details = {
                degree: row.querySelector('.degree').value,
                college: row.querySelector('.college').value,
                start_date: row.querySelector('.start_date').value,
                passout_date: row.querySelector('.passout_date').value,
                percentage: row.querySelector('.percentage').value,
                backlog: row.querySelector('.backlog').value
            };
            student.education.push(education_details);
        });
    }

    // Update tables
    updateTables();

    document.querySelector('form').reset();

    alert("Info updated successfully");

    
}

//json datatables
$(document).ready(function() {
    $('.t1').DataTable();
    $('.t2').DataTable();
});


// Function to delete a student
function deleteStudent(index) {
    studentData.splice(index, 1);
    updateTables();
}

// Function to edit a student
// Update the editRow function to use the correct property names
function editRow(index) {
    let student = studentData[index];
    document.getElementById("fname").value = student.first_name;
    document.getElementById("lname").value = student.last_name;
    document.getElementById("dob").value = student.dob;
    document.getElementById("email").value = student.email;
    document.getElementById("address").value = student.address;
    document.getElementById("g_year").value = student.graduationYear;

    // Clear existing education rows
    let educationRows = document.querySelectorAll(".education_row");
    educationRows.forEach(row => row.remove());

    // Add education rows from student data
    student.education.forEach((education, rowIndex) => {
        addEducationRowWithData(education, rowIndex);
    });

    // Add extra education rows if there are less than 2 rows
    for (let i = student.education.length; i < 2; i++) {
        addrow();
    }

    let modal = document.getElementById("student_form");
    document.getElementById('edit_index').value = index; 
    open_modal(modal);
}

function addEducationRowWithData(education, rowIndex) {
    let new_row = document.createElement('div');
    new_row.innerHTML = `
    <div class="row education_row">
        <div class="col-lg">
            <label for="degree">Degree/Board</label>
            <input type="text" class="form-control degree" value="${education.degree}" name="degree" required>
            <div class="degree_v"></div>
        </div>
        <div class="col-lg">
            <label for="college">School/College</label>
            <input type="text" class="form-control college" value="${education.college}" name="college" required>
            <div class="college_v"></div>
        </div>
        <div class="col-lg">
            <label for="start_date">Start Date</label>
            <input type="month" class="form-control start_date" value="${education.start_date}" name="start_date" required>
        </div>
        <div class="col-lg">
            <label for="passout_date">Passout year</label>
            <input type="month" class="form-control passout_date" value="${education.passout_date}" name="passout_date" required>
            <div class="passout_v"></div>
        </div>
        <div class="col-lg">
            <label for="percentage">Percentage</label>
            <input type="number" class="form-control percentage" value="${education.percentage}" name="percentage" required>
            <div class="p_v"></div>
        </div>
        <div class="col-lg">
            <label for="backlog">Backlogs</label>
            <input type="number" class="form-control backlog" value="${education.backlog}" name="backlog">
            <div class="backlog_v"></div>
        </div>
        <div class="col-lg">
            <span></span>
        </div>
        <div class="col-lg">
            ${rowIndex >= 2 ? '<div class="sub_btn"><button type="button" class="my_btn" onclick="delete_row(this)"> - </button></div>' : '<div class="sub_btn"><span></span></div>'}
        </div>
        <span style="margin-top:15px"></span>
        <hr>
    </div>`;
    document.querySelector(".for_addition").appendChild(new_row);
}



function initializeForm() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dob").value = "2000-01-01";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("g_year").value = "2000-01";
    document.getElementById("edit_index").value = "-1";

    // Clear existing education rows
    let educationRows = document.querySelectorAll(".education_row");
    educationRows.forEach(row => row.remove());

    // adding two blank rows at start
    addrow();
    addrow();

    let modal = document.getElementById("student_form");
    open_modal(modal);
}



//for opening the modal

function open_modal(modal) {
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "false");
}





//for closing the modals
document.querySelector('.btn-close').addEventListener('click', close_modal);

document.querySelector('.modal-footer .btn-secondary').addEventListener('click', close_modal);

function close_modal() {
    let modal = document.getElementById('student_form');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-modal', 'false');
    modal.setAttribute('aria-hidden', 'true');

}