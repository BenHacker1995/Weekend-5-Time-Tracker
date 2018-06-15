timeApp.controller( 'AddController', function ( TimeService ) {
    console.log( 'AddController has been loaded' );
    const self = this;

    self.addEntry = function() {
        console.log( 'In addEntry of controller' );
        self.newEntry = {
            entry: self.entry,
            projectname: self.projectname,
            dateof: self.dateof,
            starttime: self.starttime,
            endtime: self.endtime,
            hours: self.hours
        }
        TimeService.newEntry = self.newEntry;
        TimeService.addEntry().then( function( response ) {
            self.getEntry();
            self.updateHours();
        })
    }

    self.getEntry = function() {
        console.log( 'In getEntry of controller' );
        TimeService.getEntry().then( function( response ){
            self.entries = TimeService.entryArray.list; 
        });
    } // end getPowers

    self.updateHours = function() {
        console.log( 'In updateHours of controller' );
        TimeService.updateHours();
    }
    self.getEntry();
})