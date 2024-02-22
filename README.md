# contact-management-system


A simple contact management web application with CRUD operations developed in Django and React Js

Requirements
Make sure you have python and Node js installed on your system:

Project Setup
Clone the repository in a local folder
git clone https://github.com/SajalBasak/contact-management-system.git
Open terminal and verify python version
  python --version
Verify if node and npm are installed
  node --version
  npm -version
Setup Backend
Nvaigate to cloned project directory
  cd smwa-project
Create a python virtual environment for backend
  python3 -m venv myvenv
Activate the virtual environment
# For winodws
  myvenv\Scripts\activate
# For linux
  source myvenv/bin/activate
Install python libraries
 cd backend
 pip install -r requirements.txt
Start Django server
 python manage.py runserver
Django backend server will start on http://localhost:8000/
Setup Frontend
Open a new terminal and navigate to frontend directory
 cd smwa-project/frontend
Install frontend libraries using npm
 npm install
Start Node server
 npm start
Once node is started you can access the application on http://localhost:3000/
