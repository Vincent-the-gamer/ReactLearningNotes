import React, {Component} from 'react';
import {nanoid} from "nanoid";
import {connect} from "react-redux";
import {addPerson} from '../../redux/actions/person'

class Person extends Component {
    addPerson = ()=> {
        const name = this.nameNode.value
        const age = this.ageNode.value
        const personObj = {id: nanoid(),name,age}
        this.props.addPerson(personObj)
        this.nameNode.value = ''
        this.ageNode.value = ''
    }

    render() {
        return (
            <div>
                <h1>我是Person组件，上方组件求和为：{this.props.count}</h1>
                名字：<input ref={c => this.nameNode = c} type="text" placeholder="输入名字"/> <br/>
                年龄：<input ref={c => this.ageNode = c} type="text" placeholder="输入年龄"/> <br/>
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.persons.map((person) => {
                            return <li key={person.id}>{person.name}---{person.age}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        persons: state.persons,
        count: state.count
    }), //映射状态
    {  //映射操作方法
        addPerson
    }
)(Person)
