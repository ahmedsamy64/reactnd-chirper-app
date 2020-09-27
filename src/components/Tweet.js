import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti/index'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {

    toParent = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)

    }

    handleLike = (e) => {
        e.preventDefault()
    
        const { dispatch, tweet, authedUser } = this.props
        dispatch(handleToggleTweet({id:tweet.id, authedUser, hasLiked: tweet.hasLiked}))
      }

    render() {
        const { tweet } = this.props

        if (tweet === null) {
            return (<p>this tweet doesnt exists</p>)

        }
        const { name, avatar, timestamp, text, hasLiked, likes, id, replies, parent } = tweet


        return (
            <Link to={`/tweet/${id}`} className='tweet'>
                <img
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                                Replying to @{parent.author}
                            </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                            {hasLiked === true ?
                                <TiHeartFullOutline color='#e0245e' className='tweet-icon' /> :
                                <TiHeartOutline className='tweet-icon' />}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

//when we connect component to redux state we need to know the state this component need from store
//here we need tweets, users and authedUser
//if you Tweets (the component you're rendering) a prop: that is going to come here as second argument
//because when we render a tweet we will pass it an id
function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null // if the tweet doesnt exists the app wont crash
    return {
        //who is the user
        authedUser,
        //the tweet itself and we have formater to it sends it the tweet , 
        //the users[tweet.author] Associative array return the name of the user who wrote the tweet
        //the authedUser and the parentTweet that we are replying to 
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
    }

}

export default withRouter(connect(mapStateToProps)(Tweet)) 