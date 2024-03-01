//to store the details of the student

let student_data = []; 

//-----------------row addition-------------------------------
function add_row() {

    let new_row = $('<div>').addClass('row education_row');

    // to check for first two rows.so that - button should be added to the 3rd onwards
    const is_initial_row = $('.education_row').length < 2;

    new_row.html(`
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
    `);

    $(".for_addition").append(new_row);
}


function delete_row(button){
    let row=button.parentNode.parentNode.parentNode;
    row.remove();
}

// Function to update the HTML tables with student data

// Function to update the HTML tables with student data
function update_tables() {
    // Clearing the data present in the table
    let t1 = $('.t1').DataTable();
    t1.clear().draw();

    // For each student in the array, we are recreating the table
    student_data.forEach((student, index) => {
        // Personal info row
        let personal_info_row = [
            student.first_name,
            student.last_name,
            student.dob,
            student.email,
            student.address,
            student.graduationYear,
            `<button type="button" class="btn btn-primary btn-sm" onclick="edit_row(${index})"><i class="fa-solid fa-pen-to-square fa-lg"></i></button><button type="button" class="btn btn-danger btn-sm" onclick="delete_student(${index})"><i class="fa-solid fa-trash"></i></button>`
        ];
        t1.row.add(personal_info_row);

        // Dropdown container row
        let dropdownContainer = ['<div class="dropdown-container" style="display: none;"><div class="dropdown-content"></div></div>', '', '', '', '', '', '']; // Added dropdown container
        t1.row.add(dropdownContainer);
    });

    t1.draw();
}

// Handle click event on a row in the personal info table
// Function to update the HTML tables with student data
function update_tables() {
    // Clearing the data present in the table
    let t1 = $('.t1').DataTable();
    t1.clear().draw();

    // For each student in the array, we are recreating the table
    student_data.forEach((student, index) => {
        // Personal info row
        let personal_info_row = [
            student.first_name,
            student.last_name,
            student.dob,
            student.email,
            student.address,
            student.graduationYear,
            `<button type="button" class="btn btn-primary btn-sm" onclick="edit_row(${index})"><i class="fa-solid fa-pen-to-square fa-lg"></i></button><button type="button" class="btn btn-danger btn-sm" onclick="delete_student(${index})"><i class="fa-solid fa-trash"></i></button>`
        ];
        t1.row.add(personal_info_row);

        // Dropdown container row
        let dropdownContainer = ['<div class="dropdown-container" style="display: none;"><div class="dropdown-content"></div></div>', '', '', '', '', '', '']; // Added dropdown container
        t1.row.add(dropdownContainer);
    });

    t1.draw();
}

// Handle click event on a row in the personal info table
$('.t1 tbody').on('click', 'tr', function() {
    let rowIndex = $('.t1').DataTable().row(this).index();

    // Toggle visibility of dropdown container
    let dropdownContainer = $('.dropdown-container').eq(rowIndex);
    dropdownContainer.toggle();

    // Populate the dropdown with the educational details of the clicked student
    let dropdownContent = dropdownContainer.find('.dropdown-content');
    dropdownContent.empty();
    let student = student_data[rowIndex];
    student.education.forEach(education => {
        dropdownContent.append(`<div><strong>Degree/Board:</strong> ${education.degree}</div>`);
        dropdownContent.append(`<div><strong>College/School:</strong> ${education.college}</div>`);
        dropdownContent.append(`<div><strong>Start Date:</strong> ${education.start_date}</div>`);
        dropdownContent.append(`<div><strong>Passout Date:</strong> ${education.passout_date}</div>`);
        dropdownContent.append(`<div><strong>Percentage:</strong> ${education.percentage}</div>`);
        dropdownContent.append(`<div><strong>Backlogs:</strong> ${education.backlog}</div>`);
        dropdownContent.append('<hr>');
    });
});

// Function to update the tables when the page loads
$(document).ready(function() {
    $('.t1').DataTable();
    update_tables();
});





//------------------form submission---------------------------------------------------------------------------
function submit_data(event) {
    event.preventDefault();

    let edit_index = $('#edit_index').val();

    //----------------All validation checks--------------------
        //fname validation

        if(validate_fname()==false){
            return false;
        }
    
        if(validate_fname()==true){
            $("#fname").removeClass("is-invalid");
            $("#fname_v").html(`<p></p>`)
        }
    
        //lname validation
    
        if(validate_lname()==false){
            return false;
        }
    
        if(validate_lname()==true){
            $("#lname").removeClass("is-invalid");
            $("#lname_v").html(`<p></p>`)
        }
    
        //email
    
        if(validate_mail()==false){
            return false;
        }
    
        if(validate_mail()==true){
            $("#email").removeClass("is-invalid");
            $("#email_v").html(`<p></p>`)
        }
    
        // dob validation
    
        if(dob_validation()==false)
        {
            return false;
        }
       
        if(dob_validation()==true){
            $("#dob").removeClass("is-invalid");
            $("#dob_validate").html(`<p></p>`);
        }
    
    
        //-----------------------------education validation-------------------------
    
        //degree +college 2 fields
    
        let rows = document.querySelectorAll('.education_row');
        let degree_clg_valid = true;
    
        rows.forEach(row => {
            if (!validate_degree(row) || !validate_college(row)) {
                degree_clg_valid = false;
            }
            if(validate_degree(row)){
                row.querySelector(".degree").classList.remove("is-invalid");
                row.querySelector(".degree_v").innerHTML = "";
            }
            if(validate_college(row)){
                       
            row.querySelector(".college").classList.remove("is-invalid");
            row.querySelector(".college_v").innerHTML = "";
            }
        });
    
        
        if (!degree_clg_valid) {
            return false;
        }
    
    
    
    
        //passout
    
        rows = document.querySelectorAll('.education_row');
        let passout_valid = true;
    
        rows.forEach(row => {
            if (!validate_passout(row)) {
                passout_valid = false;
            }
    
            if(validate_passout(row)){
                      
            row.querySelector(".passout_date").classList.remove("is-invalid");
            row.querySelector(".passout_v").innerHTML = "";
            }
        });
    
        
        if (!passout_valid) {
            return false;
        }
    
        //percentage
    
        rows=document.querySelectorAll(".education_row");
        let valid_per=true;
    
        rows.forEach(row=>{
            if(!validate_percentage(row)){
                valid_per=false;
            }
    
            if(validate_percentage(row)){
                row.querySelector(".percentage").classList.remove("is-invalid");
                row.querySelector(".p_v").innerHTML = "";
            }
        })
    
        if(!valid_per){
            return false;
        }
    
        //backlogs
    
        rows=document.querySelectorAll(".education_row");
        let valid_backlogs=true;
    
        rows.forEach(row=>{
            if(!validate_backlog(row)){
                valid_backlogs=false;
            }
    
            if(validate_backlog(row)){
                row.querySelector(".backlog").classList.remove("is-invalid");
                row.querySelector(".backlog_v").innerHTML = "";
            }
        })
    
        if(!valid_backlogs){
            return false;
        }

    
    // if index is set to -1 then add a new row/new user
    if (edit_index === '-1') {
        //if we use add info + button then we add a new user row
        let student_details = {
            first_name: $('#fname').val(),
            last_name: $('#lname').val(),
            dob:$('#dob').val(),
            email: $('#email').val(),
            address: $('#address').val(),
            graduationYear: $('#g_year').val(),
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

        student.first_name = $('#fname').val();
        student.last_name = $('#lname').val();
        student.dob = $('#dob').val();
        student.email = $('#email').val();
        student.address =$('#address').val();
        student.graduationYear = $('#g_year').val();

        let education_rows = document.querySelectorAll('.education_row');
        //clearing the values first
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

    $('form').trigger('reset');  //to clear the form inputs

    alert("Info updated successfully");

    
}


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
    $(".education_row").remove();

    // adding rows again which contain the data
    student.education.forEach((education, row_index) => {
        add_education_row_with_data(education, row_index);
    });

    // not needed uncomment if gets an error 
    // for (let i = student.education.length; i < 2; i++) {
    //     add_row();
    // }

    let modal = $("#student_form");
    $("#edit_index").val(index);
    open_modal(modal[0]);
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
    $(".for_addition").append(new_row);
}


//clearing the values adding blank 2 rows and opening the modal
function initialize_form() {
    $("#fname").val("");
    $("#lname").val("");
    $("#dob").val("2000-01-01");
    $("#email").val("");
    $("#address").val("");
    $("#g_year").val("2000-01");
    $("#edit_index").val("-1");

    // clearing existing rows and adding 2 rows
    $(".education_row").remove();

    // adding two blank rows at start
    add_row();
    add_row();

    let modal = document.getElementById("student_form");
    open_modal(modal);
}



//for opening the modal

function open_modal(modal) {
    $(modal).addClass("show");
    $(modal).css("display", "block");
    $(modal).attr("aria-modal", "true");
    $(modal).attr("aria-hidden", "false");
}


//for closing the modals
document.querySelector('.btn-close').addEventListener('click', close_modal);

document.querySelector('.modal-footer .btn-secondary').addEventListener('click', close_modal);

function close_modal() {
    let modal = $('#student_form')[0];
    $(modal).removeClass('show');
    $(modal).css("display","none");
    $(modal).attr('aria-modal', 'false');
    $(modal).attr('aria-hidden', 'true');

}


//-------------whole validation-----------------

//fname validation 
function validate_fname(){
    let fname=$("#fname").val();

    let reg = /^[a-zA-Z]+$/;

    if(!reg.test(fname)){
        
        $("#fname").addClass("is-invalid");
        $("#fname_v").html(`<p style="color:red">Name should contain only alphabets</p>`);
        return false;
    }

    return true;
}

//lname validation
function validate_lname(){
    let lname=$("#lname").val();

    let reg = /^[a-zA-Z]+$/;

    if(!reg.test(lname)){
        
        $("#lname").addClass("is-invalid");
        $("#lname_v").html(`<p style="color:red">Name should contain only alphabets</p>`)
        return false;
    }

    return true;
}
//dob validation
function dob_validation(){

    let date=$("#dob").val();

    const array = date.split("-");

    if(array[0] > 2006){

        $("#dob").addClass("is-invalid");
        $("#dob_validate").html(`<p style="color:red">Age cannot be less than 18</p>`);
        return false;
    }

 return true;
}

function validate_mail(){
    let mail=$("#email").val();

    let reg=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ;

    if(!reg.test(mail)){
        $("#email").addClass("is-invalid");
        $("#email_v").html(`<p style="color:red">Please enter a valid email address</p>`)
        return false;
    }

    return true;
}


//--------------------education validation-----------------------------

function validate_degree(row) {
    let degree = row.querySelector(".degree").value;

    let reg = /^[a-zA-Z\s]+$/;

    if (!reg.test(degree)) {
        row.querySelector(".degree").classList.add("is-invalid");
        row.querySelector(".degree_v").innerHTML = `
            <p style="color:red">Enter the correct Board/Degree</p>
        `;
        return false;
    } 
    return true;
}


function validate_college(row) {
    let college = row.querySelector(".college").value;
    let reg = /^[a-zA-Z\s]+$/;

    if (!reg.test(college)) {
        row.querySelector(".college").classList.add("is-invalid");
        row.querySelector(".college_v").innerHTML = `
            <p style="color:red">Enter the correct School/College Name</p>
        `;
        return false;
    } 

    return true;
}



function validate_passout(row) {
    let start_date = row.querySelector(".start_date").value;
    let passout_date = row.querySelector(".passout_date").value;

    let start = start_date.split("-");
    let passout = passout_date.split("-");

    if (start[0] >= passout[0]) {
        row.querySelector(".passout_date").classList.add("is-invalid");
        row.querySelector(".passout_v").innerHTML = `
            <p style="color:red">Passout year cannot be less or equal to start date</p>
        `;
        return false;
    }
    return true;
}


//validate Percentage

function validate_percentage(row){

    let per=row.querySelector(".percentage").value;

    if(per<0 || per>100){
        row.querySelector(".percentage").classList.add("is-invalid");
        row.querySelector(".p_v").innerHTML = `
            <p style="color:red">Enter Percentage between 0 and 100</p>
        `
        ;
        return false;
    }

    return true;
}

// validate backlogs

function validate_backlog(row){

    let logs=row.querySelector(".backlog").value;

    if((logs<0) || (logs>15)){
        row.querySelector(".backlog").classList.add("is-invalid");
        row.querySelector(".backlog_v").innerHTML = `
            <p style="color:red">Backlogs must be between 0-15</p>
        `;
        return false;
    }

    return true;
}
