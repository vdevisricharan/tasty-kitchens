import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'
import './index.css'

class Cart extends Component {
  state = {
    cartData: [],
    isOrderPlaced: false,
  }

  componentDidMount() {
    const parsedCartData = JSON.parse(localStorage.getItem('cartData')) || []
    this.setState({cartData: parsedCartData})
  }

  updateLocalStorage = updatedCartData => {
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
  }

  incrementQuantity = id => {
    this.setState(prevState => {
      const updatedCartData = prevState.cartData.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      this.updateLocalStorage(updatedCartData)
      return {cartData: updatedCartData}
    })
  }

  decrementQuantity = id => {
    this.setState(prevState => {
      const updatedCartData = prevState.cartData
        .map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        })
        .filter(item => item.quantity > 0)

      this.updateLocalStorage(updatedCartData)
      return {cartData: updatedCartData}
    })
  }

  onClickPlaceOrder = () => {
    this.setState({isOrderPlaced: true})
    localStorage.removeItem('cartData')
  }

  renderEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781944736/cooking_1_ebszw2.png"
        alt="empty cart"
        className="empty-cart-image"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-text">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPaymentSuccessful = () => (
    <div className="payment-successful-container">
      <img
        src="https://res.cloudinary.com/dpudcurwt/image/upload/v1781950672/check-circle.1_1_knj0z2.png"
        alt="payment successful"
        className="payment-successful-image"
      />
      <h1 className="payment-successful-heading">Payment Successful</h1>
      <p className="payment-successful-text">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="go-home-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  renderCartItems = () => {
    const {cartData} = this.state
    const totalAmount = cartData.reduce(
      (acc, item) => acc + item.cost * item.quantity,
      0,
    )

    return (
      <div className="cart-content-container">
        {/* Desktop Table Header */}
        <div className="cart-table-header">
          <p className="table-header-text item-col">Item</p>
          <p className="table-header-text qty-col">Quantity</p>
          <p className="table-header-text price-col">Price</p>
        </div>

        <ul className="cart-items-list">
          {cartData.map(item => (
            <CartItem
              key={item.id}
              cartItemDetails={item}
              incrementQuantity={this.incrementQuantity}
              decrementQuantity={this.decrementQuantity}
            />
          ))}
        </ul>

        <div className="order-total-container">
          <h1 className="order-total-label">Order Total:</h1>
          <div className="total-price-section">
            <p data-testid="total-price" className="order-total-value">
              ₹{totalAmount}.00
            </p>
            <button
              type="button"
              className="place-order-btn"
              onClick={this.onClickPlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {cartData, isOrderPlaced} = this.state

    let cartContent
    if (isOrderPlaced) {
      cartContent = this.renderPaymentSuccessful()
    } else if (cartData.length === 0) {
      cartContent = this.renderEmptyCart()
    } else {
      cartContent = this.renderCartItems()
    }

    return (
      <>
        <Header />
        <div className="cart-route-bg">{cartContent}</div>
        <Footer />
      </>
    )
  }
}

export default Cart
