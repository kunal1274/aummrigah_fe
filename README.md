# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Steps followed to complete set up of vite react client

1.**Create a vite project** : Create a folder and then run vite command
1.1.**Create a vite project within the same folder** :

```bash
md client
```

To run vite command within the directory, first navigate to that directory

```bash
cd client
```

```bash
npm create vite@latest ./ -- --template react
```

1.2.**Create a vite project which will create a new project** :

```bash
npm create vite@latest ./client -- --template react
```

```bash
cd client
```

2.**To Log in to git hub** :

```bash
gh auth login
```

It will ask some questions and you can answer the below :

```
? What account do you want to log into? GitHub.com
? What is your preferred protocol for Git operations on this host? HTTPS
? Authenticate Git with your GitHub credentials? Yes
? How would you like to authenticate GitHub CLI? Login with a web browser
```

and then

```
! First copy your one-time code: 1550-1F7E
Press Enter to open github.com in your browser...
✓ Authentication complete.
- gh config set -h github.com git_protocol https
✓ Configured git protocol
✓ Logged in as kunal1274
! You were already logged in to this account
```

3.**Create the repo remotely** : We will use git hub cli to create the repo -

```bash
gh repo create aummrigah_fe --public --source=. --remote=origin
```

4.**push the git hub repository** : Let's push the initial

```bash
git branch -m "master"
```

```bash
git add .
```

```bash
git commit -m "This is my initial commit"
```

```bash
git push -u origin master
```

5.**Install and run the vite** :

```bash
npm install
```

```bash
npm run dev
```
