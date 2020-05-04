import React, { Component } from 'react'
import Discount from './Discount.js'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { saveIdProduct } from '../../actions/products.js'

class Card extends Component {

    onSubmit = e =>{
        console.log(this.props.productId)
        this.props.saveIdProduct(this.props.productId)
        
    }

    style = {
        position: 'absolute',
        right: '7px',
        fontSize: '20px'
    }

    render () {
        return (
            <div className='d-flex' style={{width: '18rem', margin:'10px'}}>
           <div className="card" >
               <img src={this.props.imageUrl} className="card-img-top " style={{width:'233px', height:'233px', padding: '5px', borderRadius:'20px'}} alt=""/>
               <Link to='/setImage' onClick={this.onSubmit} >
                   <i className="fas fa-plus-circle" style={this.style}></i>
               </Link>
              <div className="card-body">
                <h5 className="card-title">{this.props.title}</h5>
                <p className="card-text">{this.props.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                  
                  <Discount 
                        discount={this.props.discount} 
                        price={this.props.price}
                        discountDate={this.props.discountDate}/>
              </ul>
              <div className="card-body d-flex justify-content-around">
                  <Link  to='/changeProduct'onClick={this.onSubmit} style={{height:'30px', marginTop: 'auto'}}
className="btn btn-info">
                         Changed
                  </Link>
                  <button type="button" style={{height:'30px', marginTop: 'auto'}}
                        onClick={this.props.deleteOneProduct.bind(this, this.props.productId)} 
                        className="btn btn-danger"
                        >Remove
                  </button>
              </div>
           </div>
           </div>
 
        )    
    }
}

export default connect(null, { saveIdProduct })(Card)
