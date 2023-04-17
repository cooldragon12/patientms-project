import { spawn, CommonSpawnOptions } from "child_process";

const backgroundServer = (__dirname:string="")=>{
    // Start the virtual environement
    const venv = spawn('cmd', ['/c', 'venv\\Scripts\\activate.bat'], { shell: true });
    const djangoServer = spawn('python', [__dirname + 'manage.py', 'runserver']);
    
      // Handle output from the Django server
      djangoServer.stdout.on('data', (data) => {
        console.log(`Django server output: ${data}`);
      });
      
      djangoServer.stderr.on('data', (data) => {
        console.error(`Django server: ${data}`);
      });
      
      // Handle Django server exit
      djangoServer.on('close', (code) => {
        console.log(`Django server exited with code ${code}`);
      });
}


export default backgroundServer;

