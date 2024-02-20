


function addrow() {

  let newRow = document.createElement('div');

  newRow.innerHTML = `<div>
  <div class="row education_row">
    <div class="col-lg">
        <label for="degree">Degree/Board</label>
        <input type="text" class="form-control degree" placeholder="Enter degree/board"  name="degree">
    </div>
    <div class="col-lg">
        <label for="college">School/College</label>
        <input type="text" class="form-control college" placeholder="Enter your School/College Name"  name="college">
    </div>
    <div class="col-lg">
        <label for="start_date">Start Date</label>
        <input type="month" class="form-control start_date" placeholder="Enter start date"  name="start_date" value="2000-01">
    </div>
    <div class="col-lg">
        <label for="passout_date">Passout year</label>
        <input type="month" class="form-control passout_date" placeholder="Enter passout date"  name="passout_date" value="2000-01">
    </div>
    <div class="col-lg">
        <label for="percentage">Percentage</label>
        <input type="number" class="form-control percentage" placeholder="Dont'use % sign"  name="percentage">
    </div>
    <div class="col-lg">
        <label for="backlog">backlogs</label>
        <input type="number" class="form-control backlog" placeholder="If any"  name="backlog">
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




function submitForm(event) {
    

    event.preventDefault();
   

    let formData = {
        firstName: document.getElementById('fname').value,
        lastName: document.getElementById('lname').value,
        dob: document.getElementById('dob').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        graduationYear: document.getElementById('g_year').value,
        education: []
    };


    let education_row = document.querySelectorAll('.education_row'); 
    education_row.forEach(row => {
        let educationData = {
            degree: row.querySelector('.degree').value,
            college: row.querySelector('.college').value,
            start_date: row.querySelector('.start_date').value,
            passout_date: row.querySelector('.passout_date').value,
            percentage: row.querySelector('.percentage').value,
            backlog: row.querySelector('.backlog').value
        };
        formData.education.push(educationData);


        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="t_degree">${educationData.degree}</td>
            <td class="t_college">${educationData.college}</td>
            <td class="t_start_date">${educationData.start_date}</td>
            <td class="t_passout_date">${educationData.passout_date}</td>
            <td class="t_percentage">${educationData.percentage}</td>
            <td class="t_backlog">${educationData.backlog}</td>
        `;
        document.querySelector('.t2 tbody').appendChild(newRow);
    });

    
    let jsonData = JSON.stringify(formData);

   
    document.querySelector('.form_content').innerText = jsonData;


    // for table
    document.querySelector('.fn').innerText = formData.firstName;
    document.querySelector('.ln').innerText = formData.lastName;
    document.querySelector('.birthdate').innerHTML =formData.dob;
    document.querySelector('.mail').innerHTML=formData.email;
    document.querySelector('.add').innerText=formData.address;
    document.querySelector('.gy').innerText=formData.graduationYear;
}
