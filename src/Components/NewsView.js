import axios from 'axios'
import React, { Component } from 'react'
import Select from 'react-select'
import {category, country, language} from './Dropdowndata'
import Notiflix from "notiflix-react";


// const URL = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=f9b7b9cdc0a7475aa6f95b84e9699359'




export default class NewsView extends Component {
    
    constructor(props) {
        
        super(props)
        this.state = {
            newsdata: [],
            searchdata: [],
            country: '',
            category: '',
            language: '',
            page: 1,
            filter: false,
            isvisible: false,
            fetchData: false

        }
    }
    

    componentDidMount() {
        axios.get(`https://gnews.io/api/v4/top-headlines?token=f8868316d6513029116b8eff707a248a`)
        .then(res => {
            console.log(res);
            this.setState({
                newsdata: res.data.articles
            })
        }).catch(err => console.log(err));
    }
    static getDerivedStateFromProps(props, state) {
        // console.log(props);
        // console.log(state);
        if (props.inputData.articles !== state.searchdata && state.fetchData === false ) {
          return {
            searchdata: props.inputData.articles,
          };
        }
        return '';
      }

    fetchMoreData = (e) => {
        Notiflix.Notify.Info('Because of Api Tier Limitations Same Data is Repeated On Read More.',);
        // Notiflix.Report.Info('Information','"Because of Api Free Limitations Read More Pagination Displays Same Data"','Okay');
        setTimeout(() => {
             console.log(e)
                this.setState({
                    page: this.state.page + 1,

            });
            if(this.state.filter){
                axios.get(`https://gnews.io/api/v4/top-headlines?&lang=${this.state.language}&country=${this.state.country}&topic=${this.state.category}&token=f8868316d6513029116b8eff707a248a`)
            .then(res => {
                console.log(res);
                this.setState({
                    newsdata: this.state.newsdata.concat(res.data.articles),
                    filter: true
                    
                })
            }).catch(err => console.log(err));
        }

        if(this.state.searchdata){
                axios.get(`https://gnews.io/api/v4/search?q=${this.props.searchKeyword}&token=f8868316d6513029116b8eff707a248a`)
            .then(res => {
                console.log(res);
                this.setState({
                    searchdata: this.state.searchdata.concat(res.data.articles),
                    fetchData: true
                })
                
            }).catch(err => console.log(err));
        
        }
   
          else  {
            axios.get(`https://gnews.io/api/v4/top-headlines?token=f8868316d6513029116b8eff707a248a`)
            .then(res => {
                console.log(res);
                this.setState({
                    newsdata: this.state.newsdata.concat(res.data.articles)
                })
            }).catch(err => console.log(err));}
        }, 500);
      };

    setFilter = () => {
        axios.get(`https://gnews.io/api/v4/top-headlines?&lang=${this.state.language}&country=${this.state.country}&topic=${this.state.category}&token=f8868316d6513029116b8eff707a248a`)
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
              
          {(this.state.searchdata
          ? 
          
            (this.state.searchdata.map((item, key) => {
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
          <div className="loadbtn">
                    <button className="more" onClick={this.fetchMoreData }>Read More</button>
                    </div>
                
        </div>
        )
    }
}

