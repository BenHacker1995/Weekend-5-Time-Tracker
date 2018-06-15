timeApp.controller( 'ManageController', [ 'TimeService', function ( TimeService ) {
    console.log( 'ManageController has been loaded' );
    const self = this;

    self.getProject = function() {
        console.log( 'In getProject of controller' );
        TimeService.getProject().then( function( response ){
            self.projects = TimeService.projectArray.list; 
        });
    } // end getProjecyt
    
    self.getProject();
}])