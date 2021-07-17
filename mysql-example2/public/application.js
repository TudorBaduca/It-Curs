var movies;
class Application {
  constructor() {
    this.url = "movies/";
  }
  init() {
    const app = this; 
    this.loadMovies();
    this.loadDirectors(); 
    // pop-up action by click grey background etc
    $("#grey").click(function(){
      $("#update_part").css("display","none");
      $("#grey").css("display", "none");
      $("#input_part").css("display", "none");
      $("#regizor_div").css("display","none");  
    })
    // sa nu dispara pop-ul daca dau click pe el
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

      // ↓ trimitem la backend filmu adaugat de la linia 28-32 

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
      app.addMovie(movies[i], i); // imi adaug filmele in tabel
      // ↓ 56-64 sterg filmele cand dau pe remove
      $(`#remove_button${i}`).click(function () {
        if (confirm("Do you want to remove this movie?")) {
          $.ajax({
            url: app.url + movies[i].id,
            method: "DELETE",
          });
          $(`#true_remove${i}`).remove();
        }
      });
      // show update pop-up 
      $(`#update_button${i}`).click(function () {
        $("#update_part").css("display", "flex");
        $("#grey").css("display", "flex");
        $("#update_title").val(movies[i].title);
        $("#update_poster").val(movies[i].picture_url);
        $("#update_date").val(movies[i].released_date);
        $("#update_link").val(movies[i].imdb_link);
        // actually do the update (cand schimb film link etc)
        $("#update_add").click(function () {
          var title = $("#update_title").val();
          var picture_url = $("#update_poster").val();
          var released_date = $("#update_date").val();
          var imdb_link = $("#update_link").val();
          $("#input_part").css("display", "none");
          $("#grey").css("display", "none");
          // 82-89 trimit datele la backend
          $.ajax({
            url: app.url + movies[i].id,
            method: "PUT",
            data: { title, picture_url, released_date, imdb_link },
            success: function (response) {
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
    // 113-116 descarc regizori backend
    var regizori = await $.ajax({
      url: app.url + "regizori",
      method: "GET",
    });
    for (let i = 0; i < regizori.length; i++) {
      $("#regizori").append(
        `<tr id ="regizor${i}" class = "hover_class"> <td>${regizori[i].id} </td> <td>${regizori[i].name} </td> </tr>`
      );
      $(`#regizor${i}`).click(function() {
        $("#regizor_div").css("display", "flex");
        $("#grey").css("display", "flex");
        $(".regizor_movie").remove(); // curat ce era inainte pt ca imi apareau regizori dubli
        for(let x = 0; x < movies.length; x++ ){
          console.log(movies[x]);
          if(regizori[i].id == movies[x].id_regizor){
            $("#table_regizor").append(`<tr class = "regizor_movie"><td>${movies[x].id}</td> <td>${movies[x].title}</td></tr>`); //adaug filmele regizorului on click
            
          }
         
          
        }

      })
    }
  }
}
