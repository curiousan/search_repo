import React, {Component} from 'react';

const RepoDetail = ({repoDetail,closeModal}) => {
const {owner,name,language,followers,url,description} = repoDetail;
const title=owner+' / '+name;

  return (
    <div className={"modal-body"}>
      <h1>{title} <span onClick={closeModal} className="glyphicon glyphicon-remove modal-close-icon" /></h1>
      <hr/>
      <p><b>Language</b> : {language}</p>
      <p><b>Follower</b> : {followers}</p>
      <p><b>Url</b> : {url}</p>
      <p><b>Description</b> : {description}</p>
      <br/>
      <hr />
    </div>
  )
}

export default RepoDetail;