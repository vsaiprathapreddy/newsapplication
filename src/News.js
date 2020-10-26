import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles:[],
            categories:['general','entertainment' ,'health' ,'science' ,'sports' ,'technology'],
            selectedCategory: 'general',
            loading:true,
            totalArticles: []
            
        }
    }
    componentDidMount(){
        axios('https://newsapi.org/v2/top-headlines?country=in&apiKey=06ccbee583b443aa867599923640ffc6&category=general')
        .then((response) => {
            console.log(response.data)
          this.setState({
              articles:response.data.articles,
              loading:false,
              totalArticles:response.totalResults,
              pageNo:1
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

        axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=06ccbee583b443aa867599923640ffc6&category=${category}&page`)
        .then((response) => {
            console.log(response.data)
            this.setState({
                articles:response.data.articles,
                loading: false,
                selectedCategory: category,
                pageNo:2
            })

        })
        .catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            })
        })
        
    }

    onPageChange = () => {
        //page number increment
        //this.onChangeCategory
        console.log('called')

        this.setState({
            pageNo: this.state.pageNo + 1
        }, () => {
            this.onChangeCategory();
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
                    dataLength={this.state.totalArticles} //This is important field to render the next data
                    next={this.onPageChange}
                    hasMore={this.state.articles.length != this.state.totalArticles}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                        </p>
                    }
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
            </React.Fragment>
        )
    }
}