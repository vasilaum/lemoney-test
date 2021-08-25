'use strict';

const Offer = use('App/Models/Offer');
const Database = use('Database');

class OfferController {
    async index({ view }) {
        const currentDate = new Date().toISOString().slice(0, 10);

        const offers = await Database
            .select('*')
            .from('offers')
            .whereRaw(`starts_at <= '${currentDate}' AND (ends_at >= '${currentDate}' OR ends_at IS NULL) ORDER BY premium DESC`);

        return view.render('public.offer', {
            'offers': offers
        });
    }
}

module.exports = OfferController;