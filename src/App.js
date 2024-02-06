
import './App.css';
import React from 'react';
import { NavBarComponent } from './components/navbar';
import { NewsData } from './components/newsdata';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      initialQuery : 'Indonesia',
      newsArticlesData:[]
    };
  }

  handleSearch = (query) => {
    // this.setState({ searchQuery: query });
    const searchQueryVal = query.toLowerCase();
    const filteredArticles = this.state.newsArticlesData.filter((article) =>
      article.title.toLowerCase().includes(searchQueryVal)
    );
    this.setState({
      filteredArticles,
      searchQuery: searchQueryVal
    });
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
