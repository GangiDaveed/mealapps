import { Component } from "react";

import "./index.css";

const condition = {
  success: "SUCCESS",
  loading: "lOADER",
  failure: "FAILURE",
};

class Home extends Component {
  state = { search: "Arrabiata", singleMeal: [], showing: condition.initial };

  componentDidMount() {
    this.getMeals();
  }
  getMeals = async () => {
    const { search } = this.state;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        console.log("success");
        console.log(response);
        const responseOne = await response.json();
        this.setState({
          singleMeal: responseOne.meals[0],
          showing: condition.success,
        });
        console.log("responseed", responseOne);
      } else {
        this.setState({ shwoing: condition.failure });
      }
    } catch {
      this.setState({ showing: condition.failure });
    }
  };

  searchUser = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.getMeals();
    });
  };
  render() {
    const { singleMeal } = this.state;
    return (
      <div className="home-bg">
        <div>
          <input
            onChange={this.searchUser}
            type="search"
            placeholder="  search the meal..."
            className="search"
          />
        </div>
        <div className="meal-card">
          <div className="recipe-name">{singleMeal.strMeal}</div>

          <div>{singleMeal.strInstructions}</div>
          <div>
            <img
              className="image-card"
              src={singleMeal.strMealThumb}
              alt="not-found"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
