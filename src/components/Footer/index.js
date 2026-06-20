import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens/website-footer-logo-img.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h1 className="footer-heading">Tasty Kitchens</h1>
        </div>

        <p className="footer-text">
          The only thing we are serious about is food.
          <br /> Contact us on
        </p>

        <div className="social-icons-container">
          <FaPinterestSquare
            className="social-icon"
            testid="pintrest-social-icon"
          />
          <FaInstagram className="social-icon" testid="instagram-social-icon" />
          <FaTwitter className="social-icon" testid="twitter-social-icon" />
          <FaFacebookSquare
            className="social-icon"
            testid="facebook-social-icon"
          />
        </div>
      </div>
    </footer>
  )
}
