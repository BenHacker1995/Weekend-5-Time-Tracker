const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const addRouter = require( './modules/routers/add.router' );
const manageRouter = require( './modules/routers/manage.router' );

const PORT = process.env.PORT || 5000;

const app = express();

app.use( express.static( 'server/public' ) );

app.use( bodyParser.json() );

app.use( '/add', addRouter );
app.use( '/manage', manageRouter );

app.listen(PORT, () => {
    console.log( `Listening on port ${ PORT }` );
});