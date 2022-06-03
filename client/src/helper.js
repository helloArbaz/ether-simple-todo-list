import getWeb3 from './getWeb3'
import TodoContract from './contracts/Todo.json'

const loadWeb3 = async () => {
  try {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId()
    const deployedNetwork = TodoContract.networks[networkId]
    const instance = new web3.eth.Contract(
      TodoContract.abi,
      deployedNetwork && deployedNetwork.address,
    )
    return { web3, accounts, contract: instance }
  } catch (error) {
    console.log(error)
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`,
    )
  }
}

const getTodos = async (web3, contract) => {
  let todos = await contract.methods.getTodoList().call()
  return todos ? todos : []
}

const addTodo = async (contract, _content, accounts) => {
  let todo = await contract.methods
    .createTodo(_content)
    .send({ from: accounts[0] })
  let response = await getTodos(null, contract)
  return response
}

const deleteTask = async (_id, contract, accounts) => {
  let dlt = await contract.methods.deleteTask(_id).send({ from: accounts[0] })
  let response = await getTodos(null, contract)
  return response
}

const updateTask = async (_index, contract, accounts) => {
  let update = await contract.methods.upadetTask(true, _index).send({ from: accounts[0] })
  let response = await getTodos(null, contract)
  return response
}

export { loadWeb3, getTodos, addTodo, deleteTask, updateTask }
