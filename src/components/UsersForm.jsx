import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

const UsersForm = ({ getUsers, deselectedUser, userSelected }) => {

    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ birthday, setBirthday ] = useState("");

    useEffect(()=>{
        if(userSelected !== null){
            setFirstName(userSelected.first_name);
            setLastName(userSelected.last_name);
            setEmail(userSelected.email);
            setPassword(userSelected.password);
            setBirthday(userSelected.birthday);
        } 
    }, [ userSelected ])

    const submit = (e) => {
        e.preventDefault();
        const newUser= {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            birthday
        }
        if(userSelected !== null){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, newUser)
                .then(()=>{
                    getUsers();
                    reset();
                    deselectedUser();
                })

        } else {
            axios.post('https://users-crud1.herokuapp.com/users/', newUser)
                .then(()=>{
                    getUsers();
                    reset();
            })
                .catch(error => console.log(error.responde))
            reset();
        }
    }

    const reset = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setBirthday("");
    }

    return (
        <form onSubmit={submit} className='form-container'>
            <h1 className='h1-form'>Users Form</h1>
            <div className='name-container'>
            <div>
                <label htmlFor="first_name"><i class="fa-solid fa-user"></i></label>
                <input type="text" id='first_name' placeholder='first name'
                onChange={e=> setFirstName(e.target.value)} value={firstName}/>
            </div>
            <div>
                <label htmlFor="last_name"></label>
                <input type="text" id='last_name' placeholder='last name'
                onChange={e=> setLastName(e.target.value)} value={lastName}/>
            </div>
            </div>
            <div className='input-container'>
                <label htmlFor="email"><i class="fa-solid fa-envelope"></i></label>
                <input type="text" id='email' placeholder='email'
                onChange={e=> setEmail(e.target.value)} value={email}/>
            </div>
            <div className='input-container'>
                <label htmlFor="password"><i class="fa-solid fa-lock"></i></label>
                <input type="password" id='password' placeholder='password'
                onChange={e=> setPassword(e.target.value)} value={password}/>
            </div>
            <div className='input-container'>
                <label htmlFor="birthday"><i class="fa-solid fa-cake-candles"></i></label>
                <input type="date" id='birthday'
                onChange={e=> setBirthday(e.target.value)} value={birthday}/>
            </div>

            <div className='form-button'>
            <button style={{background: 'lightgreen'}}>{userSelected !== null ? "Update": "Create"}</button>
            {userSelected !== null && <button onClick={deselectedUser} type="button" style={{background: 'lightgreen'}}>Clear</button>}
            </div>
        </form>
    );
};

export default UsersForm;