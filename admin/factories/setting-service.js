/* Setup global settings */
myapp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000, // auto scroll to top on page load
           
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };

    $rootScope.settings = settings;
    return settings;
}]);


/**emptybj h */
myapp.factory('notificationSvr', [function () {
    var notification ={};
    notification.markAsRead = function( data) {
        console.log(data);
    };
    return notification;

}]);
