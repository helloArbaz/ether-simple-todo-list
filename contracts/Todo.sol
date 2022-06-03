// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

pragma experimental ABIEncoderV2;

contract Todo {
    
    struct TodoStruct{
        uint _id;
        string _content;
        bool _isCompleted;
    }

    TodoStruct[] taskList;
    uint _autoIncrementId=0;

    constructor()public{}

    function createTodo(string memory _content) public  returns (TodoStruct[] memory){
        _autoIncrementId ++;
        taskList.push(
            TodoStruct({
                _id:_autoIncrementId,
                _content:_content,
                _isCompleted:false
            })
        );
        return taskList;
    }

    function getTodoList() public view returns(TodoStruct[] memory){
        return taskList;
    }

    function upadetTask(bool _isCompleted, uint _index) external returns(TodoStruct[] memory){
        TodoStruct storage  tsk = taskList[_index];
        tsk._isCompleted = _isCompleted;
        return taskList;
    }

    function deleteTask(uint _id) public returns(TodoStruct[] memory) {
        taskList[_id] = taskList[taskList.length-1];
        taskList.pop();
        return taskList;
    }
    
}