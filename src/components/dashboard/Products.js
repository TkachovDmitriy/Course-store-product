import React, {  useEffect } from 'react'
import { connect }  from 'react-redux';
import PropTypes from 'prop-types'
import { getAllProducts, deleteOneProduct } from '../../actions/products.js'

import Card from './ProductCard.js'

function Products (props) {


    const style = {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap', 
    }

    useEffect( () => {
            props.getAllProducts()
        }, [])
    let card = props.products.map( product =>{ 
        return (
            <Card key={product.productId}
                productId={product.productId}
                deleteOneProduct={props.deleteOneProduct}
                title={product.title}
                imageUrl={product.imageUrl}
                description={product.description}
                discount={product.discount}
                discountDate={product.discountDate}
                price={product.price}
                />
            )
        })

    return (
        <div style={style}>
          {card}
        </div>
        )
}

const propTypes = {
        products:PropTypes.array.isRequired,
        getAllProducts:PropTypes.func.isRequired,
        deleteOneProduct:PropTypes.func.isRequired,
    }

const mapStateToProps = state => ({
    products: state.products.products
})

export default connect(mapStateToProps, { getAllProducts, deleteOneProduct })(Products)
