import React, { Component } from 'react'
import Nav from '../Header/Nav'
import NewsView from './NewsView'
import axios from 'axios'


export default class Home extends Component {
    constructor(props) {    
        super(props)
        this.state = {
            searchInp: [],
            searchKeyword: ''


        }
        
    }

    getSearchInput = (search) =>{

        axios.get(`https://gnews.io/api/v4/search?q=${search}&token=f8868316d6513029116b8eff707a248a`)
        .then((res) => {
          console.log(res);
          this.setState({
            searchInp: res.data,
            searchKeyword: search
          });
        })
        .catch((err) => console.log(err));
    }


    
    render() {
        return (
            <>
                <Nav searchData={this.getSearchInput}/>
                <NewsView searchKeyword={this.state.searchKeyword} inputData={this.state.searchInp}/>
            </>
        )
    }
}
