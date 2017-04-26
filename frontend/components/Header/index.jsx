import React from 'react';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  showSearchMenu() {
    document.getElementById('search-menu').style.width = "300px";
  }

  handleClick(app) {
    return () => {
      this.props.changeApp(app);
    }
  }

  render() {
    return (
      <header id="page-header" className="fixed-header">
        <i onClick={this.showSearchMenu} className="fa fa-2x fa-fw fa-search" aria-hidden="true"></i>
        <h1 className="title">Search Twitter</h1>
        <div style={{display: "none"}}>
          <i onClick={this.handleClick('twitter')} className="fa fa-2x fa-fw fa-twitter-square" aria-hidden="true"></i>
          <i onClick={this.handleClick('pinterest')} className="fa fa-2x fa-fw fa-pinterest-square" aria-hidden="true"></i>
          <i onClick={this.handleClick('instagram')} className="fa fa-2x fa-fw fa-instagram" aria-hidden="true"></i>
          <i onClick={this.handleClick('facebook')} className="fa fa-2x fa-fw fa-facebook-official" aria-hidden="true"></i>
        </div>
      </header>
    );
  }
}
