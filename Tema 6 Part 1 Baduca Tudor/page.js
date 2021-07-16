var shoppingItems = [];

document.getElementById("adding").addEventListener("click", function(){
  
  var product = document.getElementById("bar").value;
  var x = {name:product, bought:false}
  shoppingItems.push(x);
  createList()
  document.getElementById('bar').value = "";
  
  

});

document.getElementById("bar").addEventListener("keyup", function(event) {
  
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById("adding").click();

  }
  });

    function createList(){
  document.getElementById("structure").innerText = "";
for (let i = 0; i < shoppingItems.length; i++){
    var newLine = document.createElement("tr");
    var row1 = document.createElement("td");
    var row2 = document.createElement("td");
    row1.innerText = shoppingItems[i].name;

    if (shoppingItems[i].bought == true){
      row1.style.textDecoration = "line-through";
      
    }
    
   var button =  document.createElement("button");
   button.innerText = "Mark as buyed";
   button.className = "buyedButton";
   button.addEventListener("click", function(){
     shoppingItems[i].bought = true
     createList();
   })
   row2.appendChild(button);

   
   newLine.appendChild(row1);
   newLine.appendChild(row2);
   document.getElementById("structure").appendChild(newLine);
}
}

document.getElementById("ascButton").addEventListener("click", function(){
  shoppingItems.sort((a, b) => (a.name > b.name ? 1 : -1));
  createList();
})

document.getElementById("descButton").addEventListener("click", function(){
  shoppingItems.sort((a, b) => (a.name < b.name ? 1 : -1));
  createList();

})