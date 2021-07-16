var movies;
class Application {
  //mi am creat clasa Application
  constructor() {
    this.url = "movies/";
  }
  init() {
    // am adaugat functia ''init''
    const app = this; // la linia 13 nu mai pot folosi "this"
    this.loadMovies();
    this.loadDirectors();
    $("#grey").click(function(){
      $("#update_part").css("display","none");
      $("#grey").css("display", "none");
      $("#input_part").css("display", "none");
      $("#regizor_div").css("display","none");  
    })
    $(".popup").click(function(ev){
      ev.stopPropagation();
      
    })

    $("#add_movie").click(function () {
      $("#input_part").css("display", "flex");
      $("#grey").css("display", "flex");
    });

    $("#add").click(async function () {
      var title = $("#title").val();
      var picture_url = $("#poster").val();
      var released_date = $("#date").val();
      var imdb_link = $("#link").val();
      $("#input_part").css("display", "none");
      $("#grey").css("display", "none");

      await $.ajax({
        url: app.url,
        method: "POST",
        data: { title, picture_url, released_date, imdb_link },
      });
      location.reload();
    });
  }

  async loadMovies() {
    const app = this;
     movies = await $.ajax({
      url: app.url,
      method: "GET",
    });
    for (let i = 0; i < movies.length; i++) {
      app.addMovie(movies[i], i); // am apelat addmovie

      $(`#remove_button${i}`).click(function () {
        if (confirm("Do you want to remove this movie?")) {
          $.ajax({
            url: app.url + movies[i].id,
            method: "DELETE",
          });
          $(`#true_remove${i}`).remove();
        }
      });
      $(`#update_button${i}`).click(function () {
        $("#update_part").css("display", "flex");
        $("#grey").css("display", "flex");
        $("#update_title").val(movies[i].title);
        $("#update_poster").val(movies[i].picture_url);
        $("#update_date").val(movies[i].released_date);
        $("#update_link").val(movies[i].imdb_link);

        $("#update_add").click(function () {
          var title = $("#update_title").val();
          var picture_url = $("#update_poster").val();
          var released_date = $("#update_date").val();
          var imdb_link = $("#update_link").val();
          $("#input_part").css("display", "none");
          $("#grey").css("display", "none");

          $.ajax({
            url: app.url + movies[i].id,
            method: "PUT",
            data: { title, picture_url, released_date, imdb_link },
            success: function (response) {
              // Ce sa se intample cu ce a descarcat
              console.log(response);
              location.reload();
            },
          });
        });
      });
    }
  }

  addMovie({ id, title, released_date, picture_url, imdb_link }, i) {
    //am folosit Destructuring

    $("#movies").append(
      `<tr id = "true_remove${i}">
              <td>${id}</td>
              <td> <img src="${picture_url}" alt=""/></td>
              <td>${title}</td>
              <td>${released_date}</td>
              <td> <a href="${imdb_link}" >Movie</a></td>
              <td><button id ="remove_button${i}">Remove</button> <button id = "update_button${i}">Update</button></td>
              
          </tr>`
    );
  }
  async loadDirectors() {
    const app = this;
    var regizori = await $.ajax({
      url: app.url + "regizori",
      method: "GET",
    });
    for (let i = 0; i < regizori.length; i++) {
      $("#regizori").append(
        `<tr id ="regizor${i}"> <td>${regizori[i].id} </td> <td>${regizori[i].name} </td> </tr>`
      );
      $(`#regizor${i}`).click(function() {
        $("#regizor_div").css("display", "flex");
        $("#grey").css("display", "flex");
        $(".regizor_movie").remove();
        for(let x = 0; x < movies.length; x++ ){
          console.log(movies[x]);
          if(regizori[i].id == movies[x].id_regizor){
            $("#table_regizor").append(`<tr class = "regizor_movie"><td>${movies[x].id}</td> <td>${movies[x].title}</td></tr>`);
            
          }
         
          
        }

      })
    }
  }
}
