let food_data=[];

let valid_name=true;

$(document).ready(function () {
    $(".t1").DataTable();
});

function add_row(){

    let row=document.createElement("div");
    row.classList.add("item_rows");

    row.innerHTML=
    `   <hr>
    <br>
        <div class="row">
        <div class="col-lg">
            <label for="item_name" class="col-4 col-form-label" >item_name</label>
            <input type="text" class="form-control item_name" name="inputName"  oninput="validate_names(this)"
                placeholder="Name" />
        </div>

        <div class="col-lg">
            <label for="item_desc" class="form-label">item desc</label>
            <textarea class="form-control item_desc"  rows="2"  oninput="validate_names(this)"></textarea> 
        </div>

        <div class="col-lg">
            <div class="mb-3">
                <label for="item_type" class="form-label">Item type</label>
                <select class="form-select form-select-lg item_type">
                    <option selected>Veg</option>
                    <option>Non-veg</option>
                </select>
            </div>

        </div>

        <div class="col-lg">
            <label for="item_price" class="col-4 col-form-label">item_price </label>
            <input type="number" class="form-control item_price" name="inputName" 
                placeholder="Name" min=0 />
        </div>

    </div>

    <div class="row">

        <div class="col-lg">
            <label for="item_discount" class="col-4 col-form-label">Discount </label>
            <input type="number" class="form-control item_discount" min="0" max="15"/>
        </div>

        <div class="col-lg">
            <label for="item_gst" class="col-4 col-form-label">item_gst </label>
            <input type="number" class="form-control item_gst" min="1" max="100"/>
        </div>

        <div class="col-lg">
                <input class="form-check-input item_active" type="checkbox"  checked />
                <label class="form-check-label" for="item_active"> yes </label>

        </div>

        <div class="col-lg">
            <button type="button" class="btn btn-primary" onclick="remove_row(this)">
                - remove row
            </button>
        </div>

    </div>
    
    `;

    $(".for_row_addition").append(row);
}



function submit_data(event){
    event.preventDefault();

    if(!valid_name){
        return false;
    }

    let cat_data = {
        cat_name:$("#cat_name").val(),
        cat_desc:$("#cat_desc").val(),
        cat_active:$("#cat_active").prop("checked")?"yes":"no",
        cat_date:$("#cat_date").val(),
        item:[]
    }

    let item_row=document.querySelectorAll(".item_rows");

    item_row.forEach(row=>{

        let item_details = {
            item_name:$(row).find(".item_name").val(),
            item_desc:$(row).find(".item_desc").val(),
            item_type:$(row).find(".item_type").val(),
            item_price:$(row).find(".item_price").val(),
            item_discount:$(row).find(".item_discount").val(),
            item_gst:$(row).find(".item_gst").val(),
            item_active:$(row).find(".item_active").prop("checked")?"yes":"no",
        }

        cat_data.item.push(item_details);
    });

    let edit_index=$("#edit_index").val();

    if(edit_index=="-1"){
        food_data.push(cat_data);
    }else{
        food_data[edit_index]=cat_data;
    }

    update_table();

    console.log(food_data);


    $("#edit_index").val("-1");

    alert("info added close modal");

   
}

function update_table(){
    let t1= $(".t1").DataTable();
    t1.clear().draw();

    food_data.forEach((food,index)=>{

        let cat_data=create_cat_data(t1,food);
        let item_table=create_item_table(food,index);

        t1.row(cat_data).child(item_table).show();
    })
}

function create_cat_data(dataTable,food) {

    let cat_row=dataTable.row.add([
        `    <button type="button" class="btn btn-primary toggle-btn" onclick="toggle_items(${food_data.indexOf(food)})">^</button>`,
        food.cat_name,
        food.cat_desc,
        food.cat_active,
        food.cat_date,
        `  <button type="button" class="btn btn-primary toggle-btn" data-bs-toggle="modal" data-bs-target="#modalId" onclick="edit_details(${food_data.indexOf(food)})">Edit</button>`,
        `   <button type="button" class="btn btn-primary" onclick="delete_data(this)">Delete</button>`
    ]).draw(true).node();
    
    return cat_row;
}


function create_item_table(food,index){

    let cnt=0;

    let item_table=$("<table>").addClass("item_table table-bordered table").attr("item_index",index);

    let tbody=$("<tbody>");

    let total_price=0;
    let total_discount=0;

    food.item.forEach(item=>{

        cnt++;

        let d_amt=(item.item_price * item.item_discount)/100;
        let d_price=item.item_price-d_amt;

        total_price+=parseFloat(item.item_price);
        total_discount+=d_price;

        let row=$("<tr>");
        row.append(
            $("<td>").text(cnt),
            $("<td>").text(item.item_name),
            $("<td>").text(item.item_desc),
            $("<td>").text(item.item_type),
            $("<td>").text(item.item_price),
            $("<td>").text(item.item_discount),
            $("<td>").text(d_price)
        )
            
        tbody.append(row)
    })

    let total_row=$("<tr>");

    total_row.append(
        $('<td colspan="3">').text("total"),
        $("<td>").text(total_price),
        $("<td>").text(" "),
        $("<td>").text(total_discount)
    )

    tbody.append(total_row);

    let thead=$("<thead>")
    thead.append(
        `
        <th>ItemNo</th>
        <th>Item Name</th>
        <th>Item Description</th>
        <th>Item Type</th>
        <th>Item Price</th>
        <th>Item discount</th>
        <th>discount price</th>`
    );

    item_table.append(thead,tbody);

    return item_table;

}

function toggle_items(index){
    $('.item_table[item_index="'+index+'"]').toggle();
}

function edit_details(index){

    let food=food_data[index];

    $("#cat_name").val(food.cat_name);
    $("#cat_desc").val(food.cat_desc);
    $("#cat_active").val(food.cat_active);
    $("#cat_date").val(food.cat_date);

    
    $(".item_rows").each(function(i){
        if(food.item[i]){
            $(this).find(".item_name").val(food.item[i].item_name);
            $(this).find(".item_desc").val(food.item[i].item_desc);
            $(this).find(".item_type").val(food.item[i].item_type);
            $(this).find(".item_price").val(food.item[i].item_price);
            $(this).find(".item_discount").val(food.item[i].item_discount);
            $(this).find(".item_gst").val(food.item[i].item_gst);
            $(this).find(".item_active").val(food.item[i].item_active);
        }
    })

    $("#edit_index").val(index);
}


function delete_data(index){
    
    if(window.confirm("Do you want to delete?")){
        food_data.splice(index,1);
        alert("info deleted");
        update_table();
    }

}

function remove_row(button){
    let rm_btn= button.parentNode.parentNode.parentNode;
    rm_btn.remove();
}

function generate_form(){

    $(".item_rows").remove();

    document.querySelector(".food_form").reset();

    add_row();

    $("#edit_index").val("-1");

}


function validate_names(input){

    let name=$(input);

    let reg=/^[a-zA-z\s]+$/;

    if(!reg.test(name.val())){

        name.next().text("Only alphabets allowed")
        name.addClass("is-invalid").removeClass("is-valid");
        valid_name=false;
    }else{
        name.next().text("")
        name.removeClass("is-invalid").addClass("is-valid");
        valid_name=true;
    }
}