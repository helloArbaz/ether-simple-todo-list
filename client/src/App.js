import React, { Component } from 'react'
import SimpleStorageContract from './contracts/SimpleStorage.json'
import getWeb3 from './getWeb3'
import {
  Button,
  Checkbox,
  Container,
  Grid,
  TextField,
  Typography,
  Box
} from '@mui/material'
import { loadWeb3, getTodos, addTodo, deleteTask, updateTask } from './helper'

import './App.css'
import { Delete } from '@mui/icons-material'

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null }

  load = async () => {
    let { web3, accounts, contract } = await loadWeb3()
    this.setState({
      web3,
      accounts,
      contract,
      _content: null,
    })

    this.loadTodos()
  }

  loadTodos = async () => {
    const { web3, contract } = this.state
    let response = await getTodos(web3, contract)
    this.setState({
      todoLists: response,
    })
  }

  componentDidMount = async () => {
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      todoLists: [],
    }
    this.load = this.load.bind(this)
    this.loadTodos = this.loadTodos.bind(this)
    this.addTodoList = this.addTodoList.bind(this)
    this.deleteTsk = this.deleteTsk.bind(this)
    this.load()
  }

  addTodoList = async () => {
    const { web3, contract, accounts, _content } = this.state
    let response = await addTodo(contract, _content, accounts)
    this.setState({
      todoLists: response,
      _content: '',
    })
  }

  deleteTsk = async (_index) => {
    const { web3, contract, accounts } = this.state
    let response = await deleteTask(_index, contract, accounts)
    this.setState({
      todoLists: response,
    })
  }

  taskCompleted = async (_index) => {
    const { web3, contract, accounts } = this.state
    let response = await updateTask(_index, contract, accounts)
    this.setState({
      todoLists: response,
    })
  }

  render() {
    const { web3, accounts, contract, todoLists, _content } = this.state

    if (!web3) {
      return <Box>Loading</Box>
    }
    return (
      <Container>
        <Box p={2} marginTop={10}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                value={_content}
                onChange={(evnt) =>
                  this.setState({ _content: evnt.target.value })
                }
                label="Enter New Task"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                disabled={!_content}
                onClick={() => {
                  this.addTodoList()
                }}
                style={{ height: 55 }}
                fullWidth
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          <Grid mt={5} items xs={12}>
            {!todoLists ||
              (todoLists.length === 0 && (
                <Box textAlign={"center"}>
                  <Typography color={'red'}>No Task Found</Typography>
                </Box>
              ))}
            {todoLists &&
              todoLists.map((val, ind) => {
                return (
                  <Grid items xs={12}>
                    <Box
                      display={'flex'}
                      flexDirection="row"
                      alignItems={'center'}
                     textOverflow={"clip"}
                      style={{cursor:"pointer"}}
                    >
                      <Delete
                        onClick={() => this.deleteTsk(ind)}
                        fontSize="medium"
                        color="error"
                      />
                      <Checkbox
                        checked={val._isCompleted}
                        onClick={() => {
                          !val._isCompleted && this.taskCompleted(ind)
                        }}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                      />
                      <Box color={val._isCompleted ? "gray" : "black"}>{`Message: ${val._content}`}</Box>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </Container>
    )
  }
}

export default App
