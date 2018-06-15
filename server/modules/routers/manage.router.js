const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );
const moment = require( 'moment' );


router.get( '/', ( req, res ) => {
    console.log( 'In GET request for project' );
    const queryText = 'SELECT * FROM project';
    pool.query( queryText )
    .then(  ( result ) => {
        console.log( `Back from the database with ${ result }`);
        res.send( result.rows );
    }).catch( ( error ) => {
        console.log( `Error getting entries: ${ error }` );
        res.sendStatus( 500 );
    });
})

router.post( '/', ( req, res ) => {
    console.log( 'In POST request for project' );
    let newProject = req.body;

    const queryText = `INSERT INTO project ( name, hours ) VALUES ( $1, $2 )`;
    pool.query( queryText, [ newProject.name, 0 ] )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to power: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;