const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );
const moment = require( 'moment' );


router.get( '/', ( req, res ) => {
    console.log( 'In GET request for entry' );
    const queryText = 'SELECT * FROM entry';
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
    console.log( 'In POST request for entry' );
    let newEntry = req.body;
    var now  = req.body.endtime;
    var then = req.body.starttime;

    let hours = moment.utc( moment( now,"HH:mm" ).diff( moment( then,"HH:mm" ) ) ).format( "HH:mm" );
    hours = moment.duration( hours ).asHours();

    // let hours = req.body.endtime - req.body.starttime;

    const queryText = `INSERT INTO entry ( entry, projectname, dateof, starttime, endtime, hours ) VALUES ( $1, $2, $3, $4, $5, $6 )`;
    pool.query( queryText, [ newEntry.entry, newEntry.projectname, newEntry.dateof, newEntry.starttime, newEntry.endtime, hours ] )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to power: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;