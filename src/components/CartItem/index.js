import {Component} from 'react'
import './index.css'

class CartItem extends Component {
  onClickDecrement = () => {
    const {cartItemDetails, decrementQuantity} = this.props
    decrementQuantity(cartItemDetails.id)
  }

  onClickIncrement = () => {
    const {cartItemDetails, incrementQuantity} = this.props

    incrementQuantity(cartItemDetails.id)
  }

  render() {
    const {cartItemDetails} = this.props
    const {name, cost, quantity, imageUrl} = cartItemDetails

    return (
      <li data-testid="cartItem" className="cart-item-container">
        <div className="cart-item-info">
          <img src={imageUrl} alt={name} className="cart-item-image" />
          <h1 className="cart-item-name-mobile">{name}</h1>
        </div>

        <div className="cart-qty-price-container">
          <div className="cart-quantity-container">
            <button
              type="button"
              data-testid="decrement-quantity"
              className="cart-qty-btn"
              onClick={this.onClickDecrement}
            >
              -
            </button>
            <div data-testid="item-quantity" className="cart-quantity">
              {quantity}
            </div>
            <button
              type="button"
              data-testid="increment-quantity"
              className="cart-qty-btn"
              onClick={this.onClickIncrement}
            >
              +
            </button>
          </div>

          <p className="cart-item-price">₹ {cost * quantity}.00</p>
        </div>
      </li>
    )
  }
}

export default CartItem
