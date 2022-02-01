document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dog-form')
    const tableBody = document.getElementById('table-body')
    
    const refreshDogList = () => {
        tableBody.innerHTML = ''
        fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
            dogs.forEach(dog => {
                renderDog(dog)
        });
    })
    }
    refreshDogList()

    const editDog = (dog) => {
        form.name.value = dog.name
        form.breed.value = dog.breed
        form.sex.value = dog.sex
        form.dataset.currentId = dog.id
    }

    const renderDog = (dog) => {
            let tr = document.createElement('tr')
            let tdName = document.createElement('td')
            let tdBreed = document.createElement('td')
            let tdSex = document.createElement('td')
            let tdEdit = document.createElement('td')
            let button = document.createElement('button')
            tdName.textContent = dog.name
            tdBreed.textContent = dog.breed
            tdSex.textContent = dog.sex
            button.textContent = 'Edit'
            button.addEventListener('click', () => editDog(dog))
            tr.dataset.id = dog.id
            tdEdit.appendChild(button)
            tableBody.appendChild(tr)
            tr.appendChild(tdName)
            tr.appendChild(tdBreed)
            tr.appendChild(tdSex)
            tr.appendChild(tdEdit)
    }


    const postDog = (e) => {
        debugger
        e.preventDefault()
        fetch(`http://localhost:3000/dogs/${form.dataset.currentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: form.name.value,
                breed: form.breed.value,
                sex: form.sex.value,   
            })
            })
            .then(res => res.json())
            .then(data => data)
        form.reset()
        setTimeout(() => {
            refreshDogList()
        }, 500)
    }
    form.addEventListener('submit', postDog)
})