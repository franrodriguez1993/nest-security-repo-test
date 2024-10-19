module.exports = {
  //Cada elemento del array es una aplicación que va a correr pm2
    apps : [{
      script: './dist/main.js',
      name:"mascotasApp",
      exec_mode:"cluster", //cluster o fork
      instances:4, //número de instancias (copias)
      watch: true,
      increment_var: 'PORT',
      env: {
        "PORT": 3000,
        "NODE_ENV": "development" 
      } 
    }]
  };
  
