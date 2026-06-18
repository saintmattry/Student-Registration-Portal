/*
1.collect input value from user

2.on click of the button, you should be able to add the user to the array of student

3.when you add the value to the array, you should be able to manipulate that array, so that
it will appear in a list format(style this list).

4.the list should be able to remain the same even after refreshing or adding a new student to the list

5.add a remove button to remove unwanted student
*/

/*
solution
collect all elements needed
1.create a function that is going to retrieve students from the array list
2. create another that will store those values that you retrieved from the array
3. create a function that will display to the ui, on click of the add button
4. create a function that adds student
5.create a function that removes Student

5 function
getStudent()
saveStudent()
renderStudent()
addStudent()
removeStudent()
*/
const button = document.getElementById("addStudent");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const statusInput = document.getElementById("status");
const imageInput = document.getElementById("image");
const list = document.getElementById("studentList");

const getStudents = () => {
  return JSON.parse(localStorage.getItem("students")) || [];
};

const saveStudents = (students) => {
  localStorage.setItem("students", JSON.stringify(students));
};

const clearInputs = () => {
  nameInput.value = "";
  emailInput.value = "";
  statusInput.value = "";
  imageInput.value = "";
};

const inputValidations = (name, email, status, image) => {
  if (!name) {
    alert("Student name is required");
    return false;
  }

  if (!email) {
    alert("Email is required");
    return false;
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address");
    return false;
  }

  if (!status) {
    alert("Student must have a status");
    return false;
  }

  if (!image) {
    alert("Please upload an image");
    return false;
  }

  return true;
};

// DEFINED FIRST before any call
const renderStudents = () => {
  if (!list) return;

  const students = getStudents();
  list.innerHTML = "";

  students.forEach((student, index) => {
    const div = document.createElement("div");
    div.classList.add("studentCard");
    div.innerHTML = `
      <img src="${student.image}" alt="student image" class="product-image">
      <h3>${student.name}</h3>
      <h5>${student.email}</h5>
      <p>${student.status}</p>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = `<i class="ri-delete-bin-6-line"></i>`;
    removeBtn.addEventListener("click", () => removeStudent(index));

    div.appendChild(removeBtn);
    list.appendChild(div);
  });

  gsap.to(".studentCard", {
    opacity: 1,
    y: 0,
    duration: 3,
    stagger: 0.15,
  });
};

const removeStudent = (index) => {
  const students = getStudents();
  students.splice(index, 1);
  saveStudents(students);
  renderStudents();
};

const addStudent = () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const status = statusInput.value.trim();
  const image = imageInput.files[0];

  if (!inputValidations(name, email, status, image)) return;

  const fileReader = new FileReader();

  fileReader.onload = (e) => {
    const students = getStudents();
    students.push({ name, email, status, image: e.target.result });
    saveStudents(students);
    clearInputs();
    window.location.href = "./StudentListing.html";
  };

  fileReader.readAsDataURL(image);
};

if (button) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    addStudent();
  });
}

renderStudents();