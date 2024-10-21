const form = document.querySelector('.form');

function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target); 

    const data = Object.fromEntries(formData); 

    console.log(data);
}

form.addEventListener('submit',handleSubmit);