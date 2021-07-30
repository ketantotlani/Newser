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

        axios.get(`https://gnews.io/api/v4/search?q=${search}&token=13df5ad26253c2938ef7bcbfef2b5a96`)
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
