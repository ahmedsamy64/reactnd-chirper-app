import React from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h3 className='center'>Your Timeline</h3>
                <ul className='dashboard-list'>
                    {this.props.tweetsIds.map((id) => (
                        <li key={id}>
                            <div><Tweet id={id} /></div>
                        </li>
                    ))}

                </ul>
            </div>
        )
    }
}

// takes in the specific state of our store which is tweets and map it to prop in this component
function mapStateToProps({ tweets }) {
    return {
        // Object.keys returns an array of given object's property names iterated in the same order
        tweetsIds: Object.keys(tweets)
            // sort with compare function a - b will sort from less to more and b - a from more to less 
            // here we will sort them by timestamp 
            .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }

}

export default connect(mapStateToProps)(Dashboard) 