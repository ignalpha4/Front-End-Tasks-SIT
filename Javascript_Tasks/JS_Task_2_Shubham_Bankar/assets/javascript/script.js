

//-----------------row addtition-------------------------------
function addrow() {

  let newRow = document.createElement('div');

  newRow.innerHTML = `
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
        <label for="backlog">Backlogs</label>
        <input type="number" class="form-control backlog" placeholder="If any"  name="backlog" >
        <div class="backlog_v">
                        
        </div>
        </div>
    <div class="col-lg">
        <div class="sub_btn">
            <button type="button" class="my_btn" onclick="delete_row(this)"> - </button>
        </div>
    </div>
    <span style="margin-top:15px"></span>
     <hr>
  </div> 
 
 
  `;
  
  document.querySelector(".for_addition").append(newRow);


}




//------------------form submission---------------------------------------------------------------------------

function submit_data(event) {

    

    event.preventDefault();

    //clearing the data of the table first so that the issue of the data beign added one below the other doesnt occur
    document.querySelector('.t2 tbody').innerHTML = '';
   
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
   
    // document.querySelector('.form_content').innerText = jsonData;

    console.log(jsonData);


    // for table 1
    document.querySelector('.fn').innerText = student_details.first_name;
    document.querySelector('.ln').innerText = student_details.last_name;
    document.querySelector('.birthdate').innerHTML =student_details.dob;
    document.querySelector('.mail').innerHTML=student_details.email;
    document.querySelector('.add').innerText=student_details.address;
    document.querySelector('.gy').innerText=student_details.graduationYear;

    document.querySelector('.action').innerHTML=`
    <span class="edit-btn" onclick="editRow(this)"><i class="fa-sharp fa-solid fa-pen-to-square fa-lg" style="color: #ff0000;"></i></span>

    <span class="delete" onclick="delete_user(this)"><i class="fa-sharp fa-solid fa-trash fa-lg" style="color: #ff0000;"></i></span>
    `
    document.querySelector('form').reset();


    alert("Info added you can close the form");

}


function open_modal(modal) {
    modal.classList.add("show");
    modal.style.display = "block";
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "false");
}

function close_modal() {
    let modal = document.getElementById('student_form');
    modal.classList.remove('show');
    modal.style.display = 'none';
    modal.setAttribute('aria-modal', 'false');
    modal.setAttribute('aria-hidden', 'true');

}



//to delete the single row from the education column not the whole data
function delete_row(button) {
    let rowToDelete = button.closest(".education_row"); 
    rowToDelete.parentNode.remove(); 
}

function delete_row2(button) {
    let rowToDelete = button.closest(".education_row"); 
    rowToDelete.remove(); 
}


//dob validation
function dob_validation(){


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


//when we click the edit button fetching data and opening modal
function editRow(button) {
    let row = button.closest("tr"); 
    let cells = row.cells; 
    let modal = document.getElementById("student_form");

    // to fetcth the data from the table and add it in the form
    document.getElementById("fname").value = cells[0].textContent;
    document.getElementById("lname").value = cells[1].textContent;
    document.getElementById("dob").value = cells[2].textContent;
    document.getElementById("email").value = cells[3].textContent;
    document.getElementById("address").value = cells[4].textContent;
    document.getElementById("g_year").value = cells[5].textContent;

    // to remove the previous education rows
    let education_rows = document.querySelectorAll(".education_row");
    education_rows.forEach(row => row.remove());

    // to fetch and add data of educaation
    let educationDataRows = document.querySelectorAll(".t2 tbody tr");
    educationDataRows.forEach((row,index) => {
        let educationRow = document.createElement("div");
        educationRow.classList.add("row", "education_row");

        let cells = row.cells;
        let degree = cells[0].textContent;
        let college = cells[1].textContent;
        let startDate = cells[2].textContent;
        let passoutDate = cells[3].textContent;
        let percentage = cells[4].textContent;
        let backlogs = cells[5].textContent;

        console.log(index);

        if(index<2){
            educationRow.innerHTML = `

            <div class="col-lg">
                <label for="degree">Degree/Board</label>
                <input type="text" class="form-control degree" value="${degree}" name="degree" required>
                <div class="degree_v"></div>
            </div>
            <div class="col-lg">
                <label for="college">School/College</label>
                <input type="text" class="form-control college" value="${college}" name="college" required>
                <div class="college_v"></div>
            </div>
            <div class="col-lg">
                <label for="start_date">Start Date</label>
                <input type="month" class="form-control start_date" value="${startDate}" name="start_date" required>
            </div>
            <div class="col-lg">
                <label for="passout_date">Passout year</label>
                <input type="month" class="form-control passout_date" value="${passoutDate}" name="passout_date" required>
                <div class="passout_v"></div>
            </div>
            <div class="col-lg">
                <label for="percentage">Percentage</label>
                <input type="number" class="form-control percentage" value="${percentage}" name="percentage" required>
                <div class="p_v"></div>
            </div>
            <div class="col-lg">
                <label for="backlog">Backlogs</label>
                <input type="number" class="form-control backlog" value="${backlogs}" name="backlog">
                <div class="backlog_v"></div>
            </div>
                <div class="col-lg">
                    
                </div>
                
            </div>
            <span style="margin-top:15px"></span>
            <hr>
        `;
            document.querySelector(".for_addition").appendChild(educationRow);
        }
        else
        {
             educationRow.innerHTML = `

            <div class="col-lg">
                <label for="degree">Degree/Board</label>
                <input type="text" class="form-control degree" value="${degree}" name="degree" required>
                <div class="degree_v"></div>
            </div>
            <div class="col-lg">
                <label for="college">School/College</label>
                <input type="text" class="form-control college" value="${college}" name="college" required>
                <div class="college_v"></div>
            </div>
            <div class="col-lg">
                <label for="start_date">Start Date</label>
                <input type="month" class="form-control start_date" value="${startDate}" name="start_date" required>
            </div>
            <div class="col-lg">
                <label for="passout_date">Passout year</label>
                <input type="month" class="form-control passout_date" value="${passoutDate}" name="passout_date" required>
                <div class="passout_v"></div>
            </div>
            <div class="col-lg">
                <label for="percentage">Percentage</label>
                <input type="number" class="form-control percentage" value="${percentage}" name="percentage" required>
                <div class="p_v"></div>
            </div>
            <div class="col-lg">
                <label for="backlog">Backlogs</label>
                <input type="number" class="form-control backlog" value="${backlogs}" name="backlog">
                <div class="backlog_v"></div>
            </div>
                <div class="col-lg">
                    <div class="sub_btn">
                        <button type="button" class="my_btn" onclick="delete_row2(this)"> - </button>
                    </div>
                </div>
                
            </div>
            <span style="margin-top:15px"></span>
            <hr>
        `;
            document.querySelector(".for_addition").appendChild(educationRow);
        }
        

        
    });

    //after adding the data the modal will be opened
    open_modal(modal);

}






//for the cross symbol
document.querySelector('.btn-close').addEventListener('click', close_modal);

//when we click the close button in the footer then the modal should be closed


document.querySelector('.modal-footer .btn-secondary').addEventListener('click', close_modal);


//for clearing the tab;e data

function delete_user(){

    alert("Info deleted");

    //this to delete the personal details
    //i cannot delete the whole tbody bcoz i need the td to inser the data next time
    document.querySelector('.fn').innerHTML='';
    document.querySelector('.ln').innerHTML='';
    document.querySelector('.birthdate').innerHTML='';
    document.querySelector('.mail').innerHTML='';
    document.querySelector('.add').innerHTML='';
    document.querySelector('.gy').innerHTML='';
    document.querySelector('.action').innerHTML='';
 

    //and this one to dekete the whole table data
    document.querySelector('.t2 tbody').innerHTML = '';
}