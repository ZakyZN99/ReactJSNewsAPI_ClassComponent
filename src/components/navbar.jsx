import React from "react";
import logoImg from "../assets/img/news.png";

export class NavBarComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchQuery: '',
        }
    }

    handleSearch = () => {
            this.props.onSearch(this.state.searchQuery)
    };
    // MANUAL SEARCHING
    handleInputChange = (e) =>{
        const searchQuery = e.target.value.toLowerCase();
       
        this.setState({
          searchQuery: searchQuery
        });
      };

    // AUTO SEARCHING
    // handleInputChange = (e) => {
    //     const { value } = e.target;
    //     this.setState({ searchQuery: value }, () => {
    //       this.handleSearch();
    //     });
    //   };

    render() {
        return (
            <nav>
                <div className="navbar container flex" >
                    <a href="#home">
                        <img src={logoImg} className="news-logo"  alt="Logo"/>
                    </a>

                    <div className="search-bar flex">
                        {/* AUTO SEARCHING */}
                        {/* <input type="input" name="" className="search-input" id="search-input"  onChange={this.handleInputChange}/> */}


                        {/* MANUAL SEARCHING */}
                        <input type="input" name="" className="search-input" id="search-input" value={this.state.searchQuery} onChange={this.handleInputChange} />
                        <button className="search-button" id="search-button" onClick={this.handleSearch }>Search</button>
                    </div>
                </div>
            </nav>
        )
    }
}