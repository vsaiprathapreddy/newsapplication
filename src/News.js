import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles:[],
            categories:['general','entertainment' ,'health' ,'science' ,'sports' ,'technology','business'],
            selectedCategory: 'general',
            loading:true,
            totalResults: 0,
            pageNo: 1
            
        }
    }
    componentDidMount(){
        axios({
            url: 'https://newsapi.org/v2/top-headlines',
            method: 'GET',
            params : {
                country: "in",
                apiKey: "06ccbee583b443aa867599923640ffc6",
                category: this.state.selectedCategory,
                page: this.state.pageNo
            }
        })
        .then((response) => {
        console.log(response.data.totalResults)
            
        this.setState({
              articles:response.data.articles,
              loading:false,
              totalResults:response.data.totalResults
          })

        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }

    loadNews = () =>{
        this.setState({
            loading: true
        })

        axios({
            url: 'https://newsapi.org/v2/top-headlines',
            method: 'GET',
            params : {
                country: "in",
                apiKey: "06ccbee583b443aa867599923640ffc6",
                category: this.state.selectedCategory,
                page: this.state.pageNo
            }
        }).then((response) => {
            console.log(response);
            this.setState({
                articles: [...this.state.articles, ...response.data.articles],
                loading:false,
                totalResults: response.data.totalResults,
            })
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            })
        })
        
    }

    onChangeCategory = (event) => {
        const category = event.target.value;

        this.setState({
            selectedCategory: category,
            articles: []
        }, () => {
            this.loadNews();
        })
    }

    onPageChange = () => {
        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            this.loadNews();
        })
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    {
                        this.state.loading?(
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
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
                <InfiniteScroll
                    dataLength={this.state.totalResults} //This is important field to render the next data
                    next={this.onPageChange}
                    hasMore={this.state.articles.length != this.state.totalResults}
                >
                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                        {
                            this.state.articles.map((article,index) => {
                                return(
                                    <div>
                                        <div className="card" style={{width: '18rem',height:'450px',padding:'10px',marginBottom:'20px',borderColor:"black",backgroundColor:'#ffffcc'}}>
                                            <img src={article.urlToImage} className="card-img-top" alt="..." style={{height:'160px'}}/>
                                            <div className="card-body">
                                                <h5 className="card-title" style={{height:'180px'}}>{article.title}</h5>
                                                {/* <p className="card-text">{article.description}</p> */}
                                                <a href={article.url}className="btn btn-primary" target='_blank'style={{color:'#ccccff'}}>View full article</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </InfiniteScroll>
                {
                    this.state.articles.length == this.state.totalResults && (
                        <p>That's all</p>
                    )
                }
            </React.Fragment>
        )
    }
}