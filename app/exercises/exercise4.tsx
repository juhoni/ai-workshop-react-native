/**
 * EXERCISE 4: Data Fetching with TanStack Query
 *
 * Implement a user profile screen with proper React Query v5 patterns.
 *
 * REQUIREMENTS:
 * - Fetch user data with automatic caching
 * - Implement optimistic updates for editing
 * - Handle loading and error states properly
 * - Use v5 syntax (not v3/v4!)
 *
 * YOUR STACK:
 * - @tanstack/react-query: 5.90.12
 * - React 19.1.0
 *
 * CAUTION: AI often mixes React Query v3/v4/v5 syntax!
 * - v3: useQuery('key', fetchFn)
 * - v4: useQuery(['key'], fetchFn)
 * - v5: useQuery({ queryKey: ['key'], queryFn: fetchFn })
 *
 * PROMPT EXAMPLE:
 * "Help me use TanStack Query 5.90 to fetch user data and implement
 * optimistic updates for a profile edit feature. Show me proper v5
 * syntax with queryKey objects and useMutation. Handle loading and
 * error states."
 */

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// =============================================================
// Mock API (simulates network delay)
// =============================================================

type User = {
  id: string;
  name: string;
  email: string;
  bio: string;
};

const mockUser: User = {
  id: "1",
  name: "Alex Johnson",
  email: "alex@example.com",
  bio: "Mobile developer who loves React Native",
};

async function fetchUser(userId: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { ...mockUser, id: userId };
}

async function updateUser(user: Partial<User> & { id: string }): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ...mockUser, ...user };
}

// =============================================================
// TODO: Implement with React Query v5!
// =============================================================

type ProfileViewProps = {
  userId: string;
};

function ProfileView({ userId }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");

  // =============================================================
  // TODO: Add useQuery to fetch user data
  // =============================================================
  //
  // HINTS:
  // - Use queryKey: ['user', userId] for proper caching
  // - Use queryFn: () => fetchUser(userId)
  // - Don't forget to destructure { data, isLoading, error }
  //
  // WRONG (v3): useQuery('user', fetchUser)
  // WRONG (v4): useQuery(['user'], fetchUser)
  // CORRECT (v5): useQuery({ queryKey: ['user'], queryFn: fetchUser })
  // =============================================================

  const user = undefined as User | undefined; // TODO: Get from useQuery
  const isLoading = false; // TODO: Get from useQuery
  const error = null as Error | null; // TODO: Get from useQuery

  // =============================================================
  // TODO: Add useMutation for optimistic updates
  // =============================================================
  //
  // HINTS:
  // - Use mutationFn: (newBio: string) => updateUser(...)
  // - Implement onMutate for optimistic update
  // - Use queryClient.setQueryData to update cache
  // - Handle onError to rollback on failure
  //
  // Ask AI about:
  // - How to get queryClient (useQueryClient hook)
  // - How to do optimistic updates in v5
  // - How to rollback on error
  // =============================================================

  const handleSave = () => {
    // TODO: Call mutation here
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (user) {
      setEditedBio(user.bio);
      setIsEditing(true);
    }
  };

  // =============================================================
  // Render logic
  // =============================================================

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ {error.message}</Text>
        <Text style={styles.errorHint}>
          (This is a mock error - check your query setup)
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No user data</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.bioSection}>
        <Text style={styles.bioLabel}>Bio:</Text>
        {isEditing ? (
          <TextInput
            style={styles.bioInput}
            value={editedBio}
            onChangeText={setEditedBio}
            multiline
            placeholder="Enter your bio..."
            placeholderTextColor="#64748b"
          />
        ) : (
          <Text style={styles.bioText}>{user.bio}</Text>
        )}
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <>
            <Pressable
              style={[styles.button, styles.buttonSecondary]}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonPrimary]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleEdit}
          >
            <Text style={styles.buttonText}>Edit Bio</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

// =============================================================
// Exercise Screen with QueryClient setup
// =============================================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5000,
    },
  },
});

export default function Exercise4Screen() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text style={styles.title}>Exercise 4: Data Fetching</Text>
        <Text style={styles.instructions}>
          Implement user profile fetching and editing{"\n"}
          using TanStack Query v5 with optimistic updates.
        </Text>

        <ProfileView userId="1" />

        {/* Hints */}
        <View style={styles.hints}>
          <Text style={styles.hintsTitle}>React Query v5 Reminders:</Text>
          <Text style={styles.hint}>
            • useQuery({"{"} queryKey, queryFn {"}"})
          </Text>
          <Text style={styles.hint}>
            • useMutation({"{"} mutationFn, onMutate, onError {"}"})
          </Text>
          <Text style={styles.hint}>
            • queryClient.setQueryData(key, updater)
          </Text>
          <Text style={styles.hint}>• Optimistic updates in onMutate</Text>
          <Text style={styles.hint}>• Rollback in onError</Text>
        </View>
      </View>
    </QueryClientProvider>
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
  profileCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f1f5f9",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 20,
  },
  bioSection: {
    width: "100%",
    marginBottom: 20,
  },
  bioLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  bioText: {
    fontSize: 16,
    color: "#f1f5f9",
    lineHeight: 24,
  },
  bioInput: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
    color: "#f1f5f9",
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#3b82f6",
  },
  buttonSecondary: {
    backgroundColor: "#475569",
  },
  buttonText: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "600",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  loadingText: {
    color: "#94a3b8",
    fontSize: 14,
    marginTop: 12,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  errorHint: {
    color: "#94a3b8",
    fontSize: 12,
  },
  emptyText: {
    color: "#64748b",
    fontSize: 14,
  },
  hints: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  hintsTitle: {
    fontSize: 14,
    color: "#f59e0b",
    fontWeight: "600",
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: "#94a3b8",
    fontFamily: "monospace",
    marginBottom: 4,
  },
});
