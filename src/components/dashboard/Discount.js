import React, { Component} from 'react';


class Discount extends Component {

    toCurrency(price) {
        return new Intl.NumberFormat('de-DE', {
            currency: 'EUR',
            style: 'currency'
        }).format(price)
    }

    render () {
        const { price, discount, discountDate } = this.props
        const discountPrice = price - (price * (discount / 100))
        const date = new Date()
        const fdate = date.getFullYear() + '-' +('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) 
        if (discount !== 0 && discountDate > fdate ) {
            return (
                <>
                    <li className="list-group-item" ><span style={{textDecoration:'line-through'}}>{this.toCurrency(price)}</span><span className='ml-3'>=></span><span className='ml-3'>{this.toCurrency(discountPrice)}</span></li>
                    <li className="list-group-item">{discountDate} sale  {discount} %</li>
                </>
            ) 
        } else {
            return ( 
                    <li className="list-group-item">{this.toCurrency(price)}</li>
            )
        }

    }
}
export default Discount
