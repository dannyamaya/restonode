import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Products from './components/Products';
import Order from './components/Order';
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";

//https://ibb.co/gxiwez
// https://ibb.co/hV5nme
// https://ibb.co/m7u2Kz
// https://ibb.co/fMDJsK
// https://ibb.co/dvTwez
// https://ibb.co/fjGhKz
// https://ibb.co/ftkysK
// https://ibb.co/kuSpzz
// https://ibb.co/d6G4XK
// https://ibb.co/mD92Kz
// https://ibb.co/k5FysK
// https://ibb.co/ccmhKz

let products = [
    {
    "image": "https://image.ibb.co/fHRSme/lam_tikka.png" ,
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
            cart_products: [

            ]
        };
        this.handleChange = this.handleChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.orderNow = this.orderNow.bind(this);
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

    orderNow() {
        const total_price = this.state.cart_products.reduce(
            (a, b) => a + b.price, 0);
        console.log(this.state)
        axios.post(`http://localhost:8080/order`, {
            name: this.state.name,
            phone: this.state.phone,
            price: total_price,
            latitude: this.state.latLng.lat,
            longitude: this.state.latLng.lng,
            order: this.state.cart_products
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
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
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy</p>
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
          />

      </div>
    );
  }
}

export default App;
