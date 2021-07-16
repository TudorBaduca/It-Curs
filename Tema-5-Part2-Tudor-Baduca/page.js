document.getElementById("Button").addEventListener("click", function () {
  var ok = true;
  if (document.getElementById("lastName").value === "") {
    ok = false;
    document.getElementById("lastName").style.borderColor = "red";
  }
  else {
    document.getElementById("lastName").style.borderColor = "black";
    
  }
  if (document.getElementById("name").value === "") {
    ok = false;
    document.getElementById("name").style.borderColor = "red";
  }
  if (document.getElementById("name").value !== "") {
    document.getElementById("name").style.borderColor = "black";
  }
  if (ok == true){
    document.getElementById("bannerPart").style.visibility = "visible";
  }
    document.getElementById("lastName").value = "";
    document.getElementById("name").value = "";
    // document.getElementById("bannerPart").style.visibility = "hidden";
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = false;




 

  var name = document.getElementById("name").value;
  document.getElementById("spanPart").innerHTML = name;
});
