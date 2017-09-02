This is just a quick demo for ios push functionality.
It's designed to be a quick and simple guide to setup push.
I'll document the steps including how this project was created.

## Prereqs
Pretty obvious probably but you need an [apple developer account](https://developer.apple.com/account/)

## Create project.
Either `react-native init` or `create-react-app` can be used.  
If you choose the later you must eject as there's no way currently to link a native library.

```
$ create-react-app pusher
$ cd pusher && yarn run eject
```

## Setup and link the push libraries
These instructions are on apple docs and [react-native docs](https://facebook.github.io/react-native/docs/pushnotificationios.html) but I'm listing the steps here to summarize. For details refer to the react-native doc.

#### 1. configure your notifications with Apple
1. Open pusher/ios/pusher.xcodeproj in XCode (I'm using 8.3.3 so what you see might vary).
    - If you see an xcode recommendation to update the project it's safe to do.
2. In Capabilities pane enable push notifications.
    - To get to this pane press `cmd+1` and on the left side of Info / Build Settings you will see a dropdown. Under targets choose `pusher`.
    - This is documented in apple docs but it's confusing if you aren't familiar with XCode
    - It will ask you to add and select your apple developer id.
    - If you see a red error icon, don't worry. We will get to this ... now
3. Click back on the general tab and change bundle.identifier to something unique/useful. Remember this you will need it for the next step.
4. Generate an [Universal Push Notification Client SSL Certificate](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW11).
    - The app id to pick is the one that matches the bundle id in step 3. (Don't worry about the prefix)
    - If no app id shows up make sure that in xcode under the general tab it properly signed your app after you changed the bundle id.
5. Install the cert to your push server.

#### 2. Setup the react-native project to do receive push notifications.
Follow the steps from react-native docs from [manually linking PushNotificationIOS](https://facebook.github.io/react-native/docs/pushnotificationios.html).  
The instructions are pretty simple so I won't repeat them here.

#### 3. Add PushNotificationIOS to your react-native app
For our example let's just change App.js
Import PushNotificationIOS from react-native. Should look like.
`import { StyleSheet, Text, View, PushNotificationIOS } from 'react-native';`

Let's add a `componentDidMount()` as
```
  componentDidMount() {
    PushNotificationIOS.requestPermissions();
  }
```

#### 4. Ok let's test the app.   
Shutdown whatever you might be running and rerun using `yarn run ios`.  
You should now see a notification asking to allow Notifications.  
If not something is wrong and make sure you followed every step above.  
Accept and keep it running. And we will move to the next step.

## Schedule a local notification.
Go back to your `componentDidMount()`

Add `AlertIOS` to your import from `react-native`
And add the following below the `requestPermissions`
```
    PushNotificationIOS.addEventListener('localNotification',
      (notification) => AlertIOS.alert("Got local notifcation!", notification.getMessage()));

    PushNotificationIOS.scheduleLocalNotification({
      fireDate: new Date(Date.now() + (3 * 1000)),
      alertBody: 'Hi Notification'
    });
```

If you go back to your simulator and wait 3 seconds and the notification doesn't appear then just shake the device and hit reload.
The alert window should appear after 3 seconds.

Now double click the home (shift-cmd-h twice) and kill the app.  
As soon as it appears hit the home again so that it goes to the background.
This time you should see the actual notification appear!
Clicking on it will bring you back to the app and you should see the alert appear again.

These alerts won't appear again unless you kill and reopen the app!