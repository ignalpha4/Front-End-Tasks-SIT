const foodDetails = [];

$(document).ready(function () {
    $(".t1").DataTable();
    updateActiveVal();
});

function updateActiveVal() {
    const checkbox1 = $('#cat_active');
    const checkbox2 = $('#item_active');
    checkbox1.val(checkbox1.is(':checked') ? 'Yes' : 'No');
    checkbox2.val(checkbox2.is(':checked') ? 'Yes' : 'No');
}

$('#cat_active, #item_active').change(updateActiveVal);

function addRow() {
    const baseRows = $('.item_rows').length < 1;

    const row = document.createElement('div');
    row.classList.add('item_rows');

    row.innerHTML = `
        <hr>
        <div class="row">
            <div class="col-lg">
                <label for="item_name">Item Name</label>
                <input type="text" class="form-control item_name" required>
                <div class="iname_v"></div>
            </div>

            <div class="col-lg">
                <label for="item_desc">Item Description</label>
                <input type="text" class="form-control item_desc">
                <div class="idesc_v"></div>
            </div>

            <div class="col-lg">
                <label for="food_type" class="form-label">Food type</label>
                <select class="form-select form-select-lg food_type" name="food_type" required>
                    <option value="veg" selected>Veg</option>
                    <option value="non_veg">Non-veg</option>
                    <option value="sea_food">Sea Food</option>
                </select>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-lg">
                <label for="price">Price</label>
                <input type="number" class="form-control price" required>
                <div class="price_v"></div>
            </div>

            <div class="col-lg">
                <label for="discount">Discount</label>
                <input type="number" class="form-control discount">
                <div class="d_v"></div>
            </div>

            <div class="col-lg">
                <label for="gst">GST</label>
                <input type="text" class="form-control gst" required>
                <div class="gst_v"></div>
            </div>

            <div class="col-lg">
                ${baseRows ? '' : `<div class="sub_btn"><button type="button" class="my_btn btn btn-primary mt-4" onclick="remove_row(this)">Remove Item</button></div>`}
            </div>
        </div>
    `;

    $(".for_adding_row").append(row);
}


function remove_row(button) {
    let removed_row = $(button).closest('.item_rows');
    removed_row.remove();
}

function deleteRow(index) {
    if (window.confirm("Are you sure you want to delete this row?")) {
        alert('info deleted');
        foodDetails.splice(index, 1);
        updateTable();
    }

}


function updateTable() {
    const table = $('.t1').DataTable();
    table.clear().draw();
    foodDetails.forEach(food => {
        const catDetailsObj = {
            toggleButton: '<div class="toggle"><button type="button" class="btn btn-primary btn-sm toggle-btn" onclick="toggleItems(' + foodDetails.indexOf(food) + ')">v</button></div>',
            categoryName: food.category_name,
            categoryDesc: food.category_desc,
            catActive: food.cat_active,
            date: food.date,

            editButton: '<div class="edit_btn"><button type="button" class="btn btn-primary btn-sm" onclick="editRow(' + foodDetails.indexOf(food) + ')">Edit</button></div>',
            deleteButton: '<div class="del_btn"><button type="button" class="btn btn-danger btn-sm" onclick="deleteRow(' + foodDetails.indexOf(food) + ')">Delete</button></div>'

        };

        const catRow = table.row.add(Object.values(catDetailsObj)).draw(true).node();
        
        $(catRow).data('food_details', catDetailsObj);

        const itemTable = $('<table>').addClass('table table-bordered item_d_table').attr('data-item-index', foodDetails.indexOf(food));
        const tHead = $('<thead>').addClass("item_head").append('<tr><th>Item Name</th><th>Item Description</th><th>Food Type</th><th>Price</th><th>Discount(%)</th><th>Discounted Price</th></tr>');
        const tBody = $('<tbody>');
        let totalPrice = 0;
        let totalDiscount = 0;
        food.item.forEach(item => {
            const dAmt = (parseFloat(item.price) * item.discount) / 100;
            const dPrice = parseFloat(item.price) - dAmt;
            totalPrice += parseFloat(item.price);
            totalDiscount += dPrice;
            const itemRow = $('<tr>');
            itemRow.append($('<td>').text(item.item_name));
            itemRow.append($('<td>').text(item.item_desc));
            itemRow.append($('<td>').text(item.food_type));
            itemRow.append($('<td>').text(item.price));
            itemRow.append($('<td>').text(item.discount));
            itemRow.append($('<td>').text(dPrice));
            tBody.append(itemRow);
        });
        const totalRow = $('<tr>');
        totalRow.append($('<td>').text('Total'));
        totalRow.append($('<td>').text(''));
        totalRow.append($('<td>').text(''));
        totalRow.append($('<td>').text(totalPrice));
        totalRow.append($('<td>').text(''));
        totalRow.append($('<td>').text(totalDiscount));
        tBody.append(totalRow);
        itemTable.append(tHead);
        itemTable.append(tBody);
        table.row(catRow).child(itemTable.prop('outerHTML')).show();
    });
}

function toggleItems(index) {
    $('.item_d_table[data-item-index="' + index + '"]').toggle();
}

function openModal(modal) {
    $(modal).addClass("show").css("display", "block").attr("aria-modal", "true").attr("aria-hidden", "false");
}

function closeModal() {
    const modal = $('#food_modal')[0];
    $(modal).removeClass('show').css("display", "none").attr('aria-modal', 'false').attr('aria-hidden', 'true');
}

$('.btn-close, .modal-footer .btn-secondary').click(closeModal);

function initializeForm() {
    $(".item_rows").remove(); 
    document.querySelector(".product").reset(); 
    addRow(); 
    openModal('#food_modal'); 
    $('#edit_index').val("-1"); 
}


function editRow(index) {
    const food = foodDetails[index];
    $('#category_name').val(food.category_name);
    $('#category_desc').val(food.category_desc);
    $('#date').val(food.date);
    $('.item_rows').remove();
    food.item.forEach((item, r_index) => {
        addItemRowsData(item, r_index);
    });
    $('#edit_index').val(index);
    openModal($('#food_modal'));
}

function addItemRowsData(food, r_index) {
    const row = $('<div>').addClass('item_rows');
    row.html(`
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
                        <input class="form-check-input" type="checkbox" id="item_active" value="${food.active}">
                        <label class="form-check-label" for="item_active">Yes</label>
                    </div>
                </div>
            </div>
            <div class="col-lg">
                ${r_index >= 1 ? '<div class="sub_btn"><button type="button" class="my_btn btn btn-primary mt-4" onclick="remove_row(this)"> Remove Item </button></div>' : '<div class="sub_btn"><span></span></div>'}
            </div>
        </div>
    `);
    $(".for_adding_row").append(row);
}

function validateInput(input, regex, errMsg) {
    if (!regex.test(input.val())) {
        input.addClass("is-invalid").siblings('.v_error').html(`<p style="color:red">${errMsg}</p>`);
        return false;
    }
    return true;
}

function validatePrice(input) {
    if (parseFloat(input.val()) <= 0) {
        input.addClass("is-invalid").siblings('.v_error').html(`<p style="color:red">Only positive and non-zero values allowed</p>`);
        return false;
    }
    return true;
}

function validateDiscount(input) {
    if (parseFloat(input.val()) <= 0 || parseFloat(input.val()) > 15) {
        input.addClass("is-invalid").siblings('.v_error').html(`<p style="color:red">Value should be between 1 and 15</p>`);
        return false;
    }
    return true;
}

function validateGst(input) {
    if (parseFloat(input.val()) < 0) {
        input.addClass("is-invalid").siblings('.v_error').html(`<p style="color:red">Only positive values allowed</p>`);
        return false;
    }
    return true;
}

function validateForm() {
    const cname = $("#category_name");
    const cdesc = $("#category_desc");
    const date = $("#date");

    if (!validateInput(cname, /^[a-zA-Z\s]+$/, "Only Alphabets Allowed")) return false;
    if (!validateInput(cdesc, /^[a-zA-Z\s]+$/, "Only Alphabets Allowed")) return false;

    const lDate = date.val();
    const today = new Date().toISOString().slice(0, 10);
    if (lDate > today) {
        date.addClass("is-invalid").siblings('.v_error').html(`<p style="color:red">Date cannot be greater than today's date</p>`);
        return false;
    }

    const rows = $(".item_rows");
    let validationCheck = true;
    rows.each((index, row) => {
        let validationPassed = true;
        const itemName = $(row).find(".item_name");
        const itemDesc = $(row).find(".item_desc");
        const price = $(row).find(".price");
        const discount = $(row).find(".discount");
        const gst = $(row).find(".gst");
        if (!validateInput(itemName, /^[a-zA-Z\s]+$/, "Only Alphabets Allowed")) validationPassed = false;
        if (!validateInput(itemDesc, /^[a-zA-Z0-9\$\@\!\%\s]+$/, "Only Alphabets, Numbers, and special characters '\$\@\!\%\^' allowed")) validationPassed = false;
        if (!validatePrice(price)) validationPassed = false;
        if (!validateDiscount(discount)) validationPassed = false;
        if (!validateGst(gst)) validationPassed = false;
        if (!validationPassed) validationCheck = false;
    });

    return validationCheck;
}

function submitData(event) {
    event.preventDefault();
    if (!validateForm()) return;


    const editIndex = $('#edit_index').val();
    let categoryDetails = {
        category_name: $('#category_name').val(),
        category_desc: $('#category_desc').val(),
        cat_active: $("#cat_active").val(),
        date: $('#date').val(),
        item: []
    };

    $(".item_rows").each(row => {
        let itemDetails = {
            item_name: $(row).find(".item_name").val(),
            item_desc: $(row).find(".item_desc").val(),
            food_type: $(row).find(".food_type").val(),
            price: $(row).find(".price").val(),
            discount: $(row).find(".discount").val(),
            gst: $(row).find(".gst").val(),
            active: $(row).find("#item_active").prop('checked') ? 'Yes' : 'No'

        };
        categoryDetails.item.push(itemDetails);
    });

    if (editIndex === "-1") foodDetails.push(categoryDetails);
    else foodDetails[editIndex] = categoryDetails;

    updateTable();
    $(".product").trigger("reset");
    alert("Info updated. You can close the form.");

    $('#edit_index').val("-1");  
}
