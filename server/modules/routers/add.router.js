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

router.post( '/', ( req, res ) => {
    console.log( 'In POST request for entry' );
    let newEntry = req.body;
    const queryText = `INSERT INTO entry ( entry, hours ) VALUES ( $1, $2 )`;
    pool.query( queryText, [ newEntry.entry, newEntry.hours ] )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to power: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;