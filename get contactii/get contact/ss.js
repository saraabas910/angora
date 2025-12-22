var emailInput = document.getElementById("email");
var addContactBtn = document.getElementById("addContactBtn");
var addContactModal = document.getElementById("addContactModal");
var cancelBtn = addContactModal.querySelector(".btn-light"); 
var saveBtn = addContactModal.querySelector(".btn-primary");
var numInput = document.getElementById("phone");
var addressInput = document.getElementById("address");
var groupInput = document.getElementById("group");
var notesInput = document.getElementById("notes");  
var personalList =[];
var rowcontainer = document.getElementById("rowdata");
var fullNameInput = document.getElementById("fullName");    
const closeBtn = document.getElementById('closeModal');
const modal = document.getElementById('addContactModal');
var emptyBox = document.getElementById("emptyBox");




function openModal() {

  modal.classList.add('show');     
}

function closeModal() {
  
  modal.classList.remove('show');  
}


addContactBtn.addEventListener("click", openModal);


cancelBtn.addEventListener("click", closeModal);


closeBtn.addEventListener('click', closeModal);

saveBtn.addEventListener("click", function() {
    if (validation() && validationNum()) {

    
    var info ={
        name: fullNameInput.value,
        number: numInput.value,
        email: emailInput.value,
        address: addressInput.value,
        group: groupInput.value,
        notes: notesInput.value

    }
    personalList.push(info);
    displayContacts();
     fullNameInput.value = "";
    numInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    groupInput.value = "";
    notesInput.value = "";


    Swal.fire({
  title: "Added successfully!",
  icon: "success",
  draggable: true
});
}
  else{
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "invalid!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
  }
 
});


function displayContacts() {
    
 if (personalList.length === 0) {
    emptyBox.style.display = "block";
    rowcontainer.innerHTML = "";
    return;
  } else {
    emptyBox.style.display = "none";
  }

    var box =" ";

    for (var i=0; i< personalList.length; i++) {
        box +=`<div class=" col-md-4 ">
      <div class="card shadow-sm border-0 rounded-4 p-3 h-100">

        <div class="d-flex gap-2 align-items-start">
                 
          <div >
            <i class="fa-solid fa-user fs-4"></i>
      
          </div>

         
          <div class="flex-grow-1">
            <h6 class="mb-1 small fw-bold text-truncate">
              ${personalList[i].name}
            </h6>

            <div class="d-flex align-items-center text-muted small mb-1">
              <i class="bi bi-telephone me-1"></i>
              <span class="text-truncate">${personalList[i].number}</span>
            </div>

            <div class="d-flex align-items-center text-muted small mb-1">
              <i class="bi bi-envelope me-1"></i>
              <span class="text-truncate">${personalList[i].email}</span>
            </div>

            <div class="d-flex align-items-center text-muted small">
              <i class="bi bi-geo-alt me-1"></i>
              <span>${personalList[i].address}</span>
            </div>

            <span class="badge bg-success mt-2 small"></span>
          </div>
        </div>

        <hr class="my-2">

        <div class="d-flex justify-content-between align-items-center">
          <div>
            <button class="btn btn-light btn-sm rounded-circle me-1">
              <i class="bi bi-telephone"></i>
            </button>
            <button class="btn btn-light btn-sm rounded-circle">
              <i class="bi bi-envelope"></i>
            </button>
          </div>

          <div class="text-muted small">
            <i class="bi bi-star me-2"></i>
            <i class="bi bi-heart me-2"></i>
            <i class="bi bi-pencil me-2"></i>
            <i class="bi bi-trash"></i>
          </div>
        </div>

      </div>
    </div>`



    }


 rowcontainer.innerHTML = box;
   
}
function validation() { 
var pattern = /^[A-Z][a-z]{2,8}$/;
if (pattern.test(fullNameInput.value)) {

    fullNameInput.classList.add("is-valid");
    fullNameInput.classList.remove("is-invalid");
    return true;
} else {
    fullNameInput.classList.add("is-invalid");
    fullNameInput.classList.remove("is-valid");
    return false;

}
}
function validationNum() { 
var pattern = /^(010|011|012|015)\d{8}$/;
if (pattern.test(numInput.value)) {

    numInput.classList.add("is-valid");
    numInput.classList.remove("is-invalid");
    return true;
} else {
    numInput.classList.add("is-invalid");
    numInput.classList.remove("is-valid");
    return false;

}
}