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

        axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=8055b3bbc38746ba84e9053c510aef3a`)
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
