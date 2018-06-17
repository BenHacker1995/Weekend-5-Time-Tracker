timeApp.controller( 'ManageController', [ 'TimeService', function ( TimeService ) {
    console.log( 'ManageController has been loaded' );
    const self = this;

    self.addProject = function() {
        console.log( 'In addProject of controller' );
        self.newProject = {
        name: self.name
        }
        TimeService.newProject = self.newProject;
        TimeService.addProject().then( function( response ) {
            self.getProject();
        })
    }

    self.deleteProject = function( deleteId ) {
        console.log( 'In deleteProject of controller' );
        TimeService.deleteProject( deleteId ).then( function( response ) {
            self.getProject();
        })
    }

    self.getProject = function() {
        console.log( 'In getProject of controller' );
        TimeService.getProject().then( function( response ){
            self.projects = TimeService.projectArray.list; 
        });
    } // end getProject
    
    self.getProject();
}])