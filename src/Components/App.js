import React, {Component} from 'react';
import axios from 'axios';

import RepoList from './RepoList';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: 'hello',
      searchKeywordList: [],
      repoList: [],
      activePage: 1,
      modalOpen: false,
      selectedRepo: {}
    }
  }

/* schema repo list */
// repoList = {
//   searchKey: 'hello',
//   repositories: []
// }


  componentDidMount() {
    this.githubAjax().then(result => {
      this.setState({
        currentSearch: 'hello',
        searchKeywordList: this.state.searchKeywordList.concat(result.keyword),
        repoList: this.state.repoList.concat({
          searchKey: result.keyword,
          repositories: result.data
        })
      });
    });
  }

  githubAjax = async (searchKeyWord = 'hello') => {
    /* check if search result already in store */
    const searchResultExists = this.state.searchKeywordList.indexOf(searchKeyWord) !== -1;
    if (!searchResultExists) {
      return await axios.get(`https://api.github.com/legacy/repos/search/${searchKeyWord}`).then(response => {
        return {
          keyword: searchKeyWord,
          data: response.data.repositories
        }
      });
    } else {
      const existingRepoList = this.state.repoList.filter(each => each.searchKey === searchKeyWord);
      return {
        keyword: searchKeyWord,
        data: existingRepoList.repositories
      }
    }
  }

  searchRepo = (key) => {
    /* get repo search */
    this.githubAjax(key).then(result => {
      this.setState({
        currentSearch: key,
        searchKeywordList: this.state.searchKeywordList.concat(result.keyword),
        repoList: this.state.repoList.concat({
          searchKey: result.keyword,
          repositories: result.data
        })
      });
    });
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber
    });
  }

  handleModalOpen = (repoObj = {}) => {
    this.setState({
      openModal: true,
      selectedRepo: repoObj
    });
  }
  closeModal = () => {
    this.setState({
      openModal: false
    });
  }

  render() {
    return (
      <div className="container">
        <header className={"header"}>
          <h1>Search github repository</h1>
        </header>
        <Search searchRepo={this.searchRepo}/>
        <br/>
        <br/>
        <RepoList currentSearch={this.state.currentSearch}
                  repos={this.state.repoList}
                  activePageNumber={this.state.activePage}
                  handlePageChange={this.handlePageChange}
                  openModal={this.handleModalOpen}
                  closeModal={this.closeModal}
                  modalOpenStatus={this.state.openModal}
                  selectedRepo={this.state.selectedRepo}
        />
      </div>
    );
  }
}

export default App;
