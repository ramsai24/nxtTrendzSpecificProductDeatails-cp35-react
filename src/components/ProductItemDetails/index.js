// Write your code here
import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productItemDetailsList: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    // console.log(match.params.id)
    const url = `https://apis.ccbp.in/products/${match.params.id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    const updatedList = {
      description: data.description,
      title: data.title,
      rating: data.rating,
      totalReviews: data.total_reviews,
      price: data.price,
      availability: data.availability,
      brand: data.brand,
      similarProducts: data.similar_products,
      imgUrl: data.image_url,
    }
    // console.log(updatedList)

    if (response.ok) {
      this.setState({
        productItemDetailsList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  increaseQuantity = () =>
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))

  decreaseQuantity = () => {
    const {quantity} = this.state
    if (quantity >= 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
      this.setState({quantity: 1})
    }
  }

  renderProductItemDetailsView = () => {
    const {productItemDetailsList, quantity} = this.state

    const {
      imgUrl,
      title,
      brand,
      totalReviews,
      rating,
      availability,
      similarProducts,
      price,
      description,
    } = productItemDetailsList

    return (
      <div>
        <Header />
        <div className="product-details-container">
          <img className="product-img" src={imgUrl} alt="product" />
          <div className="description-container">
            <h1>{title}</h1>
            <p>{`Rs.${price}/-`}</p>
            <div className="rating-review-container">
              <p className="rating-container">
                {rating}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </p>
              <p>{totalReviews}</p>
            </div>
            <p>{description}</p>
            <p>
              Available:
              <p>{availability}</p>
            </p>
            <p>
              Brand:
              <p>{brand}</p>
            </p>
            <hr />
            <div className="quantity-of-item-container">
              <button
                data-testid="minus"
                type="button"
                onClick={this.decreaseQuantity}
              >
                <BsDashSquare />
              </button>
              <p>{quantity}</p>
              <button
                data-testid="plus"
                type="button"
                onClick={this.increaseQuantity}
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button">ADD TO CART</button>
          </div>
        </div>
        <div>
          <h1>Similar Products</h1>
          <ul>
            {similarProducts !== undefined &&
              similarProducts.map(each => (
                <SimilarProductItem
                  isLoading="false"
                  similarProductItem={each}
                  key={each.id}
                />
              ))}
          </ul>
        </div>
      </div>
    )
  }

  shoppingContinues = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderFailureView = () => (
    <div>
      <Header />
      <div>
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1>Product Not Found</h1>
        <button type="button" onClick={this.shoppingContinues}>
          Continue Shopping
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderProductItemDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default ProductItemDetails
