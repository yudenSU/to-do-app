
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    gender: string;
    image: string;
}

export interface ITodo {
    id: number,
    todo : string,
    completed: boolean,
    userId: number
}

export interface INewToDo {
    todo: string,
    completed: boolean,
    userId: number
}

//Interfaces for params
export interface IUpdateToDoRequest {
    id: number,
    updatedTodo?: string
    completed?: boolean

  }