import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'


 function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

//the asyncronous action creator, to handle the api then dispatch to the normal action creator above
export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        dispatch(showLoading())
        return saveTweet({
            text,
            author: authedUser,
            replyingTo
        }).then((tweet) => dispatch(addTweet(tweet)))
            .then(() => dispatch(hideLoading()))
    }

}


export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function toggleTweet({ id, authedUser, hasLiked }) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    }
}

//asyncronous action creator which is responsible for invoking 
//saveLikeToggle function from api

export function handleToggleTweet(info) {
    return (dispatch) => {
        //using optimistic updates here when we toggle the tweet first in UI
        dispatch(toggleTweet(info))
        return saveLikeToggle(info).catch((e) => {
            console.warn('Error in handleToggleTweet: ', e)
            dispatch(toggleTweet(info))
            alert('There is an error in liking the tweet, try again')
        })
    }
}
