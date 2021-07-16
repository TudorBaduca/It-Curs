for(var i = 1; i <= 20; i++){
    console.log(i);
  
    
}
for(var i = 1; i <= 20; i++){
    if(i % 2 == 1){
        console.log(i);
    }
}


var numbers = [1, 2, 3, 4, 3, 1, 1];
var sum = 0
// sum = sum + numbers[0];
// sum = sum + numbers[1];
for(var i = 0; i <= 6; i++ ){
    sum = sum + numbers[i];
    
}
console.log(sum);


var numbers = [1, 2, 3, 4, 3, 1, 1];
 var max = numbers[0]
 for(i = 0; i <=7; i++){
     if(numbers[i] > max){
        max = numbers[i]
           }
}
console.log(max)


var numbers = [1, 2, 3, 4, 3, 1, 1];
var numberToSearchFor = 1;
var count = 0
for(i = 0; i <=7; i++){
    if(numbers[i] == numberToSearchFor){
         count ++
    }
    
}
console.log(count)
