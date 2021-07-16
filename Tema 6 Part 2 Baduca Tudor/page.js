var students = [];
var grades;
var current;
document.getElementById("adding").addEventListener("click", function () {
  var x = document.getElementById("bar").value;
  var student = { name: x, avg: "", grades: [] };
  students.push(student);
  document.getElementById("bar").value = "";
  createTab();
});

document.getElementById("bar").addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("adding").click();
  }
});

function createTab() {
  document.getElementById("structure").innerText = "";
  for (let i = 0; i < students.length; i++) {
    var newLine = document.createElement("tr");
    var newRow1 = document.createElement("td");
    var newRow2 = document.createElement("td");
    var newRow3 = document.createElement("td");
    var newRow4 = document.createElement("td");

    var seeGrades = document.createElement("button");
    newRow3.appendChild(seeGrades);
    seeGrades.innerText = "Vezi / Adauga Note";
    seeGrades.addEventListener("click", function () {
      document.getElementById("hidden").style.display = "block";
      grades = students[i].grades;
      createSecondTab();
      current = i;
      
    });

    var deleteStudent = document.createElement("button");
    newRow4.appendChild(deleteStudent);
    deleteStudent.innerText = "X";

    newRow1.innerText = students[i].name;
    newRow2.innerText = students[i].avg;
    document.getElementById("structure").appendChild(newLine);
    newLine.appendChild(newRow1);
    newLine.appendChild(newRow2);
    newLine.appendChild(newRow3);
    newLine.appendChild(newRow4);
  }
}

document.getElementById("ascButton").addEventListener("click", function () {
  students.sort((a, b) => (a.avg > b.avg ? 1 : -1));
  createTab();
});

document.getElementById("descButton").addEventListener("click", function () {
  students.sort((a, b) => (a.avg < b.avg ? 1 : -1));
  createTab();
});

//a2 a Cerinta de enter
document
  .getElementById("secondBar")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("addingPart2").click();
    }
  });
document.getElementById("hideGrades").addEventListener("click", function () {
  document.getElementById("hidden").style.display = "none";
});
document.getElementById("addingPart2").addEventListener("click", function () {
  var gr = document.getElementById("secondBar").value;
  grades.push(gr);
  createSecondTab();
  document.getElementById("secondBar").value = "";

  var total = 0;
  for (var i = 0; i < grades.length; i++) {
    total += parseInt(grades[i]);
  }
  var avg = total / grades.length;
  students [current].avg = avg;
  console.log(avg)
  createTab();
});

function createSecondTab() {
  document.getElementById("structurePart2").innerText = "";
  for (let i = 0; i < grades.length; i++) {
    var lineX2 = document.createElement("tr");
    var rowX2_1 = document.createElement("td");
    var rowX2_2 = document.createElement("td");
    document.getElementById("structurePart2").appendChild(lineX2);
    lineX2.appendChild(rowX2_1);
    lineX2.appendChild(rowX2_2);
    rowX2_1.innerText = grades[i];

    var deleteGrade = document.createElement("button");
    rowX2_2.appendChild(deleteGrade);
    deleteGrade.innerText = "X";
  }
}
