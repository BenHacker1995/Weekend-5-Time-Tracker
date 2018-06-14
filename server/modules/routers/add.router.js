const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );


router.get( '/', ( req, res ) => {
    console.log( 'In GET request for entry' );
    const queryText = 'SELECT * FROM entry';
    pool.query( queryText )
    .then(  ( result ) => {
        console.log( `Back from the database with ${ result }`);
        res.send( result.rows );
    }).catch( ( error ) => {
        console.log( `Error getting powers: ${ error }` );
        res.sendStatus( 500 );
    });
})

module.exports = router;