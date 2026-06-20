import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import './index.css'

class FoodItem extends Component {
  state = {
    quantity: 0,
  }

  componentDidMount() {
    this.checkCartItemQuantity()
  }

  // Check if item already exists in localStorage on mount
  checkCartItemQuantity = () => {
    const {foodItem} = this.props
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const cartItem = cartData.find(item => item.id === foodItem.id)
    if (cartItem) {
      this.setState({quantity: cartItem.quantity})
    }
  }

  // Core logic to update LocalStorage and local State
  addOrUpdateCartItem = newQuantity => {
    const {foodItem} = this.props
    let cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const itemIndex = cartData.findIndex(item => item.id === foodItem.id)

    if (newQuantity === 0) {
      // Remove item if quantity hits 0
      cartData = cartData.filter(item => item.id !== foodItem.id)
    } else if (itemIndex !== -1) {
      // Update existing item
      cartData[itemIndex].quantity = newQuantity
    } else {
      // Add new item with STRICT key names as requested
      cartData.push({
        cost: foodItem.cost,
        quantity: newQuantity,
        id: foodItem.id,
        imageUrl: foodItem.imageUrl,
        name: foodItem.name,
      })
    }

    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.setState({quantity: newQuantity})
  }

  onClickAdd = () => {
    this.addOrUpdateCartItem(1)
  }

  onClickIncrement = () => {
    const {quantity} = this.state
    this.addOrUpdateCartItem(quantity + 1)
  }

  onClickDecrement = () => {
    const {quantity} = this.state
    this.addOrUpdateCartItem(quantity - 1)
  }

  render() {
    const {foodItem} = this.props
    const {name, cost, rating, imageUrl} = foodItem
    const {quantity} = this.state

    return (
      <li data-testid="foodItem" className="food-item-card">
        <img src={imageUrl} alt="food item" className="food-item-image" />
        <div className="food-item-details">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">₹ {cost}</p>
          <div className="food-item-rating-container">
            <FaStar className="food-star-icon" />
            <p className="food-item-rating">{rating}</p>
          </div>

          {quantity === 0 ? (
            <button
              type="button"
              className="add-button"
              onClick={this.onClickAdd}
            >
              ADD
            </button>
          ) : (
            <div className="quantity-control-container">
              <button
                type="button"
                data-testid="decrement-count"
                className="quantity-btn"
                onClick={this.onClickDecrement}
              >
                -
              </button>
              <div data-testid="active-count" className="quantity-display">
                {quantity}
              </div>
              <button
                type="button"
                data-testid="increment-count"
                className="quantity-btn"
                onClick={this.onClickIncrement}
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
