let company_data = [];
let count_emp = 0;

let total_salary = 0;
let name_validation = true;

let dob_validation = true;

let mail_validation = true;

let cnt = 0;
$(document).ready(function () {
    $('.t1').DataTable();
});

let row_cnt = 0;

function add_row() {
    row_cnt++;

    let row = document.createElement('div');
    row.classList.add('emp_rows');

    if (row_cnt <= 10) {
        row.innerHTML = `
        <hr>
                                <div class="row">
                               
                                        <div class="col-lg">
                                            <label for="emp_name" class="form-label">Employee Name</label>
                                            <input type="text" class="form-control emp_name"  required oninput="validate_name(this)" />
                                            <p class="text-danger"></p>
                                        </div>
                                        <div class="col-lg">
                                            <label for="emp_dob" class="form-label">Employee DOB</label>
                                            <input type="date" class="form-control emp_dob"  required oninput="validate_dob(this)"/>
                                            <p class="text-danger"></p>
                                      
                                        </div>
                                        <div class="col-lg">
                                            <label for="emp_salary" class="form-label">Employee Salary</label>
                                            <input type="number" class="form-control emp_salary" min=1 required />
                                        </div>
                                    </div>
    
                                    <div class="row">
                                        <div class="col-lg">
                                            <label for="emp_joining" class="form-label">Joining Date</label>
                                            <input type="Date" class="form-control emp_joining"  required  max="2024-08-04"/>
                                        </div>
                                        <div class="col-lg">
                                            <label for="emp_email" class="form-label">Employee Email</label>
                                            <input type="text" class="form-control emp_email"  required oninput="validate_mail(this)" />
                                            <p class="text-danger"></p>
                                        </div>
                                        <div class="col-lg">
                                            <label for="emp_address" class="form-label">Employee Address</label>
                                            <textarea class="form-control emp_address"  rows="2" required></textarea>
                                        </div>
    
                                        <div class="col-lg">
                                        ${row_cnt > 1 ? `<button class="btn btn-primary btn-sm" onclick="remove_row(this)">Remove row</button>` : ``}
                                        </div>
                                    </div>
        
        `;
    } else {
        row.innerHTML = ``;
    }

    $('.for_row_addition').append(row);
}

function remove_row(btn) {
    row_cnt = row_cnt - 1;

    let row = btn.parentNode.parentNode.parentNode;
    row.remove();
}

function submit_data(event) {
    event.preventDefault();

    if (!name_validation) {
        return false;
    }

    if (!dob_validation) {
        return false;
    }

    if (!mail_validation) {
        return false;
    }
    let edit_index = $('#edit_index').val();

    let dept_data = {
        dept_name: $('#dept_name').val(),
        dept_desc: $('#dept_desc').val(),
        dept_state: $('#dept_state').val(),
        dept_city: $('#dept_city').val(),
        emp: [],
    };

    let emp_row = document.querySelectorAll('.emp_rows');

    emp_row.forEach(emp => {
        count_emp++;
        let emp_data = {
            emp_name: $(emp).find('.emp_name').val(),
            emp_dob: $(emp).find('.emp_dob').val(),
            emp_salary: $(emp).find('.emp_salary').val(),
            emp_joining: $(emp).find('.emp_joining').val(),
            emp_email: $(emp).find('.emp_email').val(),
            emp_address: $(emp).find('.emp_address').val(),
        };

        dept_data.emp.push(emp_data);
    });

    if (edit_index == '-1') {
        company_data.push(dept_data);
    } else {
        company_data[edit_index] = dept_data;
    }

    $('#edit_index').val('-1');
    alert('info added close modal');
    console.log(company_data);


    update_tables();
}




function update_tables() {
    let t1 = $('.t1').DataTable();
    t1.clear().draw();

    company_data.forEach((info, index) => {
        let emp_data = create_emp_data_table(info, index);
        let dept_data = create_dept_data(t1, info, index);

        t1.row(dept_data).child(emp_data).show();
    });
}

function create_dept_data(t1, info, index) {
    let dept_data = t1.row
        .add([
            `    <button type="button" class="btn btn-primary toggle-btn" onclick="toggle_emp(${index})" >v</button>`,
            info.dept_name,
            info.dept_desc,
            count_emp,
            total_salary,
            info.dept_city,
            info.dept_state,
            `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalId" onclick="edit_data(${index})" >Edit</button>`,
            `<button type="button" class="btn btn-danger" onclick="delete_data(${index})" >Delete</button>`,
        ])
        .draw(true)
        .node();

    return dept_data;
}

function create_emp_data_table(info, index) {
    let emp_table = $('<table>')
        .addClass('table table-bordered emp_table')
        .attr('emp_index', index);

    let thead = $('<thead>');

    count_emp = 0;

    total_salary = 0;

    thead.append(
        $('<th>').text('emp number'),
        $('<th>').text('employee Name'),
        $('<th>').text('Age'),
        $('<th>').text('Experience'),
        $('<th>').text('Salary'),
        $('<th>').text('Email'),
        $('<th>').text('Address')
    );

    let tbody = $('<tbody>');

    info.emp.forEach((emp, count) => {
        //count emloyees;

        count_emp++;

        total_salary += parseFloat(emp.emp_salary);
        //age calculation
        let today =new Date().getFullYear();

        let year = emp.emp_dob.split('-');

        let age = today - year[0];

        console.log(age);

        //calcualte experience
        let today2 =  new Date().getFullYear();

        let exp_year = emp.emp_joining.split('-');

        let exp = today2 - exp_year[0];

        let row = $('<tr>');

        row.append(
            $('<td>').text(count + 1),
            $('<td>').text(emp.emp_name),
            $('<td>').text(age),
            $('<td>').text(exp),
            $('<td>').text(emp.emp_salary),
            $('<td>').text(emp.emp_email),
            $('<td>').text(emp.emp_address)
        );

        tbody.append(row);
    });

    emp_table.append(thead, tbody);

    return emp_table;
}

function toggle_emp(index) {
    $('.emp_table[emp_index="' + index + '"').toggle();
}

function delete_data(index) {
    if (window.confirm('Do you wnat to delete teh dept details?')) {
        company_data.splice(index, 1);
        alert('info_deleted');
        update_tables();
    }
}

function edit_data(index) {
    let dept = company_data[index];

    $('.dept_name').val(dept.dept_name);
    $('.dept_desc').val(dept.dept_desc);
    $('.dept_state').val(dept.dept_state);
    $('.dept_city').val(dept.dept_city);

    $('.emp_rows').each(function (i) {
        if (dept.emp[i]) {
            $(this).find('.emp_name').val(dept.emp[i].emp_name);
            $(this).find('.emp_dob').val(dept.emp[i].emp_dob);
            $(this).find('.emp_salary').val(dept.emp[i].emp_salary);
            $(this).find('.emp_joining').val(dept.emp[i].emp_joining);
            $(this).find('.emp_email').val(dept.emp[i].emp_email);
            $(this).find('.emp_address').val(dept.emp[i].emp_address);
        }
    });

    $('#edit_index').val(index);
}

function form_generate() {
    document.querySelector('.employee_form').reset();

    $('.emp_rows').remove();

    add_row();

    $('#edit_index').val('-1');
}

function validate_name(name_row) {
    let name = $(name_row);

    let regex = /^[a-zA-z\s]+$/;

    if (!regex.test(name.val())) {
        name.next().text('Only Alphabets Allowed');
        name.addClass('is-invalid').removeClass('is-valid');
        name_validation = false;
    } else {
        name.next().text('');
        name.addClass('is-valid').removeClass('is-invalid');
        name_validation = true;
    }
}

function validate_mail(mail_row) {
    let mail = $(mail_row);

    let regex = /^[a-zA-z0-9-_\.]+@[a-zA-z]+\.[a-zA-z]{0,3}$/;

    if (!regex.test(mail.val())) {
        mail.next().text('Enter valid email address');
        mail.addClass('is-invalid').removeClass('is-valid');
        mail_validation = false;
    } else {
        mail.next().text('');
        mail.addClass('is-valid').removeClass('is-invalid');
        mail_validation = true;
    }
}

function validate_dob(dob_row) {
    let row = $(dob_row);

    let dob = $(dob_row).val();

    let today_year = new Date().getFullYear();
    console.log(today_year)

    let dob_array = dob.split('-');

    let dob_year = dob_array[0];


    if (parseInt(dob_year) + 17 > today_year) {
        row.next().text('age cannot be less than 18');
        row.addClass('is-invalid').removeClass('is-valid');
        dob_validation = false;
    } else {
        row.next().text('');
        row.addClass('is-valid').removeClass('is-invalid');
        dob_validation = true;
    }
}

function show_cities(state_rows) {
    let state_row = $(state_rows);

    let state = $(state_row).val();

    console.log(state);

    if ((state == 'maharashtra' )) {
        let option1 = $("<option>").val("mumbai").text("mumbai").addClass("city");
        let option2 = $('<option>').val('Pune').text('Pune').addClass('city');

        $('#dept_city').empty().append(option1, option2);

    } else if ((state == 'gujarat')) {

        let option1 = $('<option>').val('ahmedabad').text('ahmedabad').addClass('city');
        let option2 = $('<option>').val('surat').text('surat').addClass('city');

        $('#dept_city').empty().append(option1, option2);
    }
}
