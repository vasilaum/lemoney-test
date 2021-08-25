'use strict';

const { OfferRepository } = use('App/Repository/OfferRepository');

class OfferController {
    async index({ view }) {
        let getOffers   = await OfferRepository.findAll();
        const offers    = await OfferRepository.setOfferStatus(getOffers);

        return view.render('offer', {
            'offers': offers,
        });
    }

    async form({ params, view }) {
        if (params.id != null) {
            const offer = await OfferRepository.findBy(params.id);

            return view.render('offer_edit', {
                'offer': offer.toJSON()
            });
        }

        return view.render('offer_form');
    }

    async store({ request, response }) {
        try {
            await OfferRepository.create(request.all());

            response.status(200).send({
                message: "Insert Successful",
                succefulRequestAction: 'back'
            });
        } catch (err) {
            response.status(500).send({
                message: err.message
            });
        }
    }

    async update({ request, response }) {
        try {
            await OfferRepository.update(request.all());

            response.status(200).send({
                message: "Update Successful",
                succefulRequestAction: 'back'
            });
        } catch (err) {
            response.status(500).send({
                message: err.message
            });
        }
    }

    async destroy({ params, response }) {
        try {
            await OfferRepository.destroy(params.id);

            response.status(200).send({
                message: "Delete Successful",
                succefulRequestAction: 'reload'
            });
        } catch (err) {
            response.status(500).send({
                message: err.message
            });
        }
    }

    async disable({ params, response }) {
        try {
            const Offer = await OfferRepository.findBy(params.id);

            var date = new Date();
            date.setDate(date.getDate() - 1);

            const yesterday = date.toISOString().slice(0, 10);

            Offer.ends_at    = yesterday;
            Offer.starts_at  = yesterday;

            await Offer.save();

            response.status(200).send({
                message: "Disable Successful"
            });
        } catch (err) {
            response.status(500).send({
                message: err.message
            });
        }
    }

    async enable({ params, response }) {
        try {
            const Offer = await OfferRepository.findBy(params.id);

            const today = new Date().toISOString().slice(0, 10);

            Offer.ends_at    = null;
            Offer.starts_at  = today;

            await Offer.save();

            response.status(200).send({
                message: "Enable Successful"
            });
        } catch (err) {
            response.status(500).send({
                message: err.message
            });
        }
    }
}

module.exports = OfferController;