import React from 'react'
import '../assets/css/index.css'
import storage from '../model/storage'

class TodoList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list:[]
        }

    }
    addData= (e)=>{
        if(e.keyCode=== 13){
            let temp=this.state.list
            temp.push(
                {
                    data:this.refs.data.value,
                    checked:false
                })
            this.setState({
                list:temp
            })
            this.refs.data.value=''

            storage.set('todolist',temp)
        }

    }
    removeData= (key)=>{
        let temp=this.state.list
        temp.splice(key,1)
        this.setState({
            list:temp
        })
        storage.set('todolist',temp)
    }
    handleChecked= (key)=>{
        let temp=this.state.list
        temp[key].checked=!temp[key].checked
        this.setState({
            list:temp
        })
        storage.set('todolist',temp)
    }
    handleClear =()=>{
        localStorage.clear();
        this.setState({
            list:[]
        })

    }
    componentDidMount(){
        let list = storage.get('todolist')
        if(list){
            this.setState({
                list:list
            })
        }

    }
    render(){
        return(
            <div>
            <header>
                <section>
                    <form action=""></form>
                    <label for="indata">ReactTodo</label>
                    <input ref="data" id="indata" type="text" onKeyDown={this.addData}/>
                </section>
            </header>
                <section className="listContainer">
                    <h2 className="title" >未完成事项：</h2>
                        {
                            this.state.list.map((value,key)=>{
                                if(!value.checked) {
                                    return (
                                        <div key={key} className="unFinList">
                                            <input type="checkbox" checked={value.checked} onChange={this.handleChecked.bind(this,key)}/>
                                            <span>{value.data}</span>
                                            <a href="#" onClick={this.removeData.bind(this, key)}>x</a>
                                        </div>

                                    )
                                }
                            })
                        }
                    <hr/>
                    <h2 className="title">已完成事项：</h2>
                        {
                            this.state.list.map((value,key)=>{
                                if(value.checked) {
                                    return (
                                        <div key={key} className="finList">
                                            <input type="checkbox" checked={value.checked} onChange={this.handleChecked.bind(this,key)}/>
                                            <span>{value.data}</span>
                                            <a href="#" onClick={this.removeData.bind(this, key)}>x</a>
                                        </div>

                                    )
                                }
                            })
                        }
                </section>
                <footer>
                    <a href="#" onClick={this.handleClear}> clear</a>
                </footer>

            </div>
        )
    }
}
export default TodoList;