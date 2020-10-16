import React from 'react';
import axios from 'axios';

export default class News extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles:[],
            categories:['general','entertainment' ,'health' ,'science' ,'sports' ,'technology'],
            selectedCategory: 'general',
            loading:true
            
        }
    }
    componentDidMount(){
        axios('https://newsapi.org/v2/top-headlines?country=in&apiKey=06ccbee583b443aa867599923640ffc6&category=general')
        .then((response) => {
            console.log(response.data)
          this.setState({
              articles:response.data.articles,
              loading:false
          })

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }
    onChangeCategory = (event) =>{
        let category = event.target.value;
        this.setState({
            loading: true
        })

        axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=06ccbee583b443aa867599923640ffc6&category=${category}`)
        .then((response) => {
            console.log(response.data)
            this.setState({
                articles:response.data.articles,
                loading: false,
                selectedCategory: category
            })

        })
        .catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            })
        })
        
    }
   
    render(){
        return(
            <React.Fragment>
                <div>
                    {
                        this.state.loading?(
                            <div class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        ): (
                            <div>
                                <label>Select your category : </label>
                                <select onChange={this.onChangeCategory} value={this.state.selectedCategory}>
                                    {
                                        this.state.categories.map((category) => (
                                            <option value={category}>{category}</option>
                                        ) )
                                    }
                                </select>
                            </div>
                        )
                    }
                </div>
                
                <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                    {
                        this.state.articles.map((article,index) => {
                            return(
                                <div>
                                    <div class="card" style={{width: '18rem',height:'450px',padding:'10px',marginBottom:'20px',borderColor:"black",backgroundColor:'#ffffcc'}}>
                                        <img src={article.urlToImage} class="card-img-top" alt="..." style={{height:'160px'}}/>
                                        <div class="card-body">
                                            <h5 class="card-title" style={{height:'180px'}}>{article.title}</h5>
                                            {/* <p class="card-text">{article.description}</p> */}
                                            <a href={article.url}class="btn btn-primary" target='_blank'style={{color:'#ccccff'}}>View full article</a>
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