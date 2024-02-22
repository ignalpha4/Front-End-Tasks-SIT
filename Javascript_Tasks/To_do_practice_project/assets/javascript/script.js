

 function add_task(event) {

    event.preventDefault(); 

    let input = document.querySelector("#task").value;

    let div =  document.createElement("div");
    div.innerHTML = `
    <div>
    
    <div class="row add_task">
        <!-- content will be addded here -->


        <div class="col-lg-11">
            <input type="radio" id="radio"  value="task" onclick="task_completed(this)">
            <label for="radio" class="content">${input}</label><br>
        </div>
        <div class="col-lg-1">
            <button type="button" class="remove_btn" onclick="delete_task(this)">Delete <i class="fa-regular fa-square-minus"></i></button>
        </div>

    </div>
    <hr>
    <div>

    `;

    document.querySelector(".add_task").append(div);

    document.querySelector("#task").value='';
    
};



function delete_task(button){

    let deleted_row=button.parentNode.parentNode.parentNode.parentNode;

    deleted_row.remove();

}

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
return new bootstrap.Toast(toastEl, option)
})

function task_completed(radio) {

    let label = radio.parentNode.querySelector('label.content');

    if (radio.checked) {
        label.style.textDecoration = 'line-through';
    } else {
        label.style.textDecoration = 'none';
    }
}
