import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItems: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = {
        id: data.id,
        name: data.name,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        costForTwo: data.cost_for_two,
        location: data.location,
      }

      const formattedFoodItems = data.food_items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        cost: eachItem.cost,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
      }))

      this.setState({
        restaurantData: formattedData,
        foodItems: formattedFoodItems,
        isLoading: false,
      })
    }
  }

  renderRestaurantBanner = () => {
    const {restaurantData} = this.state
    const {
      name,
      cuisine,
      imageUrl,
      rating,
      reviewsCount,
      costForTwo,
      location,
    } = restaurantData

    return (
      <div className="restaurant-banner">
        <div className="banner-content">
          <img src={imageUrl} alt="restaurant" className="banner-image" />
          <div className="banner-details">
            <h1 className="banner-name">{name}</h1>
            <p className="banner-cuisine">{cuisine}</p>
            <p className="banner-location">{location}</p>

            <div className="banner-stats-container">
              <div className="stat-box">
                <div className="stat-rating">
                  <FaStar className="banner-star" />
                  <p className="stat-value">{rating}</p>
                </div>
                <p className="stat-label">{reviewsCount}+ Ratings</p>
              </div>

              <div className="stat-divider">|</div>

              <div className="stat-box">
                <p className="stat-value">₹ {costForTwo}</p>
                <p className="stat-label">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading, foodItems} = this.state

    return (
      <>
        <Header />
        <div className="restaurant-details-bg">
          {isLoading ? (
            <div
              data-testid="restaurant-details-loader"
              className="details-loader-container"
            >
              <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
            </div>
          ) : (
            <>
              {this.renderRestaurantBanner()}
              <div className="food-items-container">
                <ul className="food-items-list">
                  {foodItems.map(eachItem => (
                    <FoodItem key={eachItem.id} foodItem={eachItem} />
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
