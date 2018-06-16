const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );
const moment = require( 'moment' );


router.get( '/', ( req, res ) => {
    console.log( 'In GET request for entry' );
    const queryText = `SELECT entry.entrytext, entry.entryhours, entry.dateof, entry.projectname FROM entry;`;
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
    
    let now  = req.body.endtime;
    let then = req.body.starttime;

    let hours = moment.utc( moment( now,"HH:mm" ).diff( moment( then,"HH:mm" ) ) ).format( "HH:mm" );
    hours = moment.duration( hours ).asHours();
    
    const queryProjectText = `INSERT INTO project ( name, totalhours ) VALUES ( ${ req.body.projectname }, SUM( `
    const queryEntryText = `INSERT INTO entry ( entrytext, projectname, dateof, starttime, endtime, entryhours ) VALUES ( $1, $2, $3, $4, $5, $6 )`;
    pool.query( queryEntryText, [ newEntry.entrytext, newEntry.projectname, newEntry.dateof, newEntry.starttime, newEntry.endtime, hours ] )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to power: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;