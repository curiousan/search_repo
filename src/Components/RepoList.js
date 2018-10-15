import React, {Component} from 'react';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import Modal from './Modal';

import RepoDetail from './RepoDetail';

const RepoList = (props) => {
  const {
    repos,
    currentSearch,
    activePageNumber,
    handlePageChange,
    modalOpenStatus,
    closeModal,
    openModal,
    selectedRepo
  } = props;

  /* find cached data id exists already */
  const repoList = repos.filter(each => each.searchKey === currentSearch).map(repo => repo.repositories)[0] || [];
  const totalItemPerPage = 5;

  /* pagination data */
  const startPage = totalItemPerPage * (activePageNumber - 1);
  const endPage = startPage + (totalItemPerPage - 1);
  const totalPageCount = repoList.length;

  /* repos list */
  const list = repoList.filter((each, i) => {
    return i >= startPage && i <= endPage;
  }).map((each, i) => {
    return (
      <div key={each.name + each.owner}>
        <li onClick={() => openModal(each)}
            className={`${i % 2 === 0
              ? 'list-group-item-info list-group-item list'
              : 'list-group-item-light list-group-item list'}`}>
          {each.owner} / {each.name}
        </li>
      </div>
    )
  });

  return (
    <div className="repo-list well">
      <h2>
        Result: {totalPageCount} &nbsp; &nbsp;
        <span style={{float: 'right'}}>Keyword: {currentSearch}</span>
      </h2>
      <br/>
      <ul className="list-group repo-list">
        {list}
      </ul>
      {/* detail view modal */}
      <Modal show={modalOpenStatus}
             onClose={closeModal}>
        <RepoDetail closeModal={closeModal} repoDetail={selectedRepo}/>
      </Modal>
      {/* pagination */}
      {totalPageCount > totalItemPerPage
        ? <Pagination
          activePage={activePageNumber}
          itemsCountPerPage={totalItemPerPage}
          totalItemsCount={totalPageCount}
          pageRangeDisplayed={totalItemPerPage}
          onChange={handlePageChange}
        />
        : null}
    </div>
  )
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
  currentSearch: PropTypes.string,
  activePageNumber: PropTypes.number,
  handlePageChange: PropTypes.func.isRequired,
  modalOpenStatus: PropTypes.bool,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  selectedRepo: PropTypes.object
}

export default RepoList;