
    function play() {
        var game = [ "rock", "paper", "scissors"];
        var user =  game [ Math.floor(Math.random() * 3 )];
        var cpu  =  game [ Math.floor(Math.random() * 3 )];
        console.log("User choice " + user);
        console.log("Cpu choice " + cpu);

        if(user == "paper" && cpu == "paper"){
            console.log("Tie");
        }
        if(user == "rock" && cpu == "paper"){
            console.log("Cpu Wins");
        }
        if(user == "rock" && cpu == "scissors"){
            console.log("User Wins");

        }
        if(user == "rock" && cpu == "rock"){
            console.log("Tie");

        }
        if(user == "paper" && cpu == "rock"){
            console.log("User Wins");
        }
        if(user == "paper" && cpu == "scissors"){
            console.log("Cpu Wins");

        }
        if(user == "scissors" && cpu == "scissors"){
            console.log("Tie")
        }
        if(user == "scissors" && cpu == "rock"){
            console.log("Cpu Wins");

        }
        if(user == "scissors" && cpu == "paper"){
            console.log("User Wins");
        }
    
    }

    play()