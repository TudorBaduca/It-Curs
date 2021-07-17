const express = require('express');
const router = express.Router();
const databaseModule = require('../utils/database');

const database = databaseModule();

router.get('/', async (req, res) => {
    const getMoviesSqlQuery = `
        select * from si.movies
    `
    /*database.query(getMoviesSqlQuery, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Result: " + results);
        res.json(results);
    });*/

    try {
        const results =  await database.query(getMoviesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.get('/regizori/', async (req, res) => {
    const getMoviesSqlQuery = `
        select * from si.regizori
    `
    /*database.query(getMoviesSqlQuery, function (err, results) {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Result: " + results);
        res.json(results);
    });*/

    try {
        const results =  await database.query(getMoviesSqlQuery);
        console.log("Result: " + results);
        res.json(results);
    } catch (err){
        console.error(err);
    }
});

router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;

    const getMovieSqlQuery = `select * from si.movies where id=${id}`

    database.query(getMovieSqlQuery, function (err, results) {
        if (err) {
            console.error(err);
            res.json([]).status(500);
            return;
        }
        console.log("Result: " + results);
        res.json(results);
    });
})

router.post('/', (req, res) => {
    // 1. connect to db
    const {
        title,
        released_date,
        picture_url,
        imdb_link
    } = req.body;
    console.log(req.body);
    const insertMoviesSqlQuery = `insert into si.movies(title, released_date, picture_url, imdb_link)
        values('${title}', '${released_date}', '${picture_url}', '${imdb_link}')`
    database.query(insertMoviesSqlQuery, function (err, results) {
        if (err) {
            console.error(err);
            res.json({
                success: false
            });
            return;
        }
        console.log("Result: " + results);
        res.json({
            success: true
        });
    });
});

router.put('/:id', (req, res) => {
    const {
        title,
        released_date,
        picture_url,
        imdb_link
    } = req.body;
    const {
        id
    } = req.params;
    const updateMoviesSqlQuery = `update si.movies set title='${title}', 
        released_date = '${released_date}', 
        picture_url = '${picture_url}',
        imdb_link = '${imdb_link}'
        where id=${id}
        `
    database.query(updateMoviesSqlQuery, function (err, results) {
        // if query was successfully done, err is null 
        if (err) {
            console.error(err);
            res.json({
                success: false
            });
            return;
        }
        console.log("Result: " + results);
        res.json({
            success: true
        });
    });
});

router.delete('/:id', (req, res) => {
    // 1. connect to db
    const {
        id
    } = req.params;
    //2. query movies table
    const deleteMoviesSqlQuery = `delete from si.movies
        where id=${id}
        `
    database.query(deleteMoviesSqlQuery, function (err, results) {
        // if query was successfully done, err is null 
        if (err) {
            console.error(err);
            res.json({
                success: false
            });
            
            return;
        }
        console.log("Result: " + results);
        res.json({
            success: true
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