export const handleRegister = async (username, email, password, navigate) => {
   
    //Logic to send registration request to your backend 
    try{
        const response = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST', // used to specify the method, POST 
            headers:{
                'Content-Type': 'application/json', // used to tell the backend/server is in json format
            },
            body: JSON.stringify({username, email, password}), // the data for the reques 
        });

        const data = await response.json(); // get the response from the backend and places it into the data variable

        if(response.ok){ // if the response is okay, then navigate to the login page for the user to login
            navigate('/login') // if the user has been registered succesfully, navigate to the login page 
        }else{
            // handle error
            alert(data.message || 'Registration Failed'); // shows an alert that the response is an error
        }

    }catch(error){
        console.error('Registration error:', error);
        alert('An error occurred. Please try again later.');
    }
}; 


export const handleLogin = async (username, password, navigate) =>{
    // login 
    try{
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({username, password}),

        }); 

        const data = await response.json(); 

        if (response.ok){
             // Store token and username in localStorage
             localStorage.setItem('token', data.token);
             localStorage.setItem('username', username);
            navigate('/home')
        }else{
            alert(data.message || "Login Failed")
        }
    }catch(error){
        console.error('Registration error:', error);
        alert("An error occurred. Please try again later."); 
    }

}


export const handleLogout = (navigate) => {
    // Remove token and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Redirect to login page
    navigate('/login');
};

