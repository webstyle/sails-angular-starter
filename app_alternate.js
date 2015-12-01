var sails = require('sails');

// You can do a lot here, but I'll show a few important ones
var options = {

    // Completely disable globals (sails, your models, your services, _, async)
    globals: true,

    // Explicitly name the hooks you want to load:
    // (all other hooks will be skipped)
    loadHooks: ['moduleloader', 'userconfig', 'orm']
};

// Load Sails into memory so you can use it programatically
sails.load(options, function (err) {
    if (err) sails.log('Encountered an error starting Sails:', err);
    sails.log('Sails is ready to go!');

    console.log(sails.config)
    //	sails.models
    //      sails.connections
    // and so on
});

////
//sails.lift(options, function (err) {
//    console.log(options)
//});
