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
    let now  = req.body.endtime;
    let then = req.body.starttime;

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

router.put( '/', ( req, res ) => {
    console.log( 'In PUT request for project' );
    const id = req.params.id;
    let hours = 0;
    for( i of req.body.hours ) {
        hours += i;
    }
    const queryText = `UPDATE project SET hours = ${ hours } WHERE id=${ id }`;
    pool.query( queryText )
    .then( ( result ) => {
        console.log( `Successful update of hours`);
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( `Error updating hours in project: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;