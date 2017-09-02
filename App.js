import React from 'react';
import { StyleSheet, Text, View, PushNotificationIOS, AlertIOS } from 'react-native';

export default class App extends React.Component {
  componentWillMount() {
    PushNotificationIOS.requestPermissions();

    PushNotificationIOS.addEventListener('localNotification',
      (notification) => AlertIOS.alert("Got local notifcation!", notification.getMessage()));

    PushNotificationIOS.scheduleLocalNotification({
      fireDate: new Date(Date.now() + (3 * 1000)),
      alertBody: 'Hi Notification'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Very simple push notification demo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
