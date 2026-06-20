import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

class RestaurantCard extends Component {
  render() {
    const {restaurantData} = this.props
    const {id, name, cuisine, userRating, imageUrl} = restaurantData

    return (
      <li data-testid="restaurant-item" className="restaurant-item">
        <Link to={`/restaurant/${id}`} className="restaurant-link">
          <img src={imageUrl} alt="restaurant" className="restaurant-image" />
          <div className="restaurant-info">
            <h1 className="restaurant-name">{name}</h1>
            <p className="restaurant-cuisine">{cuisine}</p>
            <div className="rating-container">
              <FaStar
                className="star-icon"
                color={`#${userRating.rating_color}`}
              />
              <p className="rating-text">{userRating.rating}</p>
              <h1 className="total-reviews">
                ({userRating.total_reviews} ratings)
              </h1>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

export default RestaurantCard
