import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import UsersList from './components/UsersList';
import UsersForm from './components/UsersForm';

function App() {

  const [ users, setUsers ] = useState([]);
  const [ userSelected, setUserSelected ] = useState(null);

  useEffect(()=> {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }, [])

  const getUsers = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }

  const deleteUser = (id) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(()=> getUsers())
  }

  const selectedUser = user => {
    setUserSelected(user)
  }

  const deselectedUser = () => setUserSelected(null)

  return (
    <div className="App">
      <UsersForm 
      getUsers={getUsers}
      deselectedUser={deselectedUser}
      userSelected={userSelected}/>
      <UsersList 
      users={users} 
      deleteUser={deleteUser}
      selectedUser={selectedUser}/>
    </div>
  )
}

export default App
