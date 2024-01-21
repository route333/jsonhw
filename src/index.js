const studentsList = document.getElementById("studentsList");
const btnEl = document.querySelector(".btn");
const closeBtnEl = document.querySelector(".close");
const modal = document.getElementById("modal");
const saveBtn = document.querySelector(".save");
const studentForm = document.getElementById("studentForm");
let docData
let studentsData = [];

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

btnEl.addEventListener("click", openModal);
closeBtnEl.addEventListener("click", closeModal);
saveBtn.addEventListener("click", saveStudent);

function saveStudent() {
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const age = document.getElementById("age").value;
  const course = document.getElementById("course").value;
  const faculty = document.getElementById("faculty").value;
  const courses = document.getElementById("courses").value;
  
  if (!name || !surname || !age || !course || !faculty || !courses) {
    alert("Помилка.Заповніть всі поля.");
    return;
  }

  const newStudent = {
    name,
    surname,
    age: parseInt(age),
    course,
    faculty,
    courses,
  };
  studentsData.push(newStudent);

  const jsonData = JSON.stringify(studentsData);
 
  updateStudentsList();
  closeModal();
}

function updateStudentsList() {
  studentsList.innerHTML = "";
  studentsData.forEach((student, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${student.name} ${student.surname} Курс: ${student.course}`;
    studentsList.appendChild(listItem);
    listItem.addEventListener("click", () => deleteStudent(index));
  });
}

function deleteStudent(index) {
  alert("Ви впевнені, що хочете видалити цього студента?");
  studentsData.splice(index, 1);
  updateStudentsList();
}

function loadData() {
  fetch('./students.json')
      .then(response => response.json())
      .then(data => {
          studentsData = data;
          updateStudentsList();
      })
      .catch(error => console.error('Error fetching data:', error));
}

loadData()
