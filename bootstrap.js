// =============GENERATING THE RANDOM UNIQUE ID===========
const randomIdGenerator = () => {
  let randomStringLength = 10;
  let randomString = "";
  let alphabetString =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < randomStringLength; i++) {
    let randomindex = Math.floor(Math.random() * alphabetString.length);
    randomString += alphabetString[randomindex];
  }
  return randomString;
};
// ================ARRAY TASK LIST --- DEFAULT VALUE ======================
let taskList = [
  {
    id: randomIdGenerator(),
    task: "Good Task",
    hour: 20,
    type: "entry",
  },
  {
    id: randomIdGenerator(),
    task: "Bad Task",
    hour: 20,
    type: "bad",
  },
];
// ==================FUNCTION - ADD TASK ===========================
const addTask = () => {
  //   console.log("Addbutton clicked");
  const taskField = document.getElementById("task");
  const hourField = document.getElementById("hour");

  if (taskField.value != "" && hourField.value != "") {
    const taskObject = {
      id: randomIdGenerator(),
      task: taskField.value,
      hour: parseInt(hourField.value),
      type: "entry",
    };
    taskList.push(taskObject);
    displayTask();
  } else {
    alert("Please Enter all the fields!!!!");
  }
};
// ==================FUNCTION DISPLAY TASK=============================
const displayTask = () => {
  //   console.log("Displaying the task");

  const goodListElement = document.getElementById("entry-list");
  const badListElement = document.getElementById("bad-list");
  goodListElement.innerHTML = "";
  badListElement.innerHTML = "";

  taskList.map((item, index) => {
    let goodTrValue = "";
    let badTrValue = "";
    if (item.type === "entry") {
      goodTrValue = `
    <tr>              
    <td>${index + 1}</td>
    <td>${item.task}</td>
    <td>${item.hour}</td>
    <td>
    <button type="button" class="btn btn-success" onclick = "convertTask('${
      item.id
    }')">
        <i class="fa-solid fa-arrow-right"></i>
    </button>
    <button type="button" class="btn btn-danger" onclick = "delList('${
      item.id
    }')">
        <i class="fa-solid fa-trash"></i>
    </button>
    </td>
    </tr>
    `;
    } else {
      badTrValue = `
    <tr>
    
    <td>${index + 1}</td>
    <td>${item.task}</td>
    <td>${item.hour}</td>
    <td>
    <button type="button" class="btn btn-warning" onclick = "convertTask('${
      item.id
    }')">
    <i class="fa-solid fa-arrow-left"></i>
    </button>
    <button type="button" class="btn btn-danger" onclick = "delList('${
      item.id
    }')">
    <i class="fa-solid fa-trash"></i>
    </button>
    </td>
    </tr>
    `;
    }
    goodListElement.innerHTML += goodTrValue;
    badListElement.innerHTML += badTrValue;
  });

  const totalHourSpan = document.getElementById("totalHours");
  totalHourSpan.innerText = calculateTotalHours();

  const BadHours = document.getElementById("badHour");
  BadHours.innerText = calculateBadHours();
};
// ==================FUNCTION TO CONVERT TASK========================================
const convertTask = (id) => {
  //   console.log("task converted");i
  let task = taskList.find((task) => task.id == id);
  task.type = task.type === "entry" ? "bad" : "entry";

  displayTask();
};

const delList = (id) => {
  if (confirm("Deleting task ....  Are you sure?")) {
    taskList = taskList.filter((item) => {
      return item.id != id;
    });
  }
  //   console.log(taskList);

  displayTask();
};
// ===================calculate total hours======================
const calculateTotalHours = () => {
  let totalHour = taskList.reduce((acc, item) => acc + item.hour, 0);
  return totalHour;
};
// ========================bad calculateTotalHours=======================
const calculateBadHours = () => {
  let totalHour = taskList.reduce((acc, item) => {
    return acc + (item.type === "bad" ? item.hour : 0);
  }, 0);
  return totalHour;
};
