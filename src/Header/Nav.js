import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInp: ''
            

        }
    }


      
  onSearchInput = (e) => {
      e.preventDefault();
        console.log(e.target.parentElement.firstChild.value);
        this.setState({
            searchInp: e.target.parentElement.firstChild.value
        });
        setTimeout(() => { this.props.searchData(this.state.searchInp);  }, 0);  
    };
    
        
    

    render() {
        return (
            <nav>

                    <Link  to="/">Newzer</Link>
                    <form >
                        <input type="text" name="newssearch" id="newssearch" placeholder="Search For News" />
                        <button onClick={this.onSearchInput} >Search</button>
                    </form>

            </nav>
        )
    }
}
