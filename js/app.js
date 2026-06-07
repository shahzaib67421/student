const studentForm =
document.getElementById('studentForm');

const studentName =
document.getElementById('studentName');

const studentEmail =
document.getElementById('studentEmail');

const studentsTableBody =
document.getElementById('studentsTableBody');

const saveButton =
document.getElementById('saveButton');

const cancelButton =
document.getElementById('cancelButton');

const alertBox =
document.getElementById('alertBox');

function showAlert(message,type){

    alertBox.textContent=message;
    alertBox.className=type;

    setTimeout(()=>{
        alertBox.textContent='';
    },3000);
}

function resetForm(){

    studentForm.reset();

    editingStudentId=null;

    saveButton.textContent=
    'Save Student';

    cancelButton.style.display='none';
}

studentForm.addEventListener(
'submit',
async(e)=>{

    e.preventDefault();

    const name=
    studentName.value.trim();

    const email=
    studentEmail.value.trim();

    if(editingStudentId===null){

        await createStudent(
            name,
            email
        );

    }else{

        await updateStudent(
            editingStudentId,
            name,
            email
        );
    }

    resetForm();
});

cancelButton.addEventListener(
'click',
resetForm
);

fetchStudents();