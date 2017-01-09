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
    screensaver () {
      return 'rundll32 user32.dll,LockWorkStation'
    },
    lock () {
      return 'rundll32 user32.dll,LockWorkStation'
    },
    shutdown () {
      return 'shutdown -s'
    },
    logout () {
      return 'shutdown -l'
    },
    restart () {
      return 'shutdown -r'
    }
  },
  linux: {
    screensaver () {
      return 'dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.SetActive boolean:true'
    },
    lock () {
      return 'dbus-send --type=method_call --dest=org.gnome.ScreenSaver /org/gnome/ScreenSaver org.gnome.ScreenSaver.Lock'
    },
    shutdown () {
      return 'systemctl poweroff'
    },
    logout () {
      return 'logout'
    },
    restart () {
      return 'systemctl reboot'
    }
  },
  mac: {
    screensaver () {
      return 'open -a /System/Library/Frameworks/ScreenSaver.framework/Versions/A/Resources/ScreenSaverEngine.app'
    },
    lock () {
      return 'pmset displaysleepnow'
    },
    shutdown () {
      return 'osascript -e \'tell app "System Events" to shut down\''
    },
    logout () {
      return 'osascript -e \'tell application "System Events" to log out\''
    },
    restart () {
      return 'osascript -e \'tell app "System Events" to restart\''
    }
  }
}

module.exports = (pluginContext) => {
  return (command) => {
    return new Promise((resolve, reject) => {
      exec(commands[os][command](), resolve)
    })
  }
}
