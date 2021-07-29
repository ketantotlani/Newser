import React, { Component } from 'react'
import Nav from '../Header/Nav'
import NewsView from './NewsView'
import axios from 'axios'


export default class Home extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            searchInp: [],


        }
        
    }

    getSearchInput = (search) =>{

        axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=01bb4aac5d0143f6872a690cf6b51dd9`)
        .then((res) => {
          console.log(res);
          this.setState({
            searchInp: res.data,
          });
        })
        .catch((err) => console.log(err));
    }


    
    render() {
        return (
            <>
                <Nav searchData={this.getSearchInput}/>
                <NewsView inputData={this.state.searchInp}/>
            </>
        )
    }
}
