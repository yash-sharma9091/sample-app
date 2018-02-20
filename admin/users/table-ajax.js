var TableAjax= function(){

var handleRecords = function (options) {


        var grid = new Datatable();

        grid.init({
            src: $("#datatable_ajax"),
            onSuccess: function (response) {
                // execute some code after table records loaded
                setTimeout(function() { $('.tooltips').tooltip(); }, 1000);
            },
            onError: function (grid, err) {
                // execute some code on network or other general error  
            },
            loadingMessage: 'Loading...',
            dataTable: { // here you can define a typical datatable settings from http://datatables.net/usage/options 

                // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
                // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js). 
                // So when dropdowns used the scrollable div should be removed. 
                // "dom": "<'row'<'col-md-7 col-sm-12'pli><'col-md-5 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",
                "dom": "<'row'<'col-md-7 col-sm-12'><'col-md-5 col-sm-12'<'table-group-actions pull-right'>>r><'table-responsive't><'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>", // datatable layout
                
                "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
                "lengthMenu": [
                    [10, 20, 50, 100, 150, 200],
                    [10, 20, 50, 100, 150, 200] // change per page values here
                ],
                "pageLength": 10, // default record count per page
                "ajax": {
                    "url": baseUrl(options.url), // ajax source
                    "headers": {
                        "Authorization": "Bearer " + JSON.parse(prefix('token'))
                    },
                    "error": function (err) {
                        
                        var message = "Could not complete request. Please check your internet connection";
                        App.unblockUI(grid.gettableContainer());
                        if( err.status === 401  ) {
                            if( err.responseJSON.errors.code === "invalid_token" ) {
                                var $body = angular.element(document.body);            
                                var $rootScope = $body.injector().get('$rootScope');
                                message = "Your Session has been expired, please login again to continue.";
                                setTimeout(function () {
                                    $rootScope.clearToken();    
                                }, 1500);
                            }
                        }

                        App.alert({
                            type: 'danger',
                            icon: 'warning',
                            message: message,
                            container: grid.getTableWrapper(),
                            place: 'prepend'
                        });
                    }
                },
                "columns": options.columns
                // "order": [
                //     [1, "asc"]
                // ] // set first column as a default sort by asc
            }
        });

       
    };

 return {

        //main function to initiate the module
        init: function (options) {
            handleRecords(options);
        }

    }
}();