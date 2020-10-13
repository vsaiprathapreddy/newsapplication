import React from 'react';
import axios from 'axios';

export default class News extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles:[],
            categories:['entertainment' ,'general' ,'health' ,'science' ,'sports' ,'technology']
        }
    }
    componentDidMount(){
        axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=06ccbee583b443aa867599923640ffc6')
        .then((response) => {
            console.log(response.data)
          this.setState({
              articles:response.data.articles,
          })

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }
    handleGeneral = ()=> {
            
    }
   
    render(){
        return(
            <React.Fragment>
                <div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button onClick= {this.handleGeneral} type="button" class="btn btn-secondary">general</button>
                        <button type="button" class="btn btn-secondary">entertainment</button>
                        <button type="button" class="btn btn-secondary">health</button>
                        <button type="button" class="btn btn-secondary">science</button>
                        <button type="button" class="btn btn-secondary">sports</button>
                        <button type="button" class="btn btn-secondary">technology</button>

                    </div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                    {
                        this.state.articles.map((article,index) => {
                            return(
                                <div>
                                    <div class="card" style={{width: '18rem'}}>
                                        <img src={article.urlToImage} class="card-img-top" alt="..." />
                                        <div class="card-body">
                                            <h5 class="card-title">{article.title}</h5>
                                            <p class="card-text">{article.description}</p>
                                            <a href={article.url} class="btn btn-primary" target='_blank'>View full article</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </React.Fragment>
        )
    }
}