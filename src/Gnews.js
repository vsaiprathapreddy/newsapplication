import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Gnews extends React.Component{
    constructor(props){
        super(props);
        this.state={
            articles:[],
            topics:["breaking-news", "world", "nation", "business", "technology", "entertainment", "sports", "science","health"],
            selectedtopic: 'breaking-news',
            loading:true,
            totalArticles: 0,
            pageNo: 1,
            // languages:["Arabic","German","Greek","English","Spanish","French","Hebrew","Hindi","Italian","Japanese","Malayalam","Marathi","Dutch","Norwegian","Portuguese","Romanian","Russian","Swedish","Tamil","Telugu","Ukrainian","Chinese"],
            // selectedLanguage:"te"
            selectedLanguage:"en"
        }
    }
    componentDidMount(){
        axios({
            url: 'https://gnews.io/api/v4/top-headlines',
            method: 'GET',
            params : {
                country: "in",
                token: "dd9e8cc8bdfebbce44ee46f3444a1432",
                lang :this.state.selectedLanguage,
                topic: this.state.selectedtopic,
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
            url: 'https://gnews.io/api/v4/top-headlines',
            method: 'GET',
            params : {
                country: "in",
                token: "dd9e8cc8bdfebbce44ee46f3444a1432",
                topic: this.state.selectedtopic,
                page: this.state.pageNo,
                lang : this.state.selectedLanguage
            }
        }).then((response) => {
            console.log(response);
            this.setState({
                articles: [...this.state.articles, ...response.data.articles],
                loading:false,
                totalArticles: response.data.totalArticles,
            })
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                loading: false
            })
        })
        
    }

    onChangeTopic = (event) => {
        const topic = event.target.value;

        this.setState({
            selectedtopic: topic,
            articles: []
        }, () => {
            this.loadNews();
        })
    }
    // onChangeLanguage = (event) =>{
    //     const language = event.target.value;
    //     this.setState({
    //         selectedLanguage: language,
    //         articles: []
    //     }, () => {
    //         this.loadNews();
    //     })
    // }

    // onPageChange = () => {
    //     this.setState({
    //         pageNo: this.state.pageNo + 1
    //     }, () => {
    //         this.loadNews();
    //     })
    // }

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
                                <label>Select your Topic : </label>
                                <select onChange={this.onChangeTopic} value={this.state.selectedtopic}>
                                    {
                                        this.state.topics.map((topic) => (
                                            <option value={topic}>{topic}</option>
                                        ) )
                                    }
                                </select>
                                {/* <label>Select your Language:</label>
                                <select onChange={this.onChangeLanguage} value={this.state.selectedLanguage}>
                                    {
                                        this.state.languages.map((language) => (
                                            <option value={language}>{language}</option>
                                        ) )
                                    }
                                </select> */}
                            </div>
                            
                        )
                    }
                </div>
                <InfiniteScroll
                    dataLength={this.state.totalArticles} //This is important field to render the next data
                    // next={this.onPageChange}
                    hasMore={this.state.articles.length != this.state.totalArticles}
                >
                    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around"}}>
                        {
                            this.state.articles.map((article,index) => {
                                return(
                                    <div>
                                        <div className="card" style={{width: '18rem',height:'450px',padding:'10px',marginBottom:'20px',borderColor:"black",backgroundColor:'#ffffcc'}}>
                                            <img src={article.image} className="card-img-top" alt="..." style={{height:'160px'}}/>
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
                {/* {
                    this.state.articles.length == this.state.totalResults && (
                        // <p>That's all</p>
                    )
                } */}
            </React.Fragment>
        )
    }
}