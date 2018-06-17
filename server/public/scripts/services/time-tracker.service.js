timeApp.service( 'TimeService', [ '$http', function( $http ) {
    console.log( 'TimeService has been loaded' );
    const self = this;

    self.entryArray = { list: [] };
    self.projectArray = { list: [] };


    self.addEntry = function( object ){
        return $http({
            method: 'POST',
            url: '/add',
            data: self.newEntry
        }).then(function( response ){
            console.log( 'Posted POST for /add' );
            self.getEntry();
        }).catch(function( error ){
            console.log( `Error handling POST for /add: ${ error }` );
        });
    } // end addEntry

    self.addProject = function( object ){
        return $http({
            method: 'POST',
            url: '/manage',
            data: self.newProject
        }).then(function( response ){
            console.log( 'Posted POST for /manage' );
            self.getProject();
        }).catch(function( error ){
            console.log( `Error handling POST for /manage: ${ error }` );
        });
    } // end addProject

    self.getEntry = function(){
        return $http({
            method: 'GET',
            url: '/add'
        }).then( function( response ){
            console.log( 'Handled getEntry for /add: ', response.data );
            self.entryArray.list = response.data;            
        }).catch( function( error ){
            console.log( 'Error handling getEntry for /add: ', error );
        });
    } // end getEntry

    self.getProject = function(){
        return $http({
            method: 'GET',
            url: '/manage'
        }).then( function( response ){
            console.log( 'Handled getProject for /manage: ', response );
            self.projectArray.list = response.data;            
        }).catch( function( error ){
            console.log( 'Error handling getProject for /manage: ', error );
        });
    } // end getEntry

    self.deleteEntry = function( deleteId ) {
        return $http({
            method: 'DELETE',
            url: `/add/${deleteId}`
        }).then( function( response ) {
            console.log( `Handled deleteEntry for /add: ${ response }` );
        }).catch( function( error ) {
            console.log( `Error handling deleteEntry for /add: ${ error }` );
        })
    }

    self.deleteProject = function( deleteId ) {
        return $http({
            method: 'DELETE',
            url: `/manage/${deleteId}`
        }).then( function( response ) {
            console.log( `Handled deleteEntry for /manage: ${ response }` );
        }).catch( function( error ) {
            console.log( `Error handling deleteEntry for /manage: ${ error }` );
        })
    }

    self.updateId = function() {
        return $http({
            method: 'PUT',
            url: '/add'
        }).then( function( response ) {
            console.log( `Handled updateId for /add: ${ response }` );
        }).catch( function( error ) {
            console.log( `Error handling updateId for /add: ${ error }` );
        });
    }
}])