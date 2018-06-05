const emptyTrash = require('empty-trash')
const exec = require('child_process').exec

let os

// 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
if (process.platform === 'win32') {
  os = 'windows'
} else if (process.platform === 'darwin') {
  os = 'mac'
} else {
  os = 'linux'
}

let commands = {
  windows: {
    screensaver (resolve) {
      exec('rundll32 user32.dll,LockWorkStation', resolve)
    },
    lock (resolve) {
      exec('rundll32 user32.dll,LockWorkStation', resolve)
    },
    shutdown (resolve) {
      exec('shutdown -s', resolve)
    },
    logout (resolve) {
      exec('shutdown -l', resolve)
    },
    restart (resolve) {
      exec('shutdown -r', resolve)
    },
    emptytrash (resolve) {
      emptyTrash().then(() => {
        resolve('Trash Emptied');
      })
    }
  },
  linux: {
    screensaver (resolve) {
      exec('gnome-screensaver-command -a', resolve)
    },
    lock (resolve) {
      exec('gnome-screensaver-command -l', resolve)
    },
    shutdown (resolve) {
      exec('systemctl poweroff', resolve)
    },
    logout (resolve) {
      exec('logout', resolve)
    },
    restart (resolve) {
      exec('systemctl reboot', resolve)
    },
    emptytrash (resolve) {
      emptyTrash().then(() => {
        resolve('Trash Emptied');
      })
    }
  },
  mac: {
    screensaver (resolve) {
      exec('open -a ScreenSaverEngine.app', resolve)
    },
    lock (resolve) {
      exec('/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend', resolve)
    },
    shutdown (resolve) {
      exec('osascript -e \'tell app "System Events" to shut down\'', resolve)
    },
    logout (resolve) {
      exec('osascript -e \'tell application "System Events" to log out\'', resolve)
    },
    restart (resolve) {
      exec('osascript -e \'tell app "System Events" to restart\'', resolve)
    },
    emptytrash (resolve) {
      emptyTrash().then(() => {
        resolve('Trash Emptied');
      })
    }
  }
}

module.exports = (pluginContext) => {
  return (command) => {
    return new Promise((resolve, reject) => {
      commands[os][command](resolve)
    })
  }
}
