import React, { Component } from 'react';

import PlacesAutocomplete from 'react-places-autocomplete';


 export default class Products extends Component {
    constructor(props) {
        super(props);
    }
    render(){

        const total_price = this.props.total_price;
        const products = this.props.products.map((item, index) => (
            <div key={index} className="alert alert-info"><a aria-label="close" className="close"
                                                 data-dismiss="alert" onClick={() => this.props.removeProduct(index)}>×</a>{item.title}<strong> ${item.price}</strong></div>
        ));

        let current_order;
        if (this.props.current_order) {
            current_order = (
                <div>
                    <h2>{this.props.current_order.title}</h2>
                    <p>{this.props.current_order.description}</p>
                    <strong> # {this.props.current_order.order_id}</strong>
                </div>
            )
        } else {
            current_order = (<p><a className="btn btn-default form-control" onClick={this.props.orderNow} role="button">Order Now!</a></p>)
        }

        return (
            <div className="container marketing">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h2>Your Order</h2>

                            {products}
                            {total_price > 0 &&
                            <span> Total: ${total_price}</span>
                            }
                        </div>
                        <div className="col-lg-4">
                            <h2>Your Information</h2>
                            <div className="inputs">
                                <div className="form-group"><input className="form-control" id="name"  name="name" onChange={this.props.handleChange} placeholder="Your name" type="text"/></div>
                                <div className="form-group"><input className="form-control" id="phone" name="phone" onChange={this.props.handleChange} placeholder="Phone" type="text"/></div>
                                <PlacesAutocomplete
                                    value={this.props.address}
                                    onChange={this.props.handleChangeAddress}
                                    onSelect={this.props.handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className="form-group">
                                            <input
                                                {...getInputProps({
                                                    placeholder: 'Delivery Direction',
                                                    className: 'form-control',
                                                })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div
                                                            {...getSuggestionItemProps(suggestion, {
                                                                className,
                                                                style,
                                                            })}
                                                        >
                                                            <span>{suggestion.description}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                        </div>
                        <div className="col-lg-4"><img alt="Lam Tikka" className="img-circle" src="https://image.ibb.co/dLXiRe/deliver.png" style={{
                            width:'60%'}}/>
                            {current_order}
                        </div>
                    </div>
                </div>
            </div>

    )
    }
}
