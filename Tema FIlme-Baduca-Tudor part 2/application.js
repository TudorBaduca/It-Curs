class Application{          //mi am creat clasa Application
    constructor(){
      this.url = "index.json";
    }
    init() {   // am adaugat functia ''init''
      const app = this; // la linia 13 nu mai pot folosi "this"
      $.ajax({
        url: this.url,
        method: "GET",
        success: function (response) {
          const movies = response; // var -> const
          for (let i = 0; i < movies.length; i++) {
            app.addMovie(movies[i], i); // am apelat addmovie
    
            $(`#remove_button${i}`).click(function () {
              $(`#true_remove${i}`).remove();
            });
          }
        },
      });
    }
  
    addMovie({ nr, poster, title, data, actors, directors, rating, link },i) { //am folosit Destructuring
    
      $("#movies").append(
        `<tr id = "true_remove${i}">
              <td>${nr}</td>
              <td> <img src="${poster}" alt=""/></td>
              <td>${title}</td>
              <td>${data}</td>
              <td>${actors}</td>
              <td>${directors}</td>
              <td>${rating}</td>
              <td> <a href="${link}" >Movie</a></td>
              <td><button id ="remove_button${i}">Remove</button></td>
          </tr>`
      );
    }
  }