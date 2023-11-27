const form= document.getElementById("form");
const recordscontainer= document.getElementById("records-container");
const createButton= document.querySelector("#form button");

let formState= "CREATE" ;

const employeesList=[];

let empid=1000;

const onSubmitForm = (event) =>{
    event.preventDefault();
    const employee = {
        name:form.name.value,
        employeeid:++empid,
        salary:form.salary.value,
        team:form.team.value,
        role:form.role.value,
        companyname:form.companyname.value
    }
    if(formState === "CREATE"){
        addNewEmployeeRecord(employee);
    }
    else if(formState === "UPDATE"){
        formState = "CREATE";
        createButton.innerText = "Create Employee";
    }
    form.reset();
}

function deleteRecord(event){   

    if(formState === "UPDATE"){
        alert("Please update the record before deleting anything");
        return;
    }
    const deleteButton = event.target;
    const record = deleteButton.parentNode.parentNode;
    record.remove();

    const currentEmployeeId = parseInt(deleteButton.getAttribute("data-empid"));

    for(let i=0;i<employeesList.length;i++){
        if(employeesList[i].employeeid === currentEmployeeId){
            employeesList.splice(i,1);
            break;
        }
    }
}

function editRecord(event){
    const editButton = event.target;
    const currentEmployeeId = parseInt(editButton.getAttribute("data-empid"));

    for(let i=0;i<employeesList.length;i++){
        if(currentEmployeeId===employeesList[i].employeeid){
            fillFormWithData(employeesList[i]);
            break;
        }
    }
}

function fillFormWithData(employee){
    for(let key in employee){
        if(key !== "employeeid"){
            form[key].value=employee[key];
        }
    }
    createButton.innerText="Update Employee";
    formState= "UPDATE" ;
}

function addNewEmployeeRecord(employee){
    const record=document.createElement("tr");

    for(let key in employee){
        const cell=document.createElement("td");
        cell.innerText=employee[key];
        record.appendChild(cell);
    }
    const optionsCell=document.createElement("td");
    
    const editIcon=document.createElement("span");
    editIcon.className="material-icons icon";
    editIcon.innerText="edit";
    editIcon.setAttribute("data-empid", employee.employeeid);
    editIcon.addEventListener("click", editRecord)

    const deleteIcon=document.createElement("span");
    deleteIcon.className="material-icons icon";
    deleteIcon.innerText="delete";
    deleteIcon.setAttribute("data-empid", employee.employeeid);
    deleteIcon.addEventListener("click", deleteRecord);

    optionsCell.append(editIcon,deleteIcon);
    record.appendChild(optionsCell);

    recordscontainer.appendChild(record);
    //add newly created employee to global employees list.
    employeesList.push(employee);   
}
form.addEventListener("submit", onSubmitForm);