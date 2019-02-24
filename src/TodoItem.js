import React from 'react'
import axios from 'axios'

import PropTypes from 'prop-types' //引入prop-types进行属性校验

class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.chlidrenClick = this.chlidrenClick.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.content !== this.props.content) {
            return true;
        }else {
            return false;
        }
    }  //性能优化 ： 判断是否需要重新渲染   

    render() {
        //Ajax请求不能写在render中  会造成死循环
        console.log('TodoItem render')
        const { content } = this.props;  //es6解构赋值  content = this.props.content
        return (
            <div onClick={this.chlidrenClick}>  
                {/* {this.props.content} */}
                {content}
            </div>   
            //通过this.props.xxx形式访问属性值,接收父组件的数据
        )
    }

    componentDidMount() {
        console.log('componentDidMount')
        //Ajax请求写在componentDidMount中   一般使用axios
        // console.log('componentDidMount')
        axios.get('https://api.bzqll.com/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0')
            .then((res) => {
                console.log(res)
            })
    }

    chlidrenClick() {
        console.log(this.props.index);
        const { deleteItem, index } = this.props;  //es6解构赋值
        // this.props.deleteItem(this.props.index)
        deleteItem(index);
    }
}
//使用 PropTypes 进行类型检查
TodoItem.propTypes = {
    content: PropTypes.string,
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

//使用defaultProps设置没传值时的属性默认值
TodoItem.defaultProps = {
    content: ''
}

export default TodoItem;