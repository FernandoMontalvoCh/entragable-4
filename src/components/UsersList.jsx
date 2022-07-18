import React from 'react';
import './style.css';

const UsersList = ({ users, deleteUser, selectedUser }) => {

    return (
        <ul>
            {
                users.map(user=>(
                    <li key={user.id} className='li-container'>
                        <h3 className='list-container'>{user.first_name} {user.last_name}</h3>
                        <div className='list-container'>{user.email}</div>
                        <div className='list-container'><i class="fa-solid fa-cake-candles"></i>{user.birthday}</div>
                        <div className='list-button'>
                        <button onClick={()=> deleteUser(user.id)}
                        className='delete-button'>
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <button onClick={()=> selectedUser(user)}
                        className='edit-button'>
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default UsersList;