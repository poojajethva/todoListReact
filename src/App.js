import React, { Component } from "react";
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

    findObjIndex = (obj, id) => {
        for (let i = 0; i < obj.length; i++) {
            if (obj[i]["id"] === id) {
                return i;
            }
        }
        return -1;
    }

    toggleClass(e) {
        const idU = e.currentTarget.parentElement.getAttribute('data-akey');
        this.setState((state) => {
            let key = this.findObjIndex(state.output, parseInt(idU));
            
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
                <form className="formwrap" onSubmit={this.submit}>
                <input type="text" placeholder="Type your todo..." name="todo" className="todo" value={this.state.inputVal} onChange={this.changeHandler} />
                <button className="btn" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="32" height="32" viewBox="0 0 32 32" fill="#000000"><g id="surface1"><path d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 11 L 15 15 L 11 15 L 11 17 L 15 17 L 15 21 L 17 21 L 17 17 L 21 17 L 21 15 L 17 15 L 17 11 Z "></path></g></svg>
                </button>
                </form>
                {list}
                {navBar}
            </div>
        )
    }
}

