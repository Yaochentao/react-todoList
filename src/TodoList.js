import React, { Component } from 'react';

import 'antd/dist/antd.css'

import { Input, Button, List } from 'antd';

import store from './store/index.js'



class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        store.subscribe(this.handleStoreChange); //store.subscribe()在store改变时自动执行
    }

    render() {
        return (
            <div style={{marginTop: '10px', marginLeft: '10px'}}>
                <Input
                  value={this.state.inputValue}
                  style={{width: '300px', marginRight: '10px'}}  //内联样式得这样写
                  onChange={this.handleInputChange}
                />
                 <Button
                  type="primary"
                  onClick={this.handleBtnClick}
                >
                  提交
                </Button>
                 <List
                    style={{marginTop: '10px', width: '360px'}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (<List.Item onClick={this.handleItemDelete.bind(this, index)}>{item}</List.Item>)}
                />
            </div>
        )
    }

    handleInputChange(e) {
        const action = {
            type: 'change_input_value',
            value: e.target.value
        }
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(store.getState()); //从store中拿数据  替换该组件state
    }

    handleBtnClick() {
        const action = {
            type: 'add_todo_item'
        };
        store.dispatch(action);
    }

    handleItemDelete(index) {
        const action = {
            type: 'delete_todo_item',
            index: index
        }
        store.dispatch(action);
    }
}

export default TodoList;