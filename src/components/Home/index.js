import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import OffersCarousel from '../OffersCarousel'
import PopularRestaurants from '../PopularRestaurants'

import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <OffersCarousel />
          <PopularRestaurants />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
