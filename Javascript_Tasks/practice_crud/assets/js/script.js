let student=[];
let edit_index=-1;

function submit_form(event){
    event.preventDefault();


    //fname validation
    if(fname_validation()==false){

        return false;
    }

    if(fname_validation()==true){
       let div=document.querySelector(".fname_v");
       document.querySelector("#fname").classList.remove('is-invalid');
       div.innerHTML=`
       <span></span>
       ` 
    }
    //lname validation
    if(lname_validation()==false){
        return false;
    }

    if(lname_validation()==true){

       let div=document.querySelector(".lname_v");
       document.querySelector("#lname").classList.remove('is-invalid');
       div.innerHTML=`
       <span></span>
       ` 
    }

    //email validation

    if(email_validation()==true){
        let div=document.querySelector(".email_v");
        document.querySelector("#email").classList.remove("is-invalid");

        div.innerHTML=`
        <span></span>`
    }

    if(email_validation()==false){
        return false;
    }

    // dob validation

    if(dob_validation()==true){
        document.querySelector("#dob").classList.remove("is-invalid");
        let div=document.querySelector(".dob_v");

        div.innerHTML=`
        <span></span>`
    }

    if(dob_validation()==false){
        return false;
    }

    if(edit_index==-1){
        let info={
            first_name : document.querySelector("#fname").value,
            last_name : document.querySelector("#lname").value,
            email : document.querySelector("#email").value,
            date_of_birth : document.querySelector("#dob").value,
        }
        student.push(info);
    }else
    {
        student[edit_index].first_name = document.querySelector("#fname").value;
        student[edit_index].last_name=document.querySelector("#lname").value;
        student[edit_index].email=document.querySelector("#email").value;
        student[edit_index].date_of_birth=document.querySelector("#dob").value;
    }

    print_table();
  
    
    document.querySelector("form").reset();

}

function print_table(){
    let tbody = document.querySelector("#t_body");
    tbody.innerHTML='';

    student.forEach((student,index)=>{
        tbody.innerHTML +=`
        <tr>
        <td>${student.first_name}</td>
        <td>${student.last_name}</td>
        <td>${student.email}</td>
        <td>${student.date_of_birth}</td>
        <td>
        <button type="button" onclick="edit(${index})">Edit</button>
        <button type="button" onclick="delete_user(${index})">Delete</button></td>
        </tr>
    `;
    });
}

function edit(index){
    
    document.querySelector("#fname").value=student[index].first_name;
    document.querySelector("#lname").value=student[index].last_name;
    document.querySelector("#email").value=student[index].email;
    document.querySelector("#dob").value=student[index].date_of_birth;

    edit_index=index;
}

function delete_user(index){
    student.splice(index,1);
    print_table();
}


//validations


function fname_validation(){
    let fname=document.querySelector("#fname").value;

    let reg = /^[a-zA-Z]+$/;

    if(!reg.test(fname)){
        let div=document.querySelector(".fname_v");
        document.querySelector("#fname").classList.add('is-invalid');
        div.innerHTML=`
            <span style="color:red">only alphabets</span>
        `
        return false;
    }

    return true;
}


function lname_validation(){
    let lname=document.querySelector("#lname").value;

    let reg=/^[a-zA-z]+$/;

    if(!reg.test(lname)){
        let div=document.querySelector(".lname_v");
        document.querySelector("#lname").classList.add("is-invalid");

        div.innerHTML=`
        <span style="color:red">only alphabets</span>`

        return false;
    }

    return true;
}


function email_validation(){
    let email=document.querySelector("#email").value;

    let reg= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,4}$/;


    if(!reg.test(email)){
        let div=document.querySelector(".email_v");
        document.querySelector("#email").classList.add("is-invalid");

        div.innerHTML=`
        <span style="color:red">please enter valid email address</span>`

        return false;
    }
    return true;
}

//dob validation

function dob_validation(){
    let dob=document.querySelector("#dob").value;

    let year= dob.split("-");

    console.log(year[0]);

    if(year[0]>2006){

        document.querySelector("#dob").classList.add("is-invalid");

        
        let div=document.querySelector(".dob_v");

        div.innerHTML=`
        <span style="color:red">Age cannot be less than 18</span>`
        return false;
    }
    return true;
}