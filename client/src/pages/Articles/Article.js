import React, { Component } from "react";

import ArticleBtn from "../../components/ArticleBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    title: "",
    startdate: "",
    enddate: "",
    saved:[]
  };
//----------------------------------------------------
//Show all saved articles when component loads 
//---------------------------------------------------- 
componentDidMount() {
  this.showSavedArticles()
}
//----------------------------------------------------- 
//  Updating state of Input
//-----------------------------------------------------
handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //----------------------------------------------------------------------------------------
  //search nytimes api to find relevent articles based on topic,start and end year
  //----------------------------------------------------------------------------------------
  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get articles update the articles state
    event.preventDefault();
    var query = this.state.title
    if(parseInt(this.state.startdate))
    {
      query = query + "&begin_date=" + this.state.startdate + "0101"
    }
    if(parseInt(this.state.enddate))
    {
      query = query + "&end_date=" + this.state.enddate + "0101";
    }
    console.log(query)
    API.Search(query)
    .then(res => {
      this.setState({ articles: res.data.response.docs })
      console.log(res.data)
    })
    .catch(err => console.log(err));
  };

//----------------------------------------------------------
//save articles when save button is clicked
//----------------------------------------------------------

  saveArticle = event => {
    var  id  = event.target.id
    console.log(id)
     var result = this.state.articles.filter(function (obj) {
      return obj._id === id
     })
    console.log(result)
    
    var articleData = {
      title:result[0].headline.main,
      url:result[0].web_url
    }
    console.log(articleData)
        
     API.saveArticle(articleData)
     .then(res => this.showSavedArticles())
  }
  

  //--------------------------------------------------------
  //Displaying saved articles
  //---------------------------------------------------------
  showSavedArticles = () => {
    API.savedArticles()
    .then(res =>
      this.setState({ saved: res.data})
      )
    .catch(err => console.log(err));
  };
  //---------------------------------------------------------
  //Delete saved articles
  //---------------------------------------------------------
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.showSavedArticles())
      .catch(err => console.log(err));
  };

  

  render() {
    return (
      <Container fluid>
      <Row>
      <Col size="md-12">
      <Jumbotron>
      <h1 style={{color:"white"}}>NewYork Times Article Scrubber</h1>
      <h2 style={{color:"white"}}>Search for and annotate articles of interest!</h2>
      </Jumbotron>
      <form>
      <h2>Search</h2>
      <Input
      value={this.state.title}
      onChange={this.handleInputChange}
      name="title"
      placeholder="Topic (required)"
      />
      <Input
      value={this.state.startdate}
      onChange={this.handleInputChange}
      name="startdate"
      placeholder="Start Date"
      />
      <Input
      value={this.state.enddate}
      onChange={this.handleInputChange}
      name="enddate"
      placeholder="End Date"
      />

      <FormBtn 
      onClick={this.handleFormSubmit}>
      Search
      </FormBtn>
      </form>
      </Col>

      </Row>
      <Row><hr/></Row>
      <Row>
      
      <Col size="xs-12">
      <div className= "panel-heading" style={{backgroundColor:"#6B6363"}}><h2>Search Result</h2></div>
      {!this.state.articles.length ? (
        <h1 className="text-center">No Articles to Display</h1>
        ) : (
        <List>
        {this.state.articles.map(article => {
          return (
            <ListItem
            key={article._id}
            >
            <strong>
            {article.headline.main}
            </strong>
            <br/>
            <a href={article.web_url}>
            {article.web_url}
            </a>
            <ArticleBtn id={article._id} onClick={this.saveArticle}>Save</ArticleBtn>
            </ListItem>
            );
        })}
        </List>
        )}
        </Col>
        </Row>
        <Row><hr/></Row>
        <Row>
        <Col size="md-12">
        <div className= "panel-heading" style={{backgroundColor:"#6B6363"}}><h2>Saved Articles</h2></div>
        {!this.state.saved.length ? (
          <h1 className="text-center">No Articles to Display</h1>
          ) : (
          <List>
          {this.state.saved.map(article => {
            return (
              <ListItem
              key={article._id} >
              <strong>
              {article.title}
              </strong>
              <br/>
              <a href={article.url}>
              {article.url}
              </a>
              <ArticleBtn onClick={() => this.deleteArticle(article._id)}>Remove</ArticleBtn>

              </ListItem>

              );
          })}
          </List>
          )}
          </Col>
          </Row>
          </Container>
          );
  }
}

export default Articles;
