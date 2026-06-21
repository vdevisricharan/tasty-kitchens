import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

class OffersCarousel extends Component {
  state = {
    offersList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.setState({
        offersList: data.offers,
        isLoading: false,
      })
    }
  }

  render() {
    const {offersList, isLoading} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    }

    if (isLoading) {
      return (
        <div
          data-testid="restaurants-offers-loader"
          className="carousel-loader-container"
        >
          <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
        </div>
      )
    }

    return (
      <div className="offers-carousel-container">
        <Slider {...settings}>
          {offersList.map(offer => (
            <div key={offer.id} className="offer-slide">
              <img src={offer.image_url} alt="offer" className="offer-image" />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default OffersCarousel
