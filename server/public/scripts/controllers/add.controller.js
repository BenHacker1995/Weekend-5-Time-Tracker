timeApp.controller( 'AddController', function ( TimeService ) {
    console.log( 'AddController has been loaded' );
    const self = this;

    self.addEntry = function() {
        console.log( 'In addEntry of controller' );
        self.newEntry = {
            entrytext: self.entrytext,
            projectname: self.projectname,
            dateof: self.dateof,
            starttime: self.starttime.toUTCString(),
            endtime: self.endtime.toUTCString(),
            entryhours: self.entryhours,
            project_id: self.project_id
        }
        TimeService.newEntry = self.newEntry;
        TimeService.addEntry().then( function( response ) {
            self.updateId( self.id );
        })
    }

    self.getEntry = function() {
        console.log( 'In getEntry of controller' );
        TimeService.getEntry().then( function( response ){
            self.entries = TimeService.entryArray.list; 
        });
    } // end getEntry

    self.deleteEntry = function( deleteId ) {
        console.log( 'In deleteEntry of controller' );
        TimeService.deleteEntry( deleteId ).then( function( response ) {
            self.getEntry();
        })
    }

    self.updateId = function( deleteId ) {
        console.log( 'In updateId of controller' );
        TimeService.updateId( deleteId ).then( function( response ) {
            self.getEntry();
        })
    }

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

    self.getEntry();
    self.getProject();
})