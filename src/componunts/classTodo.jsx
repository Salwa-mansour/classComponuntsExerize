import { Component } from "react";

class ClassTodo extends Component{
    constructor(props){
        super(props);
        this.state ={
          itemToEdit:"",
          todos : [{id:crypto.randomUUID(),text:"hghkgh"},{id:crypto.randomUUID(),text:"gjhkgkj"}],
          inputVal :"",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.showEditItem = this.showEditItem.bind(this);
        this.editItem = this.editItem.bind(this);
      }

      handleInputChange(e){
        this.setState((state)=>({
          ...state,
          inputVal:e.target.value,
        }));
      }

      handleSubmit(e){
        e.preventDefault();

        if(this.state.itemToEdit){
        
          this.editItem(this.state.itemToEdit)
          return;
        }
     
        this.setState(
          (state)=>({
            todos:state.todos.concat({id:crypto.randomUUID(),text:state.inputVal}),
            inputVal:""
          }));
      }

      deleteItem(id){
        this.setState(
          (state)=>({
            ...state,
            todos:state.todos.filter(todo=>todo.id !==id)
          })
        )
      }
      showEditItem(id,text){
      
        this.setState(
          (state)=>({
            ...state,
            inputVal:text,
            itemToEdit:id
          })
        )
      }
      editItem(id){
        this.setState(
          (state)=>({
            todos:state.todos.map(todo=>{
            
              if(todo.id ===id){
                return {...todo,text:state.inputVal}
              }else{
                 return{...todo}
              }
             
            }),
            inputVal:"",
            itemToEdit:""
          })
        )
        console.log(this.state.todos)
      }
      render() {
        return (
          <section>
            {/* eslint-disable-next-line react/prop-types */}
            <h3>{this.props.name}</h3>
            {/* The input field to enter To-Do's */}
            <form onSubmit={this.handleSubmit}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="task-entry">Enter a task: </label>
              <input
                type="text"
                name="task-entry"
                value={this.state.inputVal}
                onChange={this.handleInputChange}
              />
              <button type="submit">
                {this.state.itemToEdit? "reSubmit":"submit"}
                </button>
            </form>
            <h4>All the tasks!</h4>
            {/* The list of all the To-Do's, displayed */}
            <ul>
              {this.state.todos.map((todo) => (
                <li key={todo.id} >
                  {todo.text}
                  <button onClick={()=>this.deleteItem(todo.id)} >delete</button>
                  <button onClick={()=>this.showEditItem(todo.id,todo.text)} >
                 edit </button>
                </li>
              ))}
            </ul>
          </section>
        );
      }
}

export {ClassTodo}