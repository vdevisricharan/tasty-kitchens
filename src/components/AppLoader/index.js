import Loader from 'react-loader-spinner'
import './index.css'

const AppLoader = ({testid}) => {
  return (
    <div className="loader-container" testid={testid}>
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )
}

export default AppLoader
