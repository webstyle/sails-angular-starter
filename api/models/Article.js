/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

    attributes: {
        toJSON: function () {
            var obj = this.toObject();

            return {
                user: obj.user,
                title: obj.title,
                content: obj.content,
                status: obj.status || 'concept',
                type: obj.type,
                createdAt: obj.createdAt,
                updatedAt: obj.updatedAt,
                id: obj.id
            };
        }
    }
};

