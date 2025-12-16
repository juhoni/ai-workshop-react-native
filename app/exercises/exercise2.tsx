/**
 * EXERCISE 2: Type-Safe Component Design
 *
 * Create a SmartList component with mutually exclusive props.
 * It should accept EITHER:
 *   - data + renderItem (like FlatList)
 *   - OR children (for static content)
 *   - NEVER both at the same time
 *
 * GOALS:
 * - Ask AI to help with discriminated unions
 * - Learn about the `never` type
 * - Verify TypeScript catches invalid usage
 *
 * YOUR STACK:
 * - TypeScript 5.9.3
 * - React Native 0.81.5
 *
 * PROMPT EXAMPLE:
 * "Help me create TypeScript types for a React Native component
 * that accepts either (data + renderItem) OR children, but never
 * both. Use discriminated unions. TypeScript 5.9."
 */

import { View, Text, StyleSheet, FlatList } from "react-native";
import type { ReactNode } from "react";

// =============================================================
// TODO: Define your types here with AI's help!
// =============================================================

// STARTER: This allows both - but we want mutual exclusivity!
type SmartListProps<T> = {
  data?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  children?: ReactNode;
};

// GOAL: Make these types so that:
// 1. <SmartList data={items} renderItem={...} /> ✅ works
// 2. <SmartList>{children}</SmartList> ✅ works
// 3. <SmartList data={items}>{children}</SmartList> ❌ TypeScript error!

// =============================================================
// Component implementation (update after fixing types)
// =============================================================

function SmartList<T>(props: SmartListProps<T>) {
  // TODO: Update this logic once you have proper types
  if (props.data && props.renderItem) {
    return (
      <FlatList
        data={props.data}
        renderItem={({ item, index }) => (
          <View>{props.renderItem!(item, index)}</View>
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    );
  }

  if (props.children) {
    return <View style={styles.childrenContainer}>{props.children}</View>;
  }

  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No content</Text>
    </View>
  );
}

// =============================================================
// Exercise Screen
// =============================================================

type Item = {
  id: string;
  title: string;
};

const sampleData: Item[] = [
  { id: "1", title: "First Item" },
  { id: "2", title: "Second Item" },
  { id: "3", title: "Third Item" },
];

export default function Exercise2Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise 2: Type-Safe Props</Text>
      <Text style={styles.instructions}>
        Fix the SmartList types so TypeScript{"\n"}
        catches invalid prop combinations.
      </Text>

      {/* ✅ This should work: data + renderItem */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With data + renderItem:</Text>
        <SmartList
          data={sampleData}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          )}
        />
      </View>

      {/* ✅ This should work: children only */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With children:</Text>
        <SmartList>
          <View style={styles.item}>
            <Text style={styles.itemText}>Static Child 1</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Static Child 2</Text>
          </View>
        </SmartList>
      </View>

      {/* ❌ This should show TypeScript error after fixing types! */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Invalid (should error):</Text>
        <SmartList
          data={sampleData}
          renderItem={(item) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          )}
        >
          <Text style={styles.itemText}>This should cause TS error!</Text>
        </SmartList>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "600",
    marginBottom: 8,
  },
  listContent: {
    gap: 8,
  },
  childrenContainer: {
    gap: 8,
  },
  item: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 8,
  },
  itemText: {
    color: "#f1f5f9",
    fontSize: 16,
  },
  empty: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  emptyText: {
    color: "#64748b",
    fontSize: 14,
  },
});
