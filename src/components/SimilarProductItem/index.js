// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {similarProductItem} = props
  console.log(similarProductItem)
  const updatedList = {
    imageUrl: similarProductItem.image_url,
    title: similarProductItem.title,
    brand: similarProductItem.brand,
    price: similarProductItem.price,
    rating: similarProductItem.rating,
  }
  const {imageUrl, title, brand, price, rating} = updatedList

  return (
    <li>
      <img
        className="similar-products-img"
        src={imageUrl}
        alt={`similar product ${title}`}
      />
      <p>{title}</p>
      <p>{`by ${brand}`}</p>
      <div>
        <p>{`Rs.${price}/-`}</p>
        <div className="rating-review-container">
          <p className="rating-container">
            {rating}
            <img
              src="https://assets.ccbp.in/frontend/react-js/star-img.png"
              alt="star"
            />
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
