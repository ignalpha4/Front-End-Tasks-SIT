
let food_data=[];


$(document).ready(function () {
    $(".t1").DataTable();
});


function update_active_val(){
    let c1=$("#cat_active");
    let c2=$(".item_active");

    let active_val1=c1.is(':checked')?'yes':'nooo';
    let active_val2=c2.is(':checked')?'yes':'nooo';

    c1.val(active_val1);
    c2.val(active_val2);
}

$("#cat_active",".item_active").change(update_active_val);

function add_row(){
    let row=document.createElement("div")
    row.classList.add("item_rows")
  
    row.innerHTML=`
                                    <hr>
                                    <div class="row">

                                        <div class="col-lg">
                                            <label for="item_name" class="col-4 col-form-label">item_name</label>
                                            <input type="text" class="form-control item_name" name="cat_name"
                                                placeholder="Name" />
                                        </div>

                                        <div class="col-lg">
                                            <label for="item_desc" class="col-4 col-form-label">item desc</label>
                                            <textarea name="item_desc" class="item_desc" cols="30" rows="4"></textarea>
                                        </div>

                                        <div class="col-lg">

                                            <div class="mb-3">
                                                <label for="item_type" class="form-label">City</label>
                                                <select class="form-select form-select-lg item_type" name="">
                                                    <option selected>veg</option>
                                                    <option value="">non veg</option>
                                                    <option value="">vegan</option>
                                                </select>
                                            </div>



                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg">
                                            <label for="price" class="col-4 col-form-label">price</label>
                                            <input type="number" class="form-control price" placeholder="price" />
                                        </div>
                                        <div class="col-lg">
                                            <label for="discount" class="col-4 col-form-label">discount</label>
                                            <input type="number" class="form-control discount" placeholder="Name" />
                                        </div>
                                        <div class="col-lg">
                                        <label for="item_active">Active</label>
                                            <div class="form-check">
                                                
                                                <input class="form-check-input item_active" type="checkbox" checked>
                                                <label class="form-check-label" for="item_active"> Yes </label>
                                            </div>
                                        </div>
                                        <div class="col-lg">
                                            <button type="button" class="btn btn-primary" onclick="remove_row(this)">- remove row</button>
                                        </div>

                                    </div>
    `
    $(".for_adding_row").append(row);
}

function generate_form(){

    $(".item_rows").remove();

    document.querySelector(".food_form").reset();

    add_row();

    $("edit_index").val(-1);
}
 
function remove_row(button){
    let remove_row=button.parentNode.parentNode.parentNode;
    remove_row.remove();
}

function submit_data(event){

    event.preventDefault()

    let edit_index = $('#edit_index').val();

    let cat_data={
        cat_name:$("#cat_name").val(),
        cat_desc:$("#cat_desc").val(),
        cat_active:$("#cat_active").prop('checked')?"yes":"no",
        cat_date:$("#cat_date").val(),
        item:[]
    }

    let item_rows=document.querySelectorAll(".item_rows")


    item_rows.forEach(row => {
        
        let item_details={
            item_name:$(row).find(".item_name").val(),
            item_desc:$(row).find(".item_desc").val(),
            item_type:$(row).find(".item_type").val(),
            price:$(row).find(".price").val(),
            discount:$(row).find(".discount").val(),
            item_active:$(row).find(".item_active").prop('checked')?'yes':'no',
        }

        cat_data.item.push(item_details);

    });

    if(edit_index=="-1"){
        food_data.push(cat_data);
    }else{
        food_data[edit_index]=cat_data;
    }

    update_table();
    console.log(food_data);

    alert("info updated close the form")
    $("#edit_index").val("-1");
}

function update_table(){
    let t1=$(".t1").DataTable();
    t1.clear().draw();


    food_data.forEach((food,index)=>{
        let cat_row=add_category_row(t1,food);
        let item_table=create_item_table(food,index);

        t1.row(cat_row).child(item_table.prop('outerHTML')).show();

    })
}


function add_category_row(DataTable,food){

    let cat_row=DataTable.row.add([
        `<div class="toggle">
            <button class="btn btn-primary btn-sm toggle-btn" onclick="toggle_items(${food_data.indexOf(food)})">v</button>
        </div>
        `,
        food.cat_name,
        food.cat_desc,
        food.cat_active,
        food.cat_date,
        `<div class="edit_btn"><button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modalId" onclick="edit_row(${food_data.indexOf(food)})">edit</button></div>`,
        `<div class="delete_btn"><button type="button" class="btn btn-danger btn-sm" onclick="delete_row(${food_data.indexOf(food)})">delete</button></div>`
        
    ]).draw(true).node();

    $(cat_row).data('food_data',food);

    return cat_row;
}

function create_item_table(food,index){


    let total_price=0;
    let total_discount=0;

    let item_table=$("<table>").addClass('table table-bordered item_table').attr('data-item-index',index);
    let tbody=$('<tbody>');

    food.item.forEach(item=>{

        let d_amt=(item.price*item.discount)/100;
        let d_price=item.price-d_amt;

        total_price+=parseFloat(item.price);
        total_discount+=d_price;

        let item_row=$("<tr>");

        item_row.append(
            $("<td>").text(item.item_name),
            $("<td>").text(item.item_desc),
            $("<td>").text(item.item_type),
            $("<td>").text(item.price),
            $("<td>").text(item.discount),
            $("<td>").text(d_price),
        );
        tbody.append(item_row);
    });

    //creating total row;
    let total_row=$("<tr>");
    total_row.append(
            $("<td colspan='3'>").text('Total'),
            $("<td>").text(total_price),
            $("<td>").text(""),
            $("<td>").text(total_discount)
    );

    tbody.append(total_row);

    let thead= $('<thead>').append(
            `<tr>
                <th>Item Name</th>
                <th>Item Description</th>
                <th>Food Type</th>
                <th>Price</th>
                <th>Discount(%)</th>
                <th>Discounted Price</th>
            </tr>`
    )

    item_table.append(thead,tbody);
    
    return item_table;

}

function toggle_items(index){
    $('.item_table[data-item-index="'+index+'"]').toggle();
}

function delete_row(index){
    
    if(window.confirm("are you sure?")){
        alert("info deleted");
        food_data.splice(index,1);
        update_table();
    }
}

function edit_row(index){

    let food=food_data[index];

    $("#cat_name").val(food.cat_name);
    $("#cat_desc").val(food.cat_desc);
    $("#cat_date").val(food.cat_date);


    $(".item_rows").each(function(i){

        if(food.item[i]){
            $(this).find(".item_name").val(food.item[i].item_name);
            $(this).find(".item_desc").val(food.item[i].item_desc);
            $(this).find(".item_type").val(food.item[i].item_type);
            $(this).find(".price").val(food.item[i].price);
            $(this).find(".discount").val(food.item[i].discount);
            $(this).find(".item_active").prop('checked', food.item[i].item_active === 'yes');
        }
    });

    $("#edit_index").val(index);
}