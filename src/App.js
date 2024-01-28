
import './App.css';
import React, { useState } from 'react';
import { NavBarComponent } from './components/navbar';
import { NewsData } from './components/newsdata';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
  return (
    <div className="">
      <NavBarComponent  onSearch={this.handleSearch} />
      <NewsData  searchQuery={this.state.searchQuery} />
      </div>
    );
  }
}

export default App;
