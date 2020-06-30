import React from "react";
import Categories from "./Categories";
import StoreList from "./StoreList";

class StoreListContainer extends React.Component {

  render() {
      console.log(this.category)
    return (
        <>
          <Categories />
          <StoreList category={this.category} />
        </>
      );
    };
  }
    
  
  export default StoreListContainer;