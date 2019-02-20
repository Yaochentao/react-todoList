import React, { Component, Fragment } from 'react';
//ES6解构赋值
//等价于 import React from 'react';
//      const Component = React.Component;
// Fragment为占位符  不渲染

import TodoItem from './TodoItem'; //引入TodoItem组件

class TodoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this); //绑定this指向
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }
    render() {
        return (
            <Fragment>
                <div>
                    {/* jsx中注释应这么写 */}

                    {
                        //也可以这么注释
                    }

                    <input 
                     className = 'input-1' //react中  元素类名class应写为className
                     value={this.state.inputValue}   
                     onChange={this.handleInputChange.bind(this)} //通过ES6中的bind()函数绑定了this,使handleInputChange中的this指向组件
                     />
                    {/* <button onClick={this.handleBtnClick.bind(this)}>提交</button> */}
                    {/* 将bind(this)在组件初始化的时候就将this指向绑定好 */}
                    <button onClick={this.handleBtnClick}>提交</button>  
                </div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li 
                                    key={index} 
                                    onClick={this.handleItemDelete.bind(this, index)} //将item的index传入
                                    // dangerouslySetInnerHTML= {{__html: item}} 用此写法可以不转译
                                >
                                    {item}
                                </li>
                            )
                        })
                    }
                </ul>
                <h1>组件</h1>
                <ul>
                    {/* 此处直接引用getTodoItem方法 */}
                    {this.getTodoItem()}   

                    {/* {
                        this.state.list.map((item, index) => {
                            return (
                                <TodoItem
                                  content={item}
                                  index={index}   // 以属性形式向子组件传参
                                  deleteItem = {this.handleItemDelete.bind(this)}  //通过属性也可以传递父组件中的方法
                                  //子组件调用的父组件方法中存在this时需改变this指向,指向父组件
                                />   
                               
                            )
                        })
                    } */}
                </ul>
            </Fragment>
            
        )
    }
      ////  将该部分历遍操作的jsx拆分在getTodoItem中  
    getTodoItem() {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem
                  key={index}  //key应放在循环的最外层元素上
                  content={item}
                  index={index}   // 以属性形式向子组件传参
                  deleteItem = {this.handleItemDelete.bind(this)}  //通过属性也可以传递父组件中的方法
                  //子组件调用的父组件方法中存在this时需改变this指向,指向父组件
                />   
               
            )
        })
    }

    handleInputChange(e) {
        // console.log(e.target.value)
        //console.log(this) 
        // react中不能通过this.state.inputValue = e.target.value这种形式改变数据
        //必须通过this.setState方法
        // //e.target为绑定事件的dom节点

        // this.setState({
        //     inputValue: e.target.value
        // })

        const value = e.target.value;
        this.setState(() => {
            return {
                inputValue: value
            }
        })
        // ES6中return可简写成以下格式
        // this.setState(() => ({
        //     inputValue: value
        // }));
    }

    handleBtnClick() {
        // console.log(...this.state.list)
        if(this.state.inputValue.length > 0) { //判断输入是否为空
            this.setState((prevState) => {    //prevState为之前的状态 相当于this.state
                return {
                    list: [...prevState.list, prevState.inputValue], //使用es6的展开运算符再拼接成新数组
                    inputValue: ''
                }
            })
        }
    }
    handleItemDelete(index) { 
        // console.log(index)
        

        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1)
            return { list: list }  //ES6中可简写成return {list}
        })
        //  通过将list暂存在List中  改变List，再通过this.setState将List赋值给list
        //  实现修改数据
    }
}

export default TodoList;