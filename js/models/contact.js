define([
    'app',
    'text!data/country.json'
], function(app, countryJSON) {

    function Contact(data) {
        data && this.parseJSON(data);
    }

    Contact.prototype = {

        fields: [
            {
                "id": "id",
                "type": "system",
                "required": false,
                "title": "Ид"
            },
            {
                "id": "name",
                "type": "text",
                "required": true,
                "title": "ФИО"
            },
            {
                "id": "phone",
                "type": "tel",
                "required": true,
                "title": "Телефон"
            },
            {
                "id": "country",
                "type": "select",
                "required": false,
                "multiple": true,
                "title": "Страна",
                "options": JSON.parse(countryJSON) || []
            },
            {
                "id": "comment",
                "type": "textarea",
                "required": false,
                "title": "Комментарий"
            }
        ],

        parseJSON: function(data) {

            var i,
                field;

            for(i = 0; i < this.fields.length; i++) {
                field = this.fields[ i ];

                if (data[ field["id"] ]) {
                    this[ field["id"] ] = data[ field["id"] ];
                }
            }

        },

        toJSON: function() {

            var result = {},
                i,
                field;

            for(i = 0; i < this.fields.length; i++) {
                field = this.fields[ i ];
                result[ field["id"] ] = this[ field["id"] ];
            }

            return result;

        }

    };

    return Contact;

});