/**
 * EXERCISE 1: Debug a Real Crash
 *
 * This Material Top Tabs setup crashes on Android.
 * Use AI to diagnose and fix it!
 *
 * GOALS:
 * - Practice providing context to AI (error messages, versions)
 * - Ask follow-up questions
 * - Verify the solution against official docs
 *
 * HINT: The crash is related to missing peer dependencies
 * that Material Top Tabs requires on Android.
 *
 * YOUR STACK:
 * - expo-router: 6.0.17
 * - @react-navigation/material-top-tabs: 7.4.8
 * - react-native-pager-view: 6.9.1
 * - react-native-gesture-handler: 2.29.1
 */

import { View, Text, StyleSheet, Platform } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

// Simple screen components
function FeedScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Feed Content</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Profile Content</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Notifications Content</Text>
    </View>
  );
}

/**
 * TODO: This crashes on Android!
 *
 * Error you might see:
 * "ViewManagerResolver returned null for either..."
 * or
 * "requireNativeComponent: 'RNCViewPager' was not found..."
 *
 * Ask AI: "I'm using @react-navigation/material-top-tabs 7.4.8
 * with Expo 54 and it crashes on Android with [paste error].
 * What's missing?"
 */
export default function Exercise1Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise 1: Debug This!</Text>
      <Text style={styles.instructions}>
        The Tab.Navigator below crashes on Android.{"\n"}
        Use AI to find and fix the issue.
      </Text>

      <View style={styles.tabContainer}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: "#1e293b" },
              tabBarLabelStyle: { color: "#f1f5f9", fontWeight: "600" },
              tabBarIndicatorStyle: { backgroundColor: "#3b82f6" },
            }}
          >
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 24,
    lineHeight: 20,
  },
  tabContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  screen: {
    flex: 1,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#f1f5f9",
  },
});
