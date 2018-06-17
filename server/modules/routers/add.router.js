const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );
const moment = require( 'moment' );


router.get( '/', ( req, res ) => {
    console.log( 'In GET request for entry' );
    // const queryText = `SELECT entry.entrytext, entry.entryhours, entry.dateof, entry.projectname FROM entry;`;
    const queryText = `SELECT entry.entrytext, entry.entryhours, entry.dateof, entry.projectname, entry.project_id, project.id
    FROM entry
    LEFT JOIN project ON entry.project_id = project.id
    GROUP BY entry.entrytext, entry.entryhours, entry.dateof, entry.projectname, entry.project_id, project.id;`
    // const queryText = `SELECT * from entry;`
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
    
    const queryEntryText = `INSERT INTO entry ( entrytext, projectname, dateof, starttime, endtime, entryhours, project_id ) VALUES ( $1, $2, $3, $4, $5, $6, $7 );`;
    // UPDATE entry SET project_id = project.id FROM project WHERE entry.projectname = project.name;`;
    pool.query( queryEntryText, [ newEntry.entrytext, newEntry.projectname, newEntry.dateof, newEntry.starttime, newEntry.endtime, hours ] )
    // pool.query( queryIdText )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to power: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;