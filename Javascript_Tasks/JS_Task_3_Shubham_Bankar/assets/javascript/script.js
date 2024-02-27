let student_data = []; 

//-----------------row addition-------------------------------
function add_row() {
    let new_row = document.createElement('div');
    new_row.classList.add('row', 'education_row');

    // to check for first two rows.so that - button should be added to the 3rd onwards
    const is_initial_row = $('.education_row').length < 2;

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
            ${is_initial_row ? '' : `<div class="sub_btn"><button type="button" class="my_btn" onclick="delete_row(this)"> - </button></div>`}
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

function update_tables() {
    //clearing the data present in the table
    let t1 = $('.t1').DataTable();
    let t2 = $('.t2').DataTable();
    t1.clear().draw();
    t2.clear().draw();

    // for rach student in array we are recreating the table
    student_data.forEach(student => {
        // personal info table
        let personal_info_row = [student.first_name, student.last_name, student.dob, student.email, student.address, student.graduationYear, '<button type="button" class="btn btn-primary btn-sm" onclick="edit_row(' + student_data.indexOf(student) + ')"><i class="fa-solid fa-pen-to-square fa-lg"></i></button><button type="button" class="btn btn-danger btn-sm" onclick="delete_student(' + student_data.indexOf(student) + ')"><i class="fa-solid fa-trash"></i></button>'];
        t1.row.add(personal_info_row).draw();

        // edu info table
        student.education.forEach(education => {
            let educational_info_row = [education.degree, education.college, education.start_date, education.passout_date, education.percentage, education.backlog];
            t2.row.add(educational_info_row).draw();
        });
    });
}



//------------------form submission---------------------------------------------------------------------------
function submit_data(event) {
    event.preventDefault();

    let edit_index = document.getElementById('edit_index').value;
    
    // if index is set to -1 then add a new row/new user
    if (edit_index === '-1') {
        //if we use add info + button then we add a new user row
        let student_details = {
            first_name: document.getElementById('fname').value,
            last_name: document.getElementById('lname').value,
            dob: document.getElementById('dob').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            graduationYear: document.getElementById('g_year').value,
            education: []
        };
        let education_rows = document.querySelectorAll('.education_row');
        education_rows.forEach(row => {
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
        
        student_data.push(student_details);
    } else {
        // else we update that same row
        let student = student_data[edit_index];
        student.first_name = document.getElementById('fname').value;
        student.last_name = document.getElementById('lname').value;
        student.dob = document.getElementById('dob').value;
        student.email = document.getElementById('email').value;
        student.address = document.getElementById('address').value;
        student.graduationYear = document.getElementById('g_year').value;

        let education_rows = document.querySelectorAll('.education_row');
        student.education = [];
        education_rows.forEach(row => {
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

    // to reupdate the tables with new data
    update_tables();

    document.querySelector('form').reset();  //to clear the form inputs

    alert("Info updated successfully");

    
}
//json datatables
$(document).ready(function() {
    $('.t1').DataTable();
    $('.t2').DataTable();
});


// deleting whole row using index 
function delete_student(index) {
    student_data.splice(index, 1);
    //here index tells us the position and 1 tells us number of positions after index to delete
    update_tables();
    //after deletion as well we need to update the tables to see the change
}

// editing the specific student
function edit_row(index) {
    let student = student_data[index];

    //fetching the values into the form from the table
    document.getElementById("fname").value = student.first_name;
    document.getElementById("lname").value = student.last_name;
    document.getElementById("dob").value = student.dob;
    document.getElementById("email").value = student.email;
    document.getElementById("address").value = student.address;
    document.getElementById("g_year").value = student.graduationYear;

    // clearing all rows
    let education_rows = document.querySelectorAll(".education_row");
    education_rows.forEach(row => row.remove());

    // adding rows again which contain the data
    student.education.forEach((education, row_index) => {
        add_education_row_with_data(education, row_index);
    });

    // not needed uncomment if gets an error 
    // for (let i = student.education.length; i < 2; i++) {
    //     add_row();
    // }

    let modal = document.getElementById("student_form");
    document.getElementById('edit_index').value = index; 
    open_modal(modal);
}
//this is for addind the rows again when click on edit button also the input data is fetched
function add_education_row_with_data(education, row_index) {
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
            ${row_index >= 2 ? '<div class="sub_btn"><button type="button" class="my_btn" onclick="delete_row(this)"> - </button></div>' : '<div class="sub_btn"><span></span></div>'}
        </div>
        <span style="margin-top:15px"></span>
        <hr>
    </div>`;
    document.querySelector(".for_addition").appendChild(new_row);
}


//clearing the values adding blank 2 rows and opening the modal
function initialize_form() {
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dob").value = "2000-01-01";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
    document.getElementById("g_year").value = "2000-01";
    document.getElementById("edit_index").value = "-1";

    // clearing existing rows and adding 2 rows
    let education_rows = document.querySelectorAll(".education_row");
    education_rows.forEach(row => row.remove());

    // adding two blank rows at start
    add_row();
    add_row();

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
