import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class AppLoader extends Component {
  render() {
    const {testid} = this.props

    return (
      <div className="loader-container" data-testid={testid}>
        <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
      </div>
    )
  }
}

export default AppLoader
