import React, { Component } from "react";
import {BrowserRouter as Router,Switch, Route} from "react-router-dom";
import UserInput from './UserInput';
import StatusBar from './StatusBar';
import {All,Pending,Completed} from './components';

export default class Hello extends Component{
    constructor(props){
        super(props);
        let outputList = JSON.parse(localStorage.getItem("todoList")) || [];
        this.state = {
            output: outputList,
            inputVal: ""
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
            const keyPosition = state.output.findIndex(o => {
                return o.id === key
            })
            state.output.splice(keyPosition,1);
            localStorage.setItem("todoList" , JSON.stringify(state.output));
            console.log(state.output);
            return state.output;
        })
    }
    
    render(){
        return (
            <Router>
                <div className="todoWrap">
                    <UserInput change={this.changeHandler} submit={this.submit} valueInput={this.state.inputVal}></UserInput>
                    <Switch>
                        <Route exact path="/" render={
                            (props) => (
                                <All {...props} obj={this.state.output} click={this.toggleClass} click2={this.removeTodo} />
                            )} 
                        />
                        <Route path="/completed" render={
                            (props) => (
                                <Completed {...props} obj={this.state.output} click={this.toggleClass} click2={this.removeTodo} />
                            )} 
                        />
                        <Route path="/pending" render={
                            (props) => (
                                <Pending {...props} obj={this.state.output} click={this.toggleClass} click2={this.removeTodo} />
                            )} 
                        />
                    </Switch>
                    <StatusBar />
                </div>
            </Router>
        )
    }
}