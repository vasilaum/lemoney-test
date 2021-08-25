'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class Offers extends Schema {
    up() {
        this.create('offers', (table) => {
            table.increments();
            table.string('advertiser_name', 100).notNullable().unique();
            table.string('url', 150).notNullable();
            table.string('description', 500);
            table.date('starts_at').notNullable();
            table.date('ends_at');
            table.boolean('premium').defaultTo(false);
            table.timestamps();
        })
    }

    down() {
        this.drop('offers');
    }
}

module.exports = Offers;