import React, { Component } from 'react';
import imagenx from './images/burger.png'


 export default class Products extends Component {
    constructor(props) {
        super(props)
    }

    render(){

        const products = this.props.products.map((item, index) => (
            <div className="col-lg-4" key={index}>
                <img alt="Generic placeholder image" className="img-circle"
                     src={item.image} />
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p><a className="btn btn-default" onClick={() => this.props.addProduct(item.title, item.price)}  role="button">$ {item.price} Add to cart »</a></p>
            </div>

        ))
        return (
            <div className="container marketing">

                <div className="row">
                    {products}
                </div>
            </div>
        )
    }
}
