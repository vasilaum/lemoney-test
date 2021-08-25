'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Offer extends Model {
    static get dates() {
        return super.dates.concat(['starts_at', 'ends_at']);
    }

    static castDates(field, value) {
        const dateFields = ['starts_at', 'ends_at'];

        if (dateFields.includes(field)) {
            return value.format('YYYY-MM-DD')
        }

        return super.formatDates(field, value)
    }
}

module.exports = Offer;