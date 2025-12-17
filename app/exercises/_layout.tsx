import { Stack } from "expo-router";

export default function ExercisesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0f172a" },
        headerTintColor: "#f1f5f9",
        contentStyle: { backgroundColor: "#0f172a" },
        headerBackTitle: "Home",
      }}
    >
      <Stack.Screen
        name="exercise1"
        options={{ title: "Exercise 1: Debug Crash" }}
      />
      <Stack.Screen
        name="exercise2"
        options={{ title: "Exercise 2: Type-Safe Component" }}
      />
      <Stack.Screen
        name="exercise3"
        options={{ title: "Exercise 3: Animation" }}
      />
      <Stack.Screen
        name="exercise4"
        options={{ title: "Exercise 4: Data Fetching" }}
      />
      <Stack.Screen
        name="exercise5"
        options={{ title: "Exercise 5: Performance" }}
      />
      <Stack.Screen
        name="exercise6"
        options={{ title: "Exercise 6: Jest Testing" }}
      />
      <Stack.Screen
        name="exercise7"
        options={{ title: "Exercise 7: Design System" }}
      />
      <Stack.Screen
        name="exercise8"
        options={{ title: "Exercise 8: Component Variants" }}
      />
    </Stack>
  );
}
