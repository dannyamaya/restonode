import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Products from './components/Products';
import Order from './components/Order';
import Track from './components/Track';
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

let products = [
    {
        "image": "https://image.ibb.co/fHRSme/lam_tikka.png",
        "title": "Nepalese MOMO",
        "description": "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies",
        "price": 2.2
    },
    {
        "image": "https://image.ibb.co/fHRSme/lam_tikka.png" ,
        "title": "Nepalese MAMA",
        "description": "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies",
        "price": 4.2
    },
    {
        "image": "https://image.ibb.co/fHRSme/lam_tikka.png" ,
        "title": "Nepalese MUMU",
        "description": "Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies",
        "price": 5.6
    },
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            destination: '',
            address: '',
            order_id_search: '',
            query_order: false,
            cart_products: [

            ],
            current_order: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.orderNow = this.orderNow.bind(this);
        this.trackOrder = this.trackOrder.bind(this);
    }

    handleSelect = address => {
        let _this2 = this;

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                _this2.setState({
                    latLng,
                    address
                })
            })
            .catch(error => console.error('Error', error));
    };

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change)
    }

    handleChangeAddress = address => {
        this.setState({ address });
    };

    addProduct(title, price) {
        this.setState(prevState => ({
            cart_products: [...prevState.cart_products, {title, price}]
        }))
    }

    removeProduct(product_index) {
        var array = [...this.state.cart_products];
        array.splice(product_index, 1);
        this.setState({cart_products: array});
    }

    trackOrder() {

        let _this2 = this;

        axios.get('http://localhost:8080/order', {
            params: {
                order_id: this.state.order_id_search
            }
        })
            .then(function (res) {
                let response = res.data.data;

                let query_order = {
                    destination: response.destination,
                    distance: response.distance,
                    duration_in_traffic: response.duration_in_traffic,
                    name: response.name,
                    origin: response.origin,
                    phone: response.phone,
                    order: response.order,
                    price: response.price,

                };

                _this2.setState({
                    query_order: query_order
                })


            })
            .catch(function (error) {
                console.log(error);
            })
    }

    orderNow() {
        const total_price = this.state.cart_products.reduce(
            (a, b) => a + b.price, 0);

        let _this2 = this;

        axios.post(`http://localhost:8080/order`, {
            name: this.state.name,
            phone: this.state.phone,
            price: total_price,
            latitude: this.state.latLng.lat,
            longitude: this.state.latLng.lng,
            order: this.state.cart_products
        })
            .then(res => {
                let response = res.data.data;
                let payload = {
                    title: "We're on it!",
                    description: `We are preparing your order, it should arrive in ${response.duration_in_traffic} or less here is your order id`,
                    order_id: response.order_id
                };

                this.setState({
                    current_order: payload
                })

            })
            .catch(function (error) {
                alert("Ups check your order id please");
            })
    }

    render() {

        const total_price = this.state.cart_products.reduce(
            (a, b) => a + b.price, 0);

    return (
      <div className="App">
          <div className="mainTitle">
              <div className="container">
                  <h1>Restonode</h1>
                  <p>We are ubicated in  Don Torcuato, Buenos Aires Province</p>
              </div>
          </div>

          <Products products={products} addProduct={this.addProduct}/>
          <div className="introSection">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          <h1 className="cntr">We are launching a complete online food order system for Restonode, give
                              a try!</h1>
                      </div>
                  </div>
              </div>
          </div>
          <Order handleChange={this.handleChange}
                 handleChangeAddress={this.handleChangeAddress}
                 handleSelect={this.handleSelect}
                 address={this.state.address}
                 products={this.state.cart_products}
                 removeProduct={this.removeProduct}
                 orderNow={this.orderNow}
                 total_price={total_price}
                 current_order={this.state.current_order}
          />

          <div className="introSection">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-12">
                          <h1 className="cntr">You can track your order here!</h1>
                      </div>
                  </div>
              </div>
          </div>

          <Track
              order_id_search={this.state.order_id_search}
              query_order={this.state.query_order}
              handleChange={this.handleChange}
              trackOrder={this.trackOrder}
          />



      </div>
    );
  }
}

export default App;
