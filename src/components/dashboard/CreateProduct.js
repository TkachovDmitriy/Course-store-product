import React, { Component} from 'react';
import {connect} from 'react-redux'
import { addProduct } from '../../actions/products.js'

class CreateProduct extends Component {

    state = {
        title: "",
        description:"",
        price:'',
        discount:0,
        discountDate:'',
    }

    onSubmit = e => {
        e.preventDefault()
        const {title, description, price, discount, discountDate} = this.state
        const productData = {
            title,
            description,
            price,
            discount,
            discountDate
        }
        this.props.addProduct(productData, this.props.history)
    }

    onChange = e => this.setState({ [e.target.name]:e.target.value })

    render() {
        const { title, description, price, discount, discountDate }= this.state
        const date = new Date()
        const fdate = date.getFullYear() + '-' +('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() + 1)).slice(-2) 

        return( 
            <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Add Product</h2>
          <form className="needs-validation" onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                required
                className="form-control"
                name="title"
                placeholder=""
                onChange={this.onChange}
                value={title}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                required
                type="text"
                className="form-control"
                name="description"
                onChange={this.onChange}
                value={description}
              />
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                required
                type="number"
                className="form-control"
                name="price"
                  placeholder='0'
                onChange={this.onChange}
                value={price}
              />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Discount</label>
                <select name="discount" value={discount} onChange={this.onChange} className="form-control" id="exampleFormControlSelect1">
                  <option>0</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                  <option>80</option>
                  <option>90</option>
                </select>
             </div>
            <div className="form-group">
              <label>Discount Date</label>
              <input
                type="date"
                className="form-control"
                name="discountDate"
                onChange={this.onChange}
                value={discountDate}
                  min={fdate}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </div> 
         )
    }
}

export default connect(null, {addProduct})(CreateProduct)
