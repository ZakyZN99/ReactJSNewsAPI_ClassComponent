import React from "react";
import axios from "axios";
import {Card} from 'react-bootstrap';

export class NewsData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newsArticlesData : [],
            newArticlesData2 :[],
            isLoading: false,
            error: null,
        }
    }


   async componentDidMount(){
     try {
       const res = await axios.get(
         `https://newsapi.org/v2/everything?q=Indonesia&apiKey=1f75fdb1ac9645af8d3e176292ac7907`
       );

       if (res.data || res.data.articles) {
         const dataJson = res.data.articles;
         console.log(dataJson);
         this.setState({
           newsArticlesData: dataJson,
           newArticlesData2: dataJson,
           isLoading: false,
           error: null,
         });
       }
     } catch (err) {
       this.setState({
         isLoading: false,
         error: "Error fetching initial data",
       });
     }
   }

    async componentDidUpdate(prevProps) {
        if (this.props.searchQuery !== prevProps.searchQuery) {
          try {
            const res = await axios.get(
              `https://newsapi.org/v2/everything?q=${this.props.searchQuery}&apiKey=1f75fdb1ac9645af8d3e176292ac7907`
            );
            if (res.data || res.data.articles) {
            const dataJson = res.data.articles;
            console.log(dataJson);
            this.setState({
              newsArticlesData: dataJson,
              newArticlesData2: dataJson,
              isLoading: false,
              error: null,
            });
          }else {
            throw new Error("Invalid response format");
          }} catch (err) {
            this.setState({
              isLoading: false,
              error: "Error fetching initial data",
            });
          }
        }
      }

    

    
    render(){
        const {newArticlesData2, isLoading, error}= this.state;
        if (isLoading) {
            return <div>Loading...</div>;
          }
      
          if (error) {
            return <div>{error}</div>;
          }
        
        return (
          <div className="card-container container flex" id="home">
            {/* <div id="news-card" className="card">
                    <div className="card-header">
                        <img src="" alt="newsImg" id="news-img"/>
                    </div>
                    <div className="card-content">
                        <h3 id="news-title">Judul Berita</h3>
                        <h6 id="news-date" className="news-date">Tanggal 01/01/2024</h6>
                        <p id="news-content" className="news-content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                        </p>
                    </div>
                </div> */}
            { newArticlesData2.map((articles, index) => {
                const date = new Date(articles.publishedAt).toLocaleString(
                  "id-ID",
                  {
                    timeZone: "Asia/Jakarta",
                  }
                );
              return (
                <div id="news-card" key={articles.index}  className="card"  >
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
                    <br/>
                    <Card.Link href={articles.url} className="card-link" >For More Details</Card.Link>
                  </div>
                </div>
              );
            })}
          </div>
        );
    }
}