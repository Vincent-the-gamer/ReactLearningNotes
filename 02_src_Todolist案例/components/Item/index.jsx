import {Component} from "react";
import './index.css'

export default class Item extends Component{
    state = {mouse: false}  //标识鼠标移入、移出

    render(){
        const {id,name,done} = this.props
      return(
          <div>
              <li style={{backgroundColor: this.state.mouse ? '#ddd' : 'white'}} onMouseLeave={this.handleMouse(false)} onMouseEnter={this.handleMouse(true)}>
                  <label>
                      <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
                      <span>{name}</span>
                  </label>
                  <button onClick={ () => this.handleDelete(id) } className="btn btn-danger" style={{display: this.state.mouse ? 'block' : 'none'}}>删除</button>
              </li>
          </div>
      )
    }
    //鼠标移入、移出的回调
    handleMouse = (flag) => {
        return () => {
            this.setState({mouse: flag})
        }
    }

    //每一个todo勾选框的回调
    handleCheck = (id) => {
      return (event) => {
         this.props.updateTodo(id,event.target.checked)
      }
    }

    //处理删除事件
    handleDelete = (id) => {
        if(window.confirm('你确定要删除吗？')){
            this.props.deleteTodo(id)
        }
    }
}