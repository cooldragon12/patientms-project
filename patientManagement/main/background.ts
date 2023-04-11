const { spawn } = require('child_process');
import { app } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1280,
    height: 780,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    // mainWindow.webContents.openDevTools();
  }
})();

// // Start the Django server as a subprocess
// const djangoServer = spawn('python', ['manage.py', 'runserver']);

// // Handle output from the Django server
// djangoServer.stdout.on('data', (data) => {
//   console.log(`Django server output: ${data}`);
// });

// djangoServer.stderr.on('data', (data) => {
//   console.error(`Django server error: ${data}`);
// });

// // Handle Django server exit
// djangoServer.on('close', (code) => {
//   console.log(`Django server exited with code ${code}`);
// });
app.on('window-all-closed', () => {
  app.quit();
});
