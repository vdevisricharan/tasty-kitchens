import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdSort, MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

import AppLoader from '../AppLoader'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const sortByOptions = [
  {id: 0, displayText: 'Highest', value: 'Highest'},
  {id: 1, displayText: 'Lowest', value: 'Lowest'},
]

class PopularRestaurants extends Component {
  state = {
    restaurantsList: [],
    isLoading: true,
    activePage: 1,
    sortByValue: sortByOptions[1].value, // Default is Lowest
    totalPages: 0,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({isLoading: true})
    const {activePage, sortByValue} = this.state
    const jwtToken = Cookies.get('jwt_token')

    // Formula for pagination limit=9
    const limit = 9
    const offset = (activePage - 1) * limit

    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      // Format data into camelCase
      const formattedData = data.restaurants.map(each => ({
        id: each.id,
        name: each.name,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        userRating: each.user_rating,
      }))

      this.setState({
        restaurantsList: formattedData,
        totalPages: Math.ceil(data.total / limit),
        isLoading: false,
      })
    }
  }

  onChangeSortBy = event => {
    this.setState({sortByValue: event.target.value}, this.getRestaurants)
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage, totalPages} = this.state
    if (activePage < totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  renderHeader = () => {
    const {sortByValue} = this.state
    return (
      <div className="popular-header">
        <div className="header-text-container">
          <h1 className="popular-heading">Popular Restaurants</h1>
          <p className="popular-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
        </div>
        <div className="sort-container">
          <MdSort className="sort-icon" />
          <p className="sort-by-text">Sort by</p>
          <select
            className="sort-dropdown"
            value={sortByValue}
            onChange={this.onChangeSortBy}
          >
            {sortByOptions.map(option => (
              <option key={option.id} value={option.value}>
                {option.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }

  render() {
    const {restaurantsList, isLoading, activePage, totalPages} = this.state

    return (
      <div className="popular-restaurants-container">
        {this.renderHeader()}

        {isLoading ? (
          <AppLoader />
        ) : (
          <>
            <ul className="restaurants-list">
              {restaurantsList.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurantData={restaurant}
                />
              ))}
            </ul>

            <div className="pagination-container">
              <button
                type="button"
                className="pagination-button"
                onClick={this.onClickLeftArrow}
              >
                <MdKeyboardArrowLeft size={24} />
              </button>

              <p className="page-numbers">
                <span>{activePage}</span> of {totalPages}
              </p>

              <button
                type="button"
                className="pagination-button"
                onClick={this.onClickRightArrow}
              >
                <MdKeyboardArrowRight size={24} />
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default PopularRestaurants
