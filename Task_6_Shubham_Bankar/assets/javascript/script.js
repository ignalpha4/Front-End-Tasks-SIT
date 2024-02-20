


function addrow() {

  let newRow = document.createElement('div');
  newRow.innerHTML = `<div>
  <div class="row" id="education_row">
    <div class="col-lg">
        <label for="degree">Degree/Board</label>
        <input type="text" class="form-control" placeholder="Enter degree/board" id="degree" name="degree">
    </div>
    <div class="col-lg">
        <label for="college">School/College</label>
        <input type="text" class="form-control" placeholder="Enter your School/College Name" id="college" name="college">
    </div>
    <div class="col-lg">
        <label for="start_date">Start Date</label>
        <input type="date" class="form-control" placeholder="Enter start date" id="start_date" name="start_date">
    </div>
    <div class="col-lg">
        <label for="passout_date">Passout year</label>
        <input type="date" class="form-control" placeholder="Enter passout date" id="passout_date" name="passout_date">
    </div>
    <div class="col-lg">
        <label for="percentage">Percentage</label>
        <input type="number" class="form-control" placeholder="Dont'use % sign" id="percentage" name="percentage">
    </div>
    <div class="col-lg">
        <label for="backlog">backlogs</label>
        <input type="number" class="form-control" placeholder="If any" id="backlog" name="backlog">
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
  
  document.querySelector(".for_addition").appendChild(newRow.firstChild);
}



function delete_row(button) {
 
  let added_row = button.parentNode.parentNode.parentNode.parentNode;

  added_row.remove();
}