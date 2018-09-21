import React, { Component } from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';


 export default class Products extends Component {
    constructor(props) {
        super(props);
    }
    render(){

        let query_order = this.props.query_order;

        return (

            <div className="container marketing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-lg-offset-4">
                            <div className="form-group"><input className="form-control" id="order_id_search"  name="order_id_search" onChange={this.props.handleChange}  placeholder="Your Order Id" type="text"/></div>
                            <p><a className="btn btn-default form-control" onClick={this.props.trackOrder} role="button">Track your order!</a></p>

                        </div>
                    </div>
                </div>

                {query_order &&
                <div>
                    <p>Your Order:</p>
                    <p>From {query_order.origin} to {query_order.destination} </p>
                    <p>{query_order.order}</p>
                    <p>Price: {query_order.price}</p>
                    <p>Name: {query_order.name}</p>
                    <p>phone: {query_order.phone}</p>
                    <h2>It should arrives in: {query_order.duration_in_traffic} or less</h2>
                </div>
                }
            </div>






    )
    }
}
