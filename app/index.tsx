import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Workshop Exercises</Text>
      <Text style={styles.subtitle}>
        React Native 0.81 • Expo 54 • Reanimated 4.1
      </Text>

      <View style={styles.exercises}>
        <Link href="/exercises/exercise1" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardNumber}>01</Text>
            <Text style={styles.cardTitle}>Debug Crash</Text>
            <Text style={styles.cardDesc}>Material Top Tabs on Android</Text>
          </Pressable>
        </Link>

        <Link href="/exercises/exercise2" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardNumber}>02</Text>
            <Text style={styles.cardTitle}>Type-Safe Component</Text>
            <Text style={styles.cardDesc}>Mutually exclusive props</Text>
          </Pressable>
        </Link>

        <Link href="/exercises/exercise3" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardNumber}>03</Text>
            <Text style={styles.cardTitle}>Reanimated Animation</Text>
            <Text style={styles.cardDesc}>Pull-to-refresh indicator</Text>
          </Pressable>
        </Link>

        <Link href="/exercises/exercise4" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardNumber}>04</Text>
            <Text style={styles.cardTitle}>Data Fetching</Text>
            <Text style={styles.cardDesc}>TanStack Query v5 patterns</Text>
          </Pressable>
        </Link>

        <Link href="/exercises/exercise5" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardNumber}>05</Text>
            <Text style={styles.cardTitle}>Performance Review</Text>
            <Text style={styles.cardDesc}>When to optimize vs premature optimization</Text>
          </Pressable>
        </Link>

        <Link href="/exercises/exercise6" asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardNumber}>06</Text>
            <Text style={styles.cardTitle}>Jest Testing</Text>
            <Text style={styles.cardDesc}>Find edge cases in financial calculations</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    padding: 24,
    paddingBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    marginBottom: 32,
  },
  exercises: {
    gap: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  cardNumber: {
    fontSize: 12,
    color: "#3b82f6",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginTop: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#94a3b8",
    marginTop: 4,
  },
});
