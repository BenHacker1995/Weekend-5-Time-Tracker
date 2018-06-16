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
    let hours = pool.query(`SELECT project.name, SUM(entry.entryhours), project.id
    FROM project
    LEFT JOIN entry ON project.name = entry.projectname
    GROUP BY project.name, project.id;`);

    console.log( 'hours:', hours);
    

    const queryText = `INSERT INTO project ( name, hours ) VALUES ( $1, $2 )`;
    pool.query( queryText, [ newProject.name, hours.sum ] )
    .then( ( result ) => {
        console.log( `Successfully posted to database with ${ result }` );
        res.sendStatus( 201 );
    }).catch( ( error ) => {
        console.log( `Error posting to power: ${ error }` );
        res.sendStatus( 500 );
    })
})

module.exports = router;