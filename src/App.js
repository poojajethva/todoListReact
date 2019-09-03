import React, { Component } from "react";
import UserInput from './UserInput';
import Todolist from './Todolist';

export default class Hello extends Component{
    constructor(props){
        super(props);
        let outputList = JSON.parse(localStorage.getItem("todoList")) || [];
        this.state = {
            output: outputList,
            inputVal: "",
            showList: ""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.toggleClass = this.toggleClass.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        console.log(this.props)
    }
    
    changeHandler(e){
        this.setState({inputVal: e.currentTarget.value})
    }

    submit(e){
        e.preventDefault();
        let val = this.state.inputVal;
        let uKey = new Date().getTime();
        if(!!val){
            this.setState((state) => {
                state.inputVal = "";
                let currObj = {"id": uKey, "text": val, "status": "new"};
                state.output.push(currObj);
                localStorage.setItem("todoList" , JSON.stringify(state.output));
                return state.output;
            })
        }
    }

    toggleClass(e) {
        const idU = e.currentTarget.parentElement.getAttribute('data-akey');
        this.setState((state) => {
            let key = state.output.findIndex(k => {
                return k.id === parseInt(idU)
            });
            
            if(state.output[key]["status"] === "new")
                state.output[key]["status"] = 'done';
            else
                state.output[key]["status"] = 'new';

            console.log(state.output);
            localStorage.setItem("todoList" , JSON.stringify(state.output));
            return state.output;
        }); 
    }
    
    removeTodo(e){
        const key = e.currentTarget.parentElement.getAttribute('data-akey'); 
        this.setState((state) => {
            state.output.splice(key,1);
            localStorage.setItem("todoList" , JSON.stringify(state.output));
            return state.output;
        })
    }

    checkStatus (e) {
        const showList = e.target.getAttribute("data-name");
        if (document.querySelector('.navBar li.active') !== null) 
            document.querySelector('.navBar li.active').classList.remove("active");
        e.currentTarget.className = "active";
        this.setState((state) => {
            return state.showList = showList;
        })
    }
    
    
    
    
    render(){
        let navBar = this.state.output.length > 0 ? 
        <Todolist.StatusBar click={this.checkStatus.bind(this)} /> : '';
        let list = this.state.output.length > 0 ? <Todolist.Todolist obj={this.state.output} showList={this.state.showList} click={this.toggleClass} click2={this.removeTodo} /> : <p className="emptyContent">No todo found.</p>;
        return (
            <div className="todoWrap">
                <UserInput change={this.changeHandler} submit={this.submit} valueInput={this.state.inputVal}></UserInput>
                {list}
                {navBar}
            </div>
        )
    }
}