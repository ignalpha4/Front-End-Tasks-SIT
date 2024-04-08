
let food_data = []

let valid=true;


$(document).ready(function () {
    $(".t1").DataTable();
});


function add_row(){

    let row=$("<div>").addClass("item_rows");
    // row.classList.add("item_rows");

    row.append(`

                                    <div class="row">

                                        <div class="col-lg">
                                            <label for="item_name" class="col-form-label">Item name</label>
                                            <input type="text" class="form-control item_name" name="inputName" oninput="validate_text(this)"
                                                placeholder="Name" />
                                                
                                        </div>

                                        <div class="col-lg">
                                            <label for="item_desc" class="col-form-label">item_desc</label>
                                            <textarea class="form-control item_desc" rows="2"  oninput="validate_text(this)"></textarea>
                                        </div>

                                        <div class="col-lg">

                                            <label for="item_type" class="form-label">Item type</label>
                                            <select class="form-select form-select-lg item_type" >
                                                <option selected value="veg">Veg</option>
                                                <option value="Non-veg">Non-veg</option>
                                                <option value="spicy">spicy</option>
                                            </select>

                                        </div>

                                        <div class="col-lg">
                                            <label for="item_price" class="col-4 col-form-label">Item price</label>
                                            <input type="number" class="form-control item_price" name="inputName" min="0"
                                                />
                                        </div>

                                    </div>

                                    <div class="row">

                                        <div class="col-lg">
                                            <label for="item_discount" class=" col-form-label">Item
                                                discount</label>
                                            <input type="number" class="form-control item_discount" name="inputName" min="0" max="15"
                                               />
                                        </div>

                                        <div class="col-lg">
                                            <label for="item_gst" class="col-form-label">Item gst</label>
                                            <input type="number" class="form-control item_gst" name="inputName" min="0"
                                                 />
                                        </div>

                                        <div class="col-lg">
                                            <label for="item_active"> Active</label>
                                            <input class="form-check-input item_active" type="checkbox"  checked />
                                        </div>

                                        <div class="col-lg">
                                            <button type="button" class="btn btn-primary btn-sm"
                                                onclick="remove_row(this)">
                                                Remove row
                                            </button>
                                        </div>


                                    </div>

    `);

    $(".for_row_addition").append(row);
}

function remove_row(button){
    let row=button.parentNode.parentNode.parentNode;
    row.remove();
}

function submit_data(event){
    event.preventDefault();

    if(!valid){
        return;
    }

    let index=$("#row_index").val();


    let cat_data= {
        cat_name:$("#cat_name").val(),
        cat_desc:$("#cat_desc").val(),
        cat_active:$("#cat_active").prop("checked")?"yes":"no",
        cat_date:$("#cat_date").val(),
        item:[]
    }

    let item_row=document.querySelectorAll(".item_rows");

    item_row.forEach(item=>{

        let item_data={
            item_name:$(item).find(".item_name").val(),
            item_desc:$(item).find(".item_desc").val(),
            item_type:$(item).find(".item_type").val(),
            item_price:$(item).find(".item_price").val(),
            item_discount:$(item).find(".item_discount").val(),
            item_gst:$(item).find(".item_gst").val(),
            item_active:$(item).find(".item_active").prop("checked")?"yes":"no"
        }

        cat_data.item.push(item_data);
    })

    if(index=="-1"){
        food_data.push(cat_data);
    }else{
        food_data[index]=cat_data;
    }

    $("#edit_index").val("-1");

    console.log(food_data);
    alert("data inserted close the form");

    update_tables();


}

function update_tables(){
    let t1=$(".t1").DataTable();
    t1.clear().draw();

    food_data.forEach((food,index)=>{
        let cat_data_row=add_cat_data(t1,food,index);
        let item_data_row=add_item_data(food,index);

        t1.row(cat_data_row).child(item_data_row).show();
    });
}

function add_cat_data(datatable,food,index){

    let cat_row=datatable.row.add([
        `<button type="button" class="btn btn-primary toggle-btn" onclick="toggle_items(${index})">v</button>`,
        food.cat_name,
        food.cat_desc,
        food.cat_active,
        food.cat_date,
        `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalId" onclick="edit_data(${index})">Edit</button>`,
        `<button type="button" class="btn btn-danger" onclick="delete_row(${index})">delete</button>`
    ]).draw(true).node();

    return cat_row;
}

function add_item_data(food,index){

    let cnt=0;

    let total_price=0;
    let total_discount=0;

    let item_table=$("<table>").addClass("item_table table table-bordered").attr('item_index',index);

    let thead=$("<thead>");
    thead.append(
        $("<th>").text("item No"),
        $("<th>").text("item name"),
        $("<th>").text("item desc"),
        $("<th>").text("item type"),
        $("<th>").text("item price"),
        $("<th>").text("item discount"),
        $("<th>").text("discount amt")
    );

    let tbody=$("<tbody>");

    food.item.forEach(item=>{

        let d_amt=(parseFloat(item.item_price)*item.item_discount)/100;
        let d_price=parseFloat(item.item_price)-(d_amt);

        total_price+=parseFloat(item.item_price);
        total_discount+=d_price;

        let row=$("<tr>");

        cnt++;
        row.append(
            $("<td>").text(cnt),
            $('<td>').text(item.item_name),
            $("<td>").text(item.item_desc),
            $("<td>").text(item.item_type),
            $("<td>").text(item.item_price),
            $("<td>").text(item.item_discount),
            $("<td>").text(d_price)
        )


        tbody.append(row);
    });

    let total_row=$("<tr>");

    total_row.append(
        $("<td colspan='4'>").text("total"),
        $("<td>").text(total_price),
        $("<td>").text(""),
        $("<td>").text(total_discount)
    );

    tbody.append(total_row);


    item_table.append(thead,tbody);

    return item_table;

}

function toggle_items(index){
    $('.item_table[item_index="'+index+'"').toggle();
}

function edit_data(index){

    document.querySelector(".food_form").reset();

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


    $("#row_index").val(index);
}

function generate_form(){

    $(".item_rows").remove();

    document.querySelector(".food_form").reset();

    add_row();

    $("#row_index").val("-1");
    
}

function validate_text(field){

    let name=$(field);

    let regx= /^[a-zA-z\s]+$/;
    
    if(!regx.test(name.val())){
        name.next().text("only alphabets are allowed");
        name.addClass("is-invalid").removeClass("is-valid");
        valid=false;
    }else{
        name.next().text("");
        name.removeClass("is-invalid").addClass("is-valid");
        valid=true;
    }
}

function delete_row(index){

    if(window.confirm("are u sure")){
        alert("info deleted");
        food_data.splice(index,1);
        update_tables();
    }
}