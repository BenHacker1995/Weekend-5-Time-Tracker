const router = require( 'express' ).Router();
const pool = require( '../pools/pool' );

router.get( '/', ( req, res ) => {
    console.log( 'In GET request for project' );
    let queryText = `SELECT project.name, SUM(entry.entryhours), project.id
    FROM project
    LEFT JOIN entry ON project.name = entry.projectname
    GROUP BY project.name, project.id;`;
    
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
    const queryText = `INSERT INTO project ( name ) VALUES ( $1 )`;
    pool.query( queryText, [ newProject.name ] )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to project: ${ error }` );
        res.sendStatus( 500 );
    })
})

router.delete( '/:id', ( req, res ) => {
    console.log( 'In DELETE request for manage' );
    const queryText = `DELETE FROM project WHERE id = $1;`;
    
    pool.query( queryText, [ req.params.id ] )
    .then( ( result ) => {
        console.log( `Successfully deleted project` );
        res.sendStatus( 200 );
    }).catch( ( error ) => {
        console.log( `Error deleting from database: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;