var bcrypt = require('bcrypt');

var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        email: {
            type: 'email',
            unique: true
        },
        username: {
            type: 'email',
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        activated: {
            type: 'boolean',
            defaultsTo: false
        },
        isDeleted: {
            type: 'boolean',
            defaultsTo: false
        },
        role: {
            type: 'string',
            defaultsTo: 'editor'
        },
        activationToken: 'string',
        givenName: 'string',
        familyName: 'string',

        /**
         * Strips the password out of the json
         * object before its returned from waterline.
         * @return {object} the model results in object form
         */
        toJSON: function () {
            // this gives you an object with the current values
            var obj = this.toObject();
            delete obj.password;

            delete obj.activationToken;
            delete obj.activated;
            // return the new object without password
            return obj;
        },
        /**
         * Adds a method called fullName to the response object
         * @return {string} firstName and LastName concat'd
         */
        fullName: function () {
            return this.firstName + ' ' + this.lastName
        }
    },

    beforeCreate: function (user, cb) {
        user.username = user.email;
        crypto.generate({saltComplexity: 10}, user.password, function (err, hash) {
            if (err) {
                return cb(err);
            } else {
                user.password = hash;
                user.activated = false; //make sure nobody is creating a user with activate set to true, this is probably just for paranoia sake
                user.activationToken = crypto.token(new Date().getTime() + user.email);
                return cb(null, user);
            }
        });
    },

    beforeUpdate: function (user, cb) {
        if (user.password) {
            delete user.createdAt;
            delete user.updatedAt;
            delete user.id;

            crypto.generate({saltComplexity: 10}, user.password, function (err, hash) {
                if (err) {
                    return cb(err);
                } else {
                    user.password = hash;
                    return cb(null, user);
                }
            });
        } else {
            return cb(null, user);
        }
    }
};

module.exports = User;
