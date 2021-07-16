const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res) => {
    // 1. connect to db
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "d195DFB0",
        // port: 3306
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            console.log(err)
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const getMoviesSqlQuery = `
            select * from si.movies
        `
        connection.query(getMoviesSqlQuery, function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Result: " + results);
            res.json(results);
            // connection.release();
        });
    });


});
router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    // 1. connect to db
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "d195DFB0",
        // port: 3306
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const getMovieSqlQuery = `select * from si.movies where id=${id}`
        connection.query(getMovieSqlQuery, function (err, results) {
            if (err) {
                console.error(err);
                res.json([]).status(500);
                //connection.release();
                return;
            }
            console.log("Result: " + results);
            res.json(results);
            // connection.release();
        });
    })
});
router.post('/', (req, res) => {
    // 1. connect to db
    const {
        title,
        released_date,
        picture_url,
        imdb_link
    } = req.body;
    console.log(req.body);
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "d195DFB0",
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const insertMoviesSqlQuery = `insert into si.movies(title, released_date, picture_url, imdb_link)
        values('${title}', '${released_date}', '${picture_url}', '${imdb_link}')`
        connection.query(insertMoviesSqlQuery, function (err, results) {
            if (err) {
                console.error(err);
                res.json({
                    success: false
                });
                // connection.release();
                return;
            }
            console.log("Result: " + results);
            res.json({
                success: true
            });
            // connection.release();
        });
    });
});
router.put('/:id', (req, res) => {
    // 1. connect to db
    const {
        title,
        released_date,
        picture_url,
        imdb_link
    } = req.body;
    const { id } = req.params;
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "d195DFB0",
    })
    console.log("orice");

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const updateMoviesSqlQuery = `update si.movies set title='${title}', 
        released_date = '${released_date}', 
        picture_url = '${picture_url}',
        imdb_link = '${imdb_link}'
        where id=${id}
        `
        connection.query(updateMoviesSqlQuery, function (err, results) {
            // if query was successfully done, err is null 
            if (err) {
                console.error(err);
                res.json({
                    success: false
                });
                // connection.release();
                return;
            }
            console.log("Result: " + results);
            res.json({
                success: true
            });
            // connection.release();
        });
    });
});
router.delete('/:id', (req, res) => {
    // 1. connect to db
    const { id } = req.params;
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "d195DFB0",
    })

    connection.connect(function (err) {
        if (err) {
            console.error('Connection to DB failed');
            return;
        }
        console.log("Connected to the database!");
        //2. query movies table
        const deleteMoviesSqlQuery = `delete from si.movies
        where id=${id}
        `
        connection.query(deleteMoviesSqlQuery, function (err, results) {
            // if query was successfully done, err is null 
            if (err) {
                console.error(err);
                res.json({
                    success: false
                });
                // connection.release();
                return;
            }
            console.log("Result: " + results);
            res.json({
                success: true
            });
            // connection.release();
        });
    });
});
module.exports = router;


// GET /movies/
// GET /movies/:id
// GET /movies/:id/reviews
// GET /movies/:id/reviews/:review_id
// GET /movies/:id/plot_summary/
// GET /movies/:id/synopsis/
// GET /movies/:id/tagline/


// /movies -> routes/movies 


// GET /name
// GET /countries