const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );
const moment = require( 'moment' );


router.get( '/', ( req, res ) => {
    console.log( 'In GET request for entry' );
    // const queryText = `SELECT entry.entrytext, entry.entryhours, entry.dateof, entry.projectname FROM entry;`;
    // const queryText = `SELECT entry.entrytext, entry.entryhours, entry.dateof, entry.projectname, entry.project_id, entry.id, project.id
    // FROM entry
    // LEFT JOIN project ON entry.project_id = project.id
    // GROUP BY entry.entrytext, entry.entryhours, entry.dateof, entry.projectname, entry.project_id, entry.id, project.id;`
    const queryText = `SELECT * from entry;`
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
    now = moment( now ).format( "HH:mm" );
    then = moment( then ).format( "HH:mm" );


    let hours = moment.utc( moment( now,"HH:mm" ).diff( moment( then,"HH:mm" ) ) ).format( "HH:mm" );
    hours = moment.duration( hours ).asHours();
    
    const queryEntryText = `INSERT INTO entry ( entrytext, projectname, dateof, starttime, endtime, entryhours ) VALUES ( $1, $2, $3, $4, $5, $6 );`;
    // UPDATE entry SET project_id = project.id FROM project WHERE entry.projectname = project.name;`;
    pool.query( queryEntryText, [ newEntry.entrytext, newEntry.projectname, newEntry.dateof, then, now, hours ] )
    // pool.query( queryIdText )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting: ${ error }` );
        res.sendStatus( 500 );
    })
})

router.put( '/', ( req, res ) => {
    console.log( 'In PUT request for entry' );
    const queryText = `UPDATE entry SET project_id = project.id FROM project WHERE entry.projectname = project.name;`;
    pool.query( queryText )
    .then( ( result ) => {
        console.log( `Successfully updated id` );
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( `Error updating database: ${ error }` );
        res.sendStatus( 500 );
    })
})

router.delete( '/:id', ( req, res ) => {
    console.log( 'In DELETE request for entry' );
    const queryText = `DELETE FROM entry WHERE id = $1;`;
    
    pool.query( queryText, [ req.params.id ] )
    .then( ( result ) => {
        console.log( `Successfully deleted entry` );
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( `Error deleting from database: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;