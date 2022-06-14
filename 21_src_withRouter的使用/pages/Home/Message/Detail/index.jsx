import React, {Component} from 'react';
import qs from 'query-string';

const detailData = [
    {id: '01',content: '我要买MacBook Pro M2 Max芯片顶配'},
    {id: '02',content: '我要买Steam Deck'},
    {id: '03',content: '我要买iPhone 14'}
]

export default class Detail extends Component {
    render() {
        // 接收Params参数
        // const {id,title} = this.props.match.params

        //接收Search参数
        // const {search} = this.props.location
        // const {id,title} = qs.parse(search.slice(1))

        //接收state参数
        // a || b: 如果a为真直接返回a，否则返回b
        // a && b: 如果a为假直接返回a，否则返回b
        const {id,title} = this.props.location.state || {}

        const findResult = detailData.find(detailObj => {
            return detailObj.id === id
        }) || {}

        return (
            <ul>
                <li>ID: { id }</li>
                <li>title: { title }</li>
                <li>content: { findResult.content }</li>
            </ul>
        );
    }
}
