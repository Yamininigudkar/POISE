import React  from 'react'
import '../../styles/categoryfilter.css'
const ResultItem = ({ category, name }) =>
  <div className="category__list-item box flex-spread">
    {name}
    <div className={`category--${category} circle`} />
  </div>;

const Result = ({ state: { products, displayCategory } }) =>
  <div>
    {products
      .filter(({ category }) =>
          displayCategory === category || displayCategory === "all"
      )
      .map(({ category, name }) =>
        <ResultItem category={category} name={name} />
      )}
  </div>;

const ButtonCategory = ({ setCategory, category }) =>
  <button
    className={`btn-${category}`}
    onClick={() => setCategory(category)}
  >
    {category}
  </button>;

const UI = ({
  state,
  state: { productCategories },
  setCategory,
  allProducts
}) =>
  <div className="box flex-row">
    <div className="box flex-col">
      <h3>Filter by Category</h3>
      {productCategories.map(category =>
        <ButtonCategory setCategory={setCategory} category={category} />
      )}
    </div>
    
  </div>;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: "all",
      products: PRODUCTS,
      productCategories: PRODUCT_CATEGORIES
    };
    this.setCategory = this.setCategory.bind(this);
  }
  setCategory(category) {
    this.setState({
      displayCategory: category
    });
  }
  render() {
    return <UI setCategory={this.setCategory} state={this.state} />;
  }
}

// data
const PRODUCTS = [
  
  { category: "Art" },
  { category: "Outdoor"},
  { category: "Shows" },
  { category: "Sports" },
  { category: "Entertainment"},
  { category: "Lifestyle"},
  { category: "Others"},
];

// get unique category items
const uniqueItems = (x, i, a) => a.indexOf(x) === i;
const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.category).filter(
  uniqueItems
);

PRODUCT_CATEGORIES.push("All");
PRODUCT_CATEGORIES.sort();

export default Main 
