import React, {Component} from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      error: ''
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      searchText: e.target.value,
      error: ''
    })
  }

  searchRepo = (e) => {
    e.preventDefault();
    /* validate input */
    if (!this.state.searchText) {
      this.setState({
        error: 'The field is required!'
      })
    }else {
      this.props.searchRepo(this.state.searchText);
      this.setState({
        searchText: ''
      });
    }

  }

  render() {
    return (
      <div>
        <br/>
        <form className="form-horizontal justify-content-center" onSubmit={this.searchRepo}>
          <div className="input-group input-group-lg">
            <input name={"search"} value={this.state.searchText} onChange={this.handleChange} type="text"
                   className="form-control input-group-lg" placeholder="Search repo"/>
            <button type="submit" className="btn btn-primary btn-lg my-btn-lg">Submit</button>


          </div>
          <span style={{color: 'red'}}>{this.state.error ? this.state.error : null}</span>
        </form>
      </div>
    )
  }
}

export default Search;