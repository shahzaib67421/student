let editingStudentId = null;

async function fetchStudents(){

    const { data, error } =
    await supabaseClient
    .from('students')
    .select('*')
    .order('id',{ascending:false});

    if(error){
        showAlert(error.message,'error');
        return;
    }

    displayStudents(data);
}

function displayStudents(students){

    studentsTableBody.innerHTML='';

    students.forEach(student=>{

        studentsTableBody.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>
                <button
                    class="edit-btn"
                    onclick="startEditStudent(
                    ${student.id},
                    '${student.name}',
                    '${student.email}'
                    )">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

async function createStudent(name,email){

    const { error } =
    await supabaseClient
    .from('students')
    .insert([{name,email}]);

    if(error){
        showAlert(error.message,'error');
        return;
    }

    showAlert('Student Added','success');

    fetchStudents();
}

async function updateStudent(id,name,email){

    const { error } =
    await supabaseClient
    .from('students')
    .update({name,email})
    .eq('id',id);

    if(error){
        showAlert(error.message,'error');
        return;
    }

    showAlert('Student Updated','success');

    resetForm();

    fetchStudents();
}

async function deleteStudent(id){

    if(!confirm('Delete Student?'))
    return;

    const { error } =
    await supabaseClient
    .from('students')
    .delete()
    .eq('id',id);

    if(error){
        showAlert(error.message,'error');
        return;
    }

    fetchStudents();
}

function startEditStudent(id,name,email){

    editingStudentId=id;

    studentName.value=name;
    studentEmail.value=email;

    saveButton.textContent='Update Student';

    cancelButton.style.display='block';
}