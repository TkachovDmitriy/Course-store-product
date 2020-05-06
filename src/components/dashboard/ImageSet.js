import React, { Component } from 'react'
import { connect }  from 'react-redux'
import PropTypes from 'prop-types'
import { uploadImage } from '../../actions/products.js'

class Image extends Component { 

    static propTypes = {
        uploadImage:PropTypes.func.isRequired,
        products:PropTypes.object.isRequired,
    }

    onChange = e => {
        const image = e.target.files[0]
        const formData = new FormData()
        formData.append('image', image, image.name)
        this.props.uploadImage( this.props.products.productId, formData, this.props.history)
    }

    render () {
        return ( 
              <div className="form-group">
                <label htmlFor="exampleFormControlFile1">Upload image for changed</label>
                <input type="file" accept="image/*" onChange={this.onChange} className="form-control-file" id="exampleFormControlFile1"/>
              </div>
            )
    }
}

const mapStateToProps = state => ({
    products: state.products
})

export default connect(mapStateToProps, { uploadImage })(Image)
