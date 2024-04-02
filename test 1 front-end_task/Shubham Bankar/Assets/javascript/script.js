
const food_details=[];


$(document).ready(function () {
    $(".t1").DataTable();

    update_active_val()
});

function update_active_val() {
    const checkbox1 = $('#cat_active');
    const checkbox2=$('#item_active');
    const active_val1 = checkbox1.is(':checked') ? 'Yes' : 'No';
    const active_val2 = checkbox2.is(':checked') ? 'Yes' : 'No';



    checkbox1.val(active_val1);
    checkbox2.val(active_val2)
}
$('#cat_active').change(function() {
    update_active_val() ;
});


$('#item_active').change(function() {
    update_active_val() ;
});

// to add row in form 
function addrow(){
    let row = document.createElement('div'); 
    row.classList.add('item_rows');  

    console.log("inside addrow")

    const base_rows = $('.item_rows').length < 1;


    row.innerHTML=`
    <hr>
    <div class="row">
        <div class="col-lg">
            <label for="item_name">Item Name</label>
            <input type="text" class="form-control item_name" required>
            <div class="iname_v"></div>
        </div>
    
        <div class="col-lg">
            <label for="item_desc">Item Description</label>
            <input type="text" class="form-control item_desc" >
            <div class="idesc_v"></div>
        </div>
    
        <div class="col-lg">
            <label for="food_type" class="form-label">Food type</label>
            <select class="form-select form-select-lg food_type" name="food_type"  required value="veg">
                <option value="veg" selected>Veg</option>
                <option value="non_veg">Non-veg</option>
                <option value="sea_food">Sea Food</option>
            </select>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-lg">
            <label for="price">Price</label>
            <input type="number" class="form-control price" id="" required>
            <div class="price_v"></div>
        </div>
    
        <div class="col-lg">
            <label for="discount">Discount</label>
            <input type="number" class="form-control discount" id="">
            <div class="d_v"></div>
        </div>
    
        <div class="col-lg">
            <label for="gst">GST</label>
            <input type="text" class="form-control gst" id="" required>
            <div class="gst_v"></div>
        </div>
    
        <div class="col-lg">
            <label for="item_active">Active</label>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="item_active" checked>
                <label class="form-check-label" for="item_active">Yes</label>
            </div>
        </div>

        <div class="col-lg">
        ${base_rows ? '' : `<div class="sub_btn"><button type="button" class="my_btn btn btn-primary mt-4" onclick="remove_row(this)"> Remove Item </button></div>`}
        </div>
    
    </div>
    </div>
    `
    $(".for_adding_row").append(row);
}

// for removing row from form 
function remove_row(button){
    let removed_row=button.parentNode.parentNode.parentNode.parentNode;
    removed_row.remove();
}
//for deleting whole category
function delete_row(index){

    if (window.confirm("Are you sure you want to delete this row?")) {
        alert('info deleted');
        food_details.splice(index, 1);
        update_table();
    }



}

function submit_data(event){

    event.preventDefault();
    console.log("inside submit")

    let edit_index = $('#edit_index').val();

    /*validation code*/
    

    if(!validate_cname()){
        return false;
    }

    if(validate_cname()){
        document.querySelector('#category_name').classList.remove("is-invalid")
        document.querySelector('.cname_v').innerHTML=`
        `
    }

    if(!validate_cdesc()){
        return false;
    }

    if(validate_cdesc()){
        document.querySelector('#category_desc').classList.remove("is-invalid")
        document.querySelector('.c_desc_v').innerHTML=`
        `
    }

    if(!validate_date()){
        return false;
    }

    if(validate_date()){
        document.querySelector('#date').classList.remove("is-invalid")
        document.querySelector('.date_v').innerHTML=`
        `
    }

    /*item validation*/

    let rows = document.querySelectorAll('.item_rows');
    let validation_check = true;

    rows.forEach(row => {
        let validationPassed = true;
    
        if (!validate_iname(row)) {
            validationPassed = false;
        }
    
        if (!validate_idesc(row)) {
            validationPassed = false;
        }
    
        if (!validate_price(row)) {
            validationPassed = false;
        }
    
        if (!validate_discount(row)) {
            validationPassed = false;
        }
    
        if (!validate_gst(row)) {
            validationPassed = false;
        }
    
        if (!validationPassed) {
            validation_check = false;
        } else {
            row.querySelector('.item_name').classList.remove("is-invalid");
            row.querySelector('.idesc_v').innerHTML = '';
            row.querySelector('.price').classList.remove("is-invalid");
            row.querySelector('.price_v').innerHTML = '';
            row.querySelector('.discount').classList.remove("is-invalid");
            row.querySelector('.d_v').innerHTML = '';
            row.querySelector('.gst').classList.remove("is-invalid");
            row.querySelector('.gst_v').innerHTML = '';
        }
    });
    

    if(!validation_check){
        return false;
    }
   
    /*-------------------------------------------------------*/

    


    if(edit_index=="-1"){

        let category_details = {
            category_name:$('#category_name').val(),
            category_desc:$('#category_desc').val(),
            cat_active:$("#cat_active").val(),
            date:$('#date').val(),
            item:[],
        };

        let item_rows=document.querySelectorAll(".item_rows");


        item_rows.forEach(row=> {
         
            let item_details = {
                item_name: row.querySelector(".item_name").value,
                item_desc: row.querySelector(".item_desc").value,
                food_type: row.querySelector(".food_type").value,
                price: row.querySelector(".price").value,
                discount: row.querySelector(".discount").value,
                gst: row.querySelector(".gst").value,
                active: row.querySelector("#item_active").value, 
            };
        
            category_details.item.push(item_details);
        });
        
        food_details.push(category_details);
    }else{
        
        let food=food_details[edit_index];

        food.category_name= $('#category_name').val(),
        food.category_desc=$('#category_desc').val(),
        food.cat_active=$("#cat_active").val(),
        food.date=$('#date').val()

        let item_rows=document.querySelectorAll(".item_rows");

        food.item=[];//cleared previous values

        item_rows.forEach(row=> {
         
            let item_details = {
                item_name: row.querySelector(".item_name").value,
                item_desc: row.querySelector(".item_desc").value,
                food_type: row.querySelector(".food_type").value,
                price: row.querySelector(".price").value,
                discount: row.querySelector(".discount").value,
                gst: row.querySelector(".gst").value,
                active: row.querySelector("#item_active").value, 
            };
        
            food.item.push(item_details);
        });


    }

    update_table();


    document.querySelector(".product").reset();

    alert("info updated you can close the form");

    $('#edit_index').val("-1");  //reseting index


}   

function update_table(){
    let t1=$('.t1').DataTable();
    t1.clear().draw();

    food_details.forEach(food=>{

        let cat_details_obj={
            toggle_button:'<div class="toggle"><button type="button" class="btn btn-primary btn-sm toggle-btn" onclick="toggle_items(' + food_details.indexOf(food) + ')">v</button></div>',
            category_name:food.category_name,
            category_desc:food.category_desc,
            cat_active:food.cat_active,
            date:food.date,

            edit_button: '<div class="edit_btn"><button type="button" class="btn btn-primary btn-sm" onclick="edit_row(' + food_details.indexOf(food) + ')">Edit</button></div>',
            delete_button: '<div class="del_btn"><button type="button" class="btn btn-danger btn-sm" onclick="delete_row(' + food_details.indexOf(food) + ')">Delete</button></div>'
        }

        let cat_row=t1.row.add(Object.values(cat_details_obj)).draw(true).node();

        $(cat_row).data('food_details',cat_details_obj);

        let item_table= $('<table>').addClass('table table-bordered item_d_table').attr('data-item-index', food_details.indexOf(food));
        let t_head=$('<thead>').addClass("item_head").append(
            `<tr>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Food Type</th>
            <th>Price</th>
            <th>Discount(%)</th>
            <th>Discounted Price</th>
            </tr>`
        )
        let t_body=$('<tbody>');

        let total_price=0;
        let total_discount=0;

        food.item.forEach(item=>{

            console.log("item price:",item.price);
            console.log("item discount:",item.discount);

            let d_amt =(parseFloat(item.price) * item.discount) / 100;
            let d_price = parseFloat(item.price)- d_amt;

            total_price+=parseFloat(item.price);
            total_discount+=d_price;

            console.log("d_amt=",d_amt);
            console.log("d_price=",d_price);
            

            let item_row=$('<tr>');
            
            item_row.append($('<td>').text(item.item_name));
            item_row.append($('<td>').text(item.item_desc));
            item_row.append($('<td>').text(item.food_type));
            item_row.append($('<td>').text(item.price));
            item_row.append($('<td>').text(item.discount));
            item_row.append($('<td>').text(d_price));   
            
            t_body.append(item_row);
        });

            
        let total_row = $('<tr>');
        total_row.append($('<td>').text('Total'));
        total_row.append($('<td>').text(''));
        total_row.append($('<td>').text(''));
        total_row.append($('<td>').text(total_price));
        total_row.append($('<td>').text(''));
        total_row.append($('<td>').text(total_discount)); 

        t_body.append(total_row);  
        

        item_table.append(t_head);
        item_table.append(t_body);
        
        t1.row(cat_row).child(item_table.prop('outerHTML')).show();
    });
}

function toggle_items(index){
    let item_t=$('.item_d_table[data-item-index="'+index+'"]')
    item_t.toggle();
}


//for opening the modal

function open_modal(modal) {
    $(modal).addClass("show");
    $(modal).css("display", "block");
    $(modal).attr("aria-modal", "true");
    $(modal).attr("aria-hidden", "false");
}


function initialize_form() { 

    $(".item_rows").remove();
    let modal = document.getElementById("food_modal");

    addrow();

    open_modal(modal);

    edit_index = "-1";
}

function edit_row(index) {
    let food = food_details[index];

    document.querySelector("#category_name").value = food.category_name;
    document.querySelector("#category_desc").value = food.category_desc;
    document.querySelector("#date").value = food.date;

    $('.item_rows').remove();

    food.item.forEach((item, r_index) => {
        add_item_rows_data(item, r_index);
    });

    let modal = $("#food_modal");
    $("#edit_index").val(index);
    open_modal(modal[0]);
}

//for adding the rows again in modal when we click edit
function add_item_rows_data(food, r_index) {
    let row = document.createElement('div');
    row.classList.add('item_rows');

    row.innerHTML = `
        <hr>
        <div class="row">
            <div class="col-lg">
                <label for="item_name">Item Name</label>
                <input type="text" class="form-control item_name" value="${food.item_name}" required>
                <div class="iname_v"></div>
            </div>
        
            <div class="col-lg">
                <label for="item_desc">Item Description</label>
                <input type="text" class="form-control item_desc" value="${food.item_desc}">
                <div class="idesc_v"></div>
            </div>
        
            <div class="col-lg">
                <label for="food_type" class="form-label">Food type</label>
                <select class="form-select form-select-lg food_type" name="food_type" required>
                    <option value="veg" ${food.food_type === 'veg' ? 'selected' : ''}>Veg</option>
                    <option value="non_veg" ${food.food_type === 'non_veg' ? 'selected' : ''}>Non-veg</option>
                    <option value="sea_food" ${food.food_type === 'sea_food' ? 'selected' : ''}>Sea Food</option>
                </select>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-lg">
                <label for="price">Price</label>
                <input type="number" class="form-control price" value="${food.price}" required>
                <div class="price_v"></div>
            </div>
        
            <div class="col-lg">
                <label for="discount">Discount</label>
                <input type="number" class="form-control discount" value="${food.discount}">
                <div class="d_v"></div>
            </div>
        
            <div class="col-lg">
                <label for="gst">GST</label>
                <input type="text" class="form-control gst" value="${food.gst}" required>
                <div class="gst_v"></div>
            </div>
        
            <div class="col-lg">
                <div class="col-lg">
                <label for="item_active">Active</label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="item_active" value="${food.active}" >
                    <label class="form-check-label" for="item_active">Yes</label>
                </div>
        </div>
            </div>

            <div class="col-lg">
                ${r_index >= 1 ? '<div class="sub_btn"><button type="button" class="my_btn btn btn-primary mt-4" onclick="remove_row(this)"> Remove Item </button></div>' : '<div class="sub_btn"><span></span></div>'}
            </div>
        </div>
    `;

    $(".for_adding_row").append(row);
}



//for closing the modals
document.querySelector('.btn-close').addEventListener('click', close_modal);
document.querySelector('.modal-footer .btn-secondary').addEventListener('click', close_modal);

function close_modal() {
    let modal = $('#food_modal')[0];
    $(modal).removeClass('show');
    $(modal).css("display","none");
    $(modal).attr('aria-modal', 'false');
    $(modal).attr('aria-hidden', 'true');

}

/*validations */

function validate_cname(){
    let cname=$("#category_name").val();

    let reg=/^[a-zA-Z\s]+$/

    if(!reg.test(cname)){
        document.querySelector('#category_name').classList.add("is-invalid")
        document.querySelector('.cname_v').innerHTML=`
        <p style="color:red">Only Alphabets Allowed</p>
        `
        return false;
    }

    return true;
}


function validate_cdesc(){
    let cdesc=$("#category_desc").val();

    let reg=/^[a-zA-Z\s]+$/

    if(!reg.test(cdesc)){
        document.querySelector('#category_desc').classList.add("is-invalid")
        document.querySelector('.c_desc_v').innerHTML=`
        <p style="color:red">Only Alphabets Allowed</p>
        `
        return false;
    }

    return true;
}

function validate_date(){
    let l_date=$("#date").val();

    // let today='2024-03-30';

    let date = new Date();
    let today = date.toISOString().slice(0, 10);


    console.log(l_date);
    console.log(today);

    if(l_date>today){
        document.querySelector('#date').classList.add("is-invalid")
        document.querySelector('.date_v').innerHTML=`
        <p style="color:red">Date cannot be greater than todays date</p>
        `
        return false;
    }

    return true;
}


function validate_iname(row){
    let iname=row.querySelector(".item_name").value;

    let reg=/^[a-zA-Z\s]+$/

    if(!reg.test(iname)){
        row.querySelector('.item_name').classList.add("is-invalid")
        row.querySelector('.iname_v').innerHTML=`
        <p style="color:red">Only Alphabets Allowed</p>
        `
        return false;
    }

    return true;
}


function validate_idesc(row) {
    let idesc = row.querySelector(".item_desc").value;
    let reg = /^[a-zA-Z0-9\$\@\!\%\s]+$/;

    if (!reg.test(idesc)) {
        row.querySelector('.item_desc').classList.add("is-invalid");
        row.querySelector('.idesc_v').innerHTML = `<p style="color:red">Only Alphabets, Numbers, and special characters '\$\@\!\%\^' allowed</p>`;
        return false;
    }

    return true;
}

function validate_price(row) {
    let price = row.querySelector(".price").value;

    if (price <= 0) {
        row.querySelector('.price').classList.add("is-invalid");
        row.querySelector('.price_v').innerHTML = `<p style="color:red">Only positive and non-zero values allowed</p>`;
        return false;
    }

    return true;
}

function validate_discount(row) {
    let disc = row.querySelector(".discount").value;

    if (disc <= 0 || disc > 15) {
        row.querySelector('.discount').classList.add("is-invalid");
        row.querySelector('.d_v').innerHTML = `<p style="color:red">Value should be between 1 and 15</p>`;
        return false;
    }

    return true;
}

function validate_gst(row) {
    let gst = row.querySelector(".gst").value;

    if (gst < 0) {
        row.querySelector('.gst').classList.add("is-invalid");
        row.querySelector('.gst_v').innerHTML = `<p style="color:red">Only positive values allowed</p>`;
        return false;
    }

    return true;
}



