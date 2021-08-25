'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');

Route.group(() => {
    Route.get('offers', 'OfferController.index').as('offer.index');
    Route.get('offers/form/:id?', 'OfferController.form').as('offer.form');
    Route.post('offers', 'OfferController.store').as('offer.store').validator('StoreOffer');
    Route.put('offers', 'OfferController.update').as('offer.update').validator('PutOffer');
    Route.delete('offers/:id', 'OfferController.destroy').as('offer.destroy');
    Route.put('offers/disable/:id', 'OfferController.disable').as('offer.disable');
    Route.put('offers/enable/:id', 'OfferController.enable').as('offer.enable');
}).prefix('adm');

Route.get('offers', 'public/OfferController.index').as('public.offer.index');