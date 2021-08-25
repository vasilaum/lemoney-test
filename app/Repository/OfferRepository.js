'use strict';

const Offer = use('App/Models/Offer');

class OfferRepository {
    static async findAll() {
        const offers = await Offer.all();

        return offers.toJSON();
    }

    static async findById(id) {
        return Offer.findOrFail(id);
    }

    static async create(requestData) {
        await Offer.create({
            advertiser_name: requestData.advertiser_name,
            url: requestData.url,
            description: requestData.description,
            starts_at: requestData.starts_at,
            ends_at: requestData.ends_at,
            premium: requestData.premium
        });
    }

    static async update(requestData) {
        const obj = await Offer.findOrFail(requestData.id);

        obj.advertiser_name = requestData.advertiser_name;
        obj.url = requestData.url;
        obj.description = requestData.description;
        obj.starts_at = requestData.starts_at;
        obj.ends_at = requestData.ends_at;
        obj.premium = requestData.premium !== 'on' ? false : true;

        await obj.save();
    }

    static async destroy(id) {
        const obj = await Offer.findOrFail(id);
        await obj.delete();
    }

    static async setOfferStatus(offers) {
        offers.map(function (offer) {
            const startsAt = new Date(offer.starts_at);
            const endsAt = new Date(offer.ends_at);
            const currentDate = new Date(new Date().toISOString().slice(0, 10));

            if (startsAt > currentDate) {
                offer.status = 'disabled';
            } else if (offer.ends_at === null || offer.ends_at === "") {
                offer.status = 'enabled';
            } else if (endsAt < currentDate) {
                offer.status = 'disabled';
            } else {
                offer.status = 'enabled';
            }
        });

        return offers;
    }
}

module.exports = { OfferRepository }