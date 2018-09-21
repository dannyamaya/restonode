const distance = require('google-distance-matrix');
const origins = ['-34.486012, -58.616880', 'McDonalds'];
const Order = require('../models/orders.js');


distance.key('AIzaSyDCWneiE1IiOoxuhgeUEizgObUUZUdkDlE');


module.exports = {


    generate_order: function (req, res, next) {
        console.log(req.body.latitude);
        let destinations = [req.body.latitude+","+ req.body.longitude];
        distance.mode('driving');
        distance.departure_time(Date.now());
        distance.traffic_model('pessimistic');


        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if (!distances) {
                return console.log('no distances');
            }
            if (distances.status == 'OK') {

                const origin = distances.origin_addresses[0];
                let destination = distances.destination_addresses[0];
                if (distances.rows[0].elements[0].status === 'OK') {
                    let distance = distances.rows[0].elements[0].distance.text;

                    let duration_in_traffic = distances.rows[0].elements[0].duration_in_traffic.text;

                    order_detail = req.body.order;
                    order_final = '';
                    for(var i in order_detail){
                        order_final = order_final + order_detail[i].title + ' - '
                    }
                    
                    let order = new Order({
                        origin: origin,
                        destination: destination,
                        distance: distance,
                        duration_in_traffic: duration_in_traffic,
                        name: req.body.name,
                        phone: req.body.phone,
                        order: order_final,
                        price: req.body.price,
                        order_id: Math.round(new Date().getTime()/1000)
                    });

                    order.save(function (err, u) {
                        if (!err) {
                            return res.status(200).json({
                                error: false,
                                data: {
                                    'origin': origin,
                                    'destination': destination,
                                    'distance': distance,
                                    'duration_in_traffic': duration_in_traffic,
                                    'order_id': order.order_id
                                }
                            });
                        } else {
                            console.log('ERROR: ' + err);
                            return res.status(409).json({message: 'Something Weird Ocurred, try later...'});
                        }
                    });
                }
            }
        });

    },

    get_order: function(req,res,next){
        Order.findOne({ 'order_id': req.query.order_id }, function (err, order) {
            if (err) return handleError(err);
            return res.status(200).json({
                error: false,
                data: order
            });

        });
    }
};
