define([
    'app',
    'models/contact',
    'text!data/contacts.json'
], function (app, Contact, contactsDefault) {

    var defaults = {
            'contacts': JSON.parse(contactsDefault)
        },
        objects = {
            'contacts': Contact
        },
        cache = {};

    return app.factory(
        'storage',
        function () {

            return {

                get: function (storageID) {

                    var cached = cache[storageID],
                        object = objects[storageID],
                        stored,
                        items,
                        itemsObject;

                    if (!cached) {
                        stored = localStorage.getItem(storageID);
                        stored = stored ? JSON.parse(stored) : false;

                        items =  stored || cached || defaults[ storageID ] || [];

                        if (object) {
                            itemsObject = [];

                            for(var i = 0; i < items.length; i++) {
                                itemsObject.push( new object( items[ i ] ) );
                            }

                            items = itemsObject;
                        }

                        cache[ storageID ] = items;
                    } else {
                        items = cached;
                    }

                    return items;

                },

                getByID: function(storageID, id) {

                    var all = this.get(storageID),
                        i,
                        item;

                    if (storageID) {
                        for (i = 0; i < all.length; i++) {
                            item = all[ i ];

                            if (item.id == id) {
                                return item;
                            }
                        }
                    }

                },

                save: function (storageID) {

                    var data = this.get(storageID),
                        i,
                        item,
                        result = [];

                    if (data) {
                        for (i = 0; i < data.length; i++) {
                            item = data[i];
                            result.push((item && item.toJSON) ? item.toJSON() : item);
                        }

                        localStorage.setItem(storageID, JSON.stringify(result));
                    }
                },

                add: function (storageID, data) {

                    var i,
                        ids,
                        items = this.get(storageID),
                        object = objects[ storageID ];

                    if (object && !data instanceof object) {
                        data = new object(data);
                    }

                    if (!data.id) {
                        ids = [];

                        for (i = 0; i < items.length; i++) {
                            ids.push(items[i].id);
                        }

                        data.id = Math.max.apply(Math, ids);

                        if (isNaN(data.id)) {
                            data.id = Math.round(Math.random() * 10000);
                        } else {
                            data.id += 1;
                        }
                    }

                    items.push(data);

                    this.save(storageID);
                }

            };

        }
    );

});