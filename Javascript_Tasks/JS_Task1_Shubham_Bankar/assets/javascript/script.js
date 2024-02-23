

//-----------------row addtition-------------------------------
function addrow() {

  let newRow = document.createElement('div');

  newRow.innerHTML = `<div>
  <div class="row education_row">
    <div class="col-lg">
        <label for="degree">Degree/Board</label>
        <input type="text" class="form-control degree" placeholder="Enter degree/board"  name="degree" required>
        <div class="degree_v">
                        
        </div>
    </div>
    <div class="col-lg">
        <label for="college">School/College</label>
        <input type="text" class="form-control college" placeholder="Enter your School/College Name"  name="college" required>
        <div class="college_v">

        </div>
    </div>
    <div class="col-lg">
        <label for="start_date">Start Date</label>
        <input type="month" class="form-control start_date" placeholder="Enter start date"  name="start_date" value="2000-01" required>
    </div>
    <div class="col-lg">
        <label for="passout_date">Passout year</label>
        <input type="month" class="form-control passout_date" placeholder="Enter passout date"  name="passout_date" value="2000-01" required>
        <div class="passout_v">
                        
        </div>
        </div>
    <div class="col-lg">
        <label for="percentage">Percentage</label>
        <input type="number" class="form-control percentage" placeholder="Dont'use % sign"  name="percentage" required>
        <div class="p_v">

        </div>
        </div>
    <div class="col-lg">
        <label for="backlog">backlogs</label>
        <input type="number" class="form-control backlog" placeholder="If any"  name="backlog" >
        <div class="backlog_v">
                        
        </div>
        </div>
    <div class="col-lg">
        <div class="sub_btn">
            <button type="button" class="my_btn" onclick="delete_row(this)"> - </button>
        </div>
    </div>
  </div> 
  <hr>
  </div>
  `;
  
  document.querySelector(".for_addition").append(newRow);
}





function delete_row(button) {
 
  let added_row = button.parentNode.parentNode.parentNode.parentNode;

  added_row.remove();
}





//------------------form submission---------------------------------------------------------------------------

function submit_data(event) {

    

    event.preventDefault();


    //fname validation

    if(validate_fname()==false){
        return false;
    }

    if(validate_fname()==true){
        document.querySelector("#fname").classList.remove("is-invalid");
        document.querySelector("#fname_v").innerHTML=`
        <p></p>`
    }

    //lname validation

    if(validate_lname()==false){
        return false;
    }

    if(validate_lname()==true){
        document.querySelector("#lname").classList.remove("is-invalid");
        document.querySelector("#lname_v").innerHTML=`
        <p></p>`
    }

    //email

    if(validate_mail()==false){
        return false;
    }

    if(validate_mail()==true){
        document.querySelector("#email").classList.remove("is-invalid");
        document.querySelector("#email_v").innerHTML=`
        <p></p>`
    }

    // dob validation

    if(dob_validation()==false)
    {
        return false;
    }
   
    if(dob_validation()==true){
        document.querySelector("#dob").classList.remove("is-invalid");
        document.querySelector("#dob_validate").innerHTML=`
        <p></p>`
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
    let valid_pre=true;

    rows.forEach(row=>{
        if(!validate_percentage(row)){
            valid_pre=false;
        }

        if(validate_percentage(row)){
            row.querySelector(".percentage").classList.remove("is-invalid");
            row.querySelector(".p_v").innerHTML = "";
        }
    })

    if(!valid_pre){
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

    //saving the details n obj
    let student_details = {
        first_name: document.getElementById('fname').value,
        last_name: document.getElementById('lname').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        graduationYear: document.getElementById('g_year').value,
        education: []
    };

    //this is used for to add the education details into the education array 
    let education_row = document.querySelectorAll('.education_row'); 


    education_row.forEach(row => {
        let education_details = {
            degree: row.querySelector('.degree').value,
            college: row.querySelector('.college').value,
            start_date: row.querySelector('.start_date').value,
            passout_date: row.querySelector('.passout_date').value,
            percentage: row.querySelector('.percentage').value,
            backlog: row.querySelector('.backlog').value
        };
        student_details.education.push(education_details);


        // for table 2
        //here table is also created and am adding the educations details as well
        let add_table_row = document.createElement('tr');
        add_table_row.innerHTML = `
            <td class="t_degree">${education_details.degree}</td>
            <td class="t_college">${education_details.college}</td>
            <td class="t_start_date">${education_details.start_date}</td>
            <td class="t_passout_date">${education_details.passout_date}</td>
            <td class="t_percentage">${education_details.percentage}</td>
            <td class="t_backlog">${education_details.backlog}</td>
        `;
        document.querySelector('.t2 tbody').appendChild(add_table_row);
    });

    
    let jsonData = JSON.stringify(student_details,null,1);
   
    document.querySelector('.form_content').innerText = jsonData;


    // for table 1
    document.querySelector('.fn').innerText = student_details.first_name;
    document.querySelector('.ln').innerText = student_details.last_name;
    document.querySelector('.birthdate').innerHTML =student_details.dob;
    document.querySelector('.mail').innerHTML=student_details.email;
    document.querySelector('.add').innerText=student_details.address;
    document.querySelector('.gy').innerText=student_details.graduationYear;

    
    document.querySelector('form').reset();

    document.querySelector('.btn_submit').setAttribute("disabled", "");


}


function dob_validation(){

    //dob validation
    let date=document.querySelector("#dob").value;

    const array = date.split("-");

    if(array[0] > 2006){

        document.querySelector("#dob").classList.add("is-invalid");
        document.querySelector("#dob_validate").innerHTML=

        `<p style="color:red">Age cannot be less than 18</p>
        `

        return false;
    }

 return true;
}

//fname validation
function validate_fname(){
    let fname=document.getElementById("fname").value;

    let reg = /^[a-zA-Z]+$/;

    if(!reg.test(fname)){
        
        document.querySelector("#fname").classList.add("is-invalid");
        document.querySelector("#fname_v").innerHTML=`
        <p style="color:red">Name should contain only alphabets</p>
        `
        return false;
    }

    return true;
}

//lname validation
function validate_lname(){
    let lname=document.getElementById("lname").value;

    let reg = /^[a-zA-Z]+$/;

    if(!reg.test(lname)){
        
        document.querySelector("#lname").classList.add("is-invalid");
        document.querySelector("#lname_v").innerHTML=`
        <p style="color:red">Name should contain only alphabets</p>
        `
        return false;
    }

    return true;
}


function validate_mail(){
    let mail=document.querySelector("#email").value;

    let reg=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ;

    if(!reg.test(mail)){
        document.querySelector("#email").classList.add("is-invalid");
        document.querySelector("#email_v").innerHTML=`
        <p style="color:red">Please enter a valid email address</p>`
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

    if (start[0] > passout[0]) {
        row.querySelector(".passout_date").classList.add("is-invalid");
        row.querySelector(".passout_v").innerHTML = `
            <p style="color:red">Passout year cannot be less than start date</p>
        `;
        return false;
    }
    return true;
}


//validate Percentage

function validate_percentage(row){

    let per=row.querySelector(".percentage").value;

    if(per<0){
        row.querySelector(".percentage").classList.add("is-invalid");
        row.querySelector(".p_v").innerHTML = `
            <p style="color:red">Please enter positive value for percentage</p>
        `;
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