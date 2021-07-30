import axios from 'axios'
import React, { Component } from 'react'
import Select from 'react-select'
import {category, country, language} from './Dropdowndata'
// import Notiflix from "notiflix-react";


// const URL = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=f9b7b9cdc0a7475aa6f95b84e9699359'




export default class NewsView extends Component {
    
    constructor(props) {
        
        super(props)
        this.state = {
            newsdata: [],
            country: '',
            category: '',
            language: '',
            page: 1,
            filter: false,
            isvisible: false,

        }
    }
    

    componentDidMount() {
        axios.get(`https://gnews.io/api/v4/top-headlines?token=13df5ad26253c2938ef7bcbfef2b5a96`)
        .then(res => {
            console.log(res);
            this.setState({
                newsdata: res.data.articles
            })
        }).catch(err => console.log(err));
    }

    fetchMoreData = (e) => {
        // Notiflix.Notify.Info('Because of Api Tier Limitations Same Data is Repeated On Read More.',);
        // Notiflix.Report.Info('Information','"Because of Api Free Limitations Read More Pagination Displays Same Data"','Okay');
        setTimeout(() => {
             console.log(e)
                this.setState({
                    page: this.state.page + 1,

            });
            if(this.state.filter){
                axios.get(`https://gnews.io/api/v4/top-headlines?&lang=${this.state.language}&country=${this.state.country}&topic=${this.state.category}&token=13df5ad26253c2938ef7bcbfef2b5a96`)
            .then(res => {
                console.log(res);
                this.setState({
                    newsdata: this.state.newsdata.concat(res.data.articles),
                    filter: true
                    
                })
            }).catch(err => console.log(err));
        }
   
          else  {
            axios.get(`https://gnews.io/api/v4/top-headlines?token=13df5ad26253c2938ef7bcbfef2b5a96`)
            .then(res => {
                console.log(res);
                this.setState({
                    newsdata: this.state.newsdata.concat(res.data.articles)
                })
            }).catch(err => console.log(err));}
        }, 500);
      };

    setFilter = () => {
        axios.get(`https://gnews.io/api/v4/top-headlines?&lang=${this.state.language}&country=${this.state.country}&topic=${this.state.category}&token=13df5ad26253c2938ef7bcbfef2b5a96`)
        .then(res => {
            console.log(res);
            this.setState({
                newsdata: res.data.articles,
                filter: true
                
            })
        }).catch(err => console.log(err));
    }

    toggleFilter = (e) => {
        e.preventDefault();
        e.target.classList.toggle("toggleclass");
        this.setState({
            isvisible: true
        })
    }


    render() {
        return (
            
        <div  className="maincontainer">
            <div className="filter">
                <h1 className="heading">News</h1>
                <button className="filterbtn" onClick={this.toggleFilter}>Filter</button>
                <div className={ (this.state.isvisible? "displayblock":"filterblock")}>
                <Select styles={{
                    control: (base) => ({ ...base, width: '300px' })
                    }} options={category} onChange={(e) => this.setState({category: e.value})} placeholder="Category..." isSearchable />
                    <Select styles={{
                    control: (base) => ({ ...base, width: '300px' })
                    }} options={language} onChange={(e) => this.setState({language: e.value})} placeholder="Language..." isSearchable />
                                        <Select styles={{
                    control: (base) => ({ ...base, width: '300px' })
                    }} options={country} onChange={(e) => this.setState({country: e.value})} placeholder="Country..." isSearchable /> 
                    <button onClick={this.setFilter}>Submit</button>
                    </div>
            </div>
          <div  className="cardcontainer">
              
          {(this.props.inputData.articles
          ? 
          
            (this.props.inputData.articles.map((item, key) => {
                return(
                    <a className="card" key={key} href={item.url}>
                            <img src={item.image } alt="Not Found"/>
                            <div>
                                <h3 className="sourceName">
                                    <span>{item.source.name}</span>
                                    <p>{item.publishedAt}</p>
                                </h3>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                        </a>
                )
            })) 

            : 

            (this.state.newsdata.map((item,key) => {
                return (
                    <a className="card"   key={key} href={item.url}>
                        <img src={(item.image ) ? item.image : item.urlToImage} alt="Not Found"/>
                        <div>
                            <h3 className="sourceName">
                                <span>{item.source.name}</span>
                                <p>{item.publishedAt}</p>
                            </h3>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                    </a>
                   
                )
            })) 
            )}
              {/* {
                  
                  this.state.newsdata.map((item,key) => {
                    return (
                        <a className="card" key={key} href={item.url}>
                            <img src={item.urlToImage} alt="Not Found"/>
                            <div>
                                <h3 className="sourceName">
                                    <span>{item.source.name}</span>
                                    <p>{item.publishedAt}</p>
                                </h3>
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                            </div>
                        </a>
                    )
                })
              } */}

          </div>
               {( this.props.inputData.articles  ) ?  '' :<div className="loadbtn">
                    <button className="more" onClick={this.fetchMoreData }>Read More</button>
                    </div>}
                
        </div>
        )
    }
}

