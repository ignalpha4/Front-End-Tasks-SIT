

//-----------------row addtition-------------------------------
function addrow() {

  let newRow = document.createElement('div');

  newRow.innerHTML = `<div>
  <div class="row education_row">
    <div class="col-lg">
        <label for="degree">Degree/Board</label>
        <input type="text" class="form-control degree" placeholder="Enter degree/board"  name="degree" required>
    </div>
    <div class="col-lg">
        <label for="college">School/College</label>
        <input type="text" class="form-control college" placeholder="Enter your School/College Name"  name="college" required>
    </div>
    <div class="col-lg">
        <label for="start_date">Start Date</label>
        <input type="month" class="form-control start_date" placeholder="Enter start date"  name="start_date" value="2000-01" required>
    </div>
    <div class="col-lg">
        <label for="passout_date">Passout year</label>
        <input type="month" class="form-control passout_date" placeholder="Enter passout date"  name="passout_date" value="2000-01" required>
    </div>
    <div class="col-lg">
        <label for="percentage">Percentage</label>
        <input type="number" class="form-control percentage" placeholder="Dont'use % sign"  name="percentage" required>
    </div>
    <div class="col-lg">
        <label for="backlog">backlogs</label>
        <input type="number" class="form-control backlog" placeholder="If any"  name="backlog" >
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
}
