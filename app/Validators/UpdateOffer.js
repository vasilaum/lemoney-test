'use strict';

class UpdateOffer {
    get validateAll() {
        return false;
    }

    get rules() {
        return {
            advertiser_name: 'required|max:100',
            url: 'required|url',
            description: 'required|max:500',
            starts_at: 'required|date',
            ends_at: 'date',
            id: 'required|integer'
        }
    }

    get messages() {
        return {
            'advertiser_name.required': 'Advertiser Name Required.',
            'advertiser_name.max': 'Advertiser Name Max 100 caracters.',

            'url.required': 'URL Required.',
            'url.url': 'No valid URL.',

            'description.required': 'Description Required.',
            'description.max': 'Description Max 500 caracters.',

            'starts_at.required': 'Starts At Required.',
            'starts_at.date': 'Starts At must be a valid date.',

            'ends_at.date': 'Ends At must be a valid date.',

            'id.required': 'Id Required',
            'id.numeric': 'Id must be a valid integer number'
        }
    }

    async fails(errorMessages) {
        return this.ctx.response.status(400).send({errors: errorMessages});
    }
}

module.exports = UpdateOffer;