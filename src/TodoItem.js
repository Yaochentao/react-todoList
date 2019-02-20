import React from 'react'

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.chlidrenClick = this.chlidrenClick.bind(this);
    }
    render() {
        const { content } = this.props;  //es6解构赋值  content = this.props.content
        return (
            <div onClick={this.chlidrenClick}>  
                {/* {this.props.content} */}
                {content}
            </div>   
            //通过this.props.xxx形式访问属性值,接收父组件的数据
        )
    }

    chlidrenClick() {
        console.log(this.props.index);
        const { deleteItem, index } = this.props;  //es6解构赋值
        // this.props.deleteItem(this.props.index)
        deleteItem(index);
    }
}

export default TodoItem;