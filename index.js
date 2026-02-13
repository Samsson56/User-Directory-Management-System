let form=document.querySelector('form')
let submitButton=document.querySelector('button')
let input=document.querySelector('input')
let userList=document.querySelector('section')

let getUsers=async () => {
    let response = await fetch('http://localhost:3000/user');
    let finalUsers=await response.json()

    finalUsers.map(user => {
        let container = document.createElement('aside')
        let name= document.createElement('p')
        let deleteButton = document.createElement('button')
        let editButton = document.createElement('button')
        let buttonsContainer = document.createElement('div')

        //add content to elements
        name.innerHTML = user.name
        deleteButton.innerHTML = 'Delete'
        editButton.innerHTML='Edit'

        //1.Adding events
        deleteButton.addEventListener('click',() => {
            deleteUser(user.id)
        })

        editButton.addEventListener('click',()=>{
            editUser(user);
        })

        //appending elements to UI
        buttonsContainer.append(editButton,deleteButton)
        container.append(name,buttonsContainer)
        userList.append(container)
    })
}
getUsers()

//Create User
let createUser = async () => {
    await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({name:input.value})
    });
}
submitButton.addEventListener('click',()=>{
    createUser()
})

//Delete User
let deleteUser = async (id) => {
    await fetch(`http://localhost:3000/user/${id}`, {
        method: 'DELETE'
    })
}

//Edit User
let editUser = (value) => {
    input.value = value.name

    let updateButton = document.createElement('button')
    updateButton.innerHTML = 'update'

    updateButton.addEventListener('click', ()=> {
        updateUser(value.id)
    })

    form.replaceChild(updateButton, submitButton)
}

let updateUser = async (id) => {
    await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'applicattion/json'
        },
        body: JSON.stringify({name: input.value})
    })
}