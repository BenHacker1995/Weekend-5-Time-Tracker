timeApp.service( 'TimeService', [ '$http', function( $http ) {
    console.log( 'TimeService has been loaded' );
    const self = this;

    self.entryArray = { list: [] };

    self.getEntry = function(){
        return $http({
            method: 'GET',
            url: '/add'
        }).then( function( response ){
            console.log('Handled getEntry for /add: ', response );
            self.entryArray.list = response.data;            
        }).catch( function( error ){
            console.log( 'Error handling getEntry for /add: ', error );
        });
    } // end getEntry
    self.getEntry();
}])