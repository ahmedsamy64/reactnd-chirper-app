import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET:
            return {
                ...state,
                //we used the square brackets to tell that inside is an expression and use 
                //it's value to compute the key.
                //key wrapped in [] tells js that inside is an expression whose result is the key.
                //[action.id] returns "2mb6re13q842wu8n106bhk" 
                //...state[action.id] returns the info about this tweet id
                [action.id]: {
                    //return the state of the tweet as it is but change likes
                    ...state[action.id],
                    likes: action.hasLiked === true
                        ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
                        : state[action.id].likes.concat([action.authedUser])
                }
            }
        case ADD_TWEET:
            const { tweet } = action

            let replyingTo = {}
            if (tweet.replyingTo !== null) {
                replyingTo = {
                    [tweet.replyingTo] : {
                        ...state[tweet.replyingTo],
                        replies: state[tweet.replyingTo].replies.concat([tweet.id])
                    }
                }
            }
            return {
                ...state,
                //adding new tweet to the state, [action.tweet.id] returns "cjrgnr13rgrgcgt" or somthing as key
                //action.tweet is the all data of the tweet of the action
                [action.tweet.id] : action.tweet,
                ...replyingTo
                
            }
        default:
            return state
    }
}