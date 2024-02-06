import React from "react";
import axios from "axios";
import { Card } from "react-bootstrap";

export class NewsData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsArticlesData: [],
      filteredArticles:[],
      isLoading: false,
    };
  }

  async fetchData() {
    const url = this.props.searchQuery
      ? `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=fcd3a3e20d5b4b1591d33dd9e6ca2668`
      : `https://newsapi.org/v2/everything?q=Indonesia&apiKey=fcd3a3e20d5b4b1591d33dd9e6ca2668`;
    const res = await axios.get(url);
    const dataJson = res.data.articles;
    // console.log(dataJson)
    this.setState({
      newsArticlesData: dataJson,
      filteredArticles:dataJson,
      isLoading: false,
    });
  }

  async componentDidMount() {
    this.fetchData(this.props.searchQuery);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      this.fetchData(this.props.searchQuery);
    }
  }

  

  render() {
    const { filteredArticles, isLoading, error } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div className="card-container container flex" id="home">

        {filteredArticles.map((articles, index) => {
          const date = new Date(articles.publishedAt).toLocaleString("id-ID", {
            timeZone: "Asia/Jakarta",
          });
          return (
            <div id="news-card" key={articles.index} className="card">
              <div className="card-header">
                <img src={articles.urlToImage} alt="newsImg" id="news-img" />
              </div>
              <div className="card-content">
                <h3 id="news-title">{articles.title}</h3>
                <h6 id="news-date" className="news-date">
                  {articles.author} - {date}
                </h6>
                <p id="news-content" className="news-content">
                  {articles.description}
                </p>
                <br />
                <Card.Link href={articles.url.toLowerCase()} className="card-link">
                  For More Details
                </Card.Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
