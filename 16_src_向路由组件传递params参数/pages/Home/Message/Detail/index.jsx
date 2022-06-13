import React, {Component} from 'react';

const detailData = [
    {id: '01',content: '我要买MacBook Pro M2 Max芯片顶配'},
    {id: '02',content: '我要买Steam Deck'},
    {id: '03',content: '我要买iPhone 14'}
]

export default class Detail extends Component {
    render() {
        // 接收Params参数
        const {id,title} = this.props.match.params
        const findResult = detailData.find(detailObj => {
            return detailObj.id === id
        })

        return (
            <ul>
                <li>ID: { id }</li>
                <li>title: { title }</li>
                <li>content: { findResult.content }</li>
            </ul>
        );
    }
}
