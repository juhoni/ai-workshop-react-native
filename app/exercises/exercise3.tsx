/**
 * EXERCISE 3: Reanimated Animation
 *
 * Create a pull-to-refresh indicator with Reanimated 4.
 *
 * REQUIREMENTS:
 * - Scale based on pull progress (0 to 1)
 * - Rotate continuously while refreshing
 * - Use spring physics for smooth animations
 * - Proper v4 syntax (not v2/v3!)
 *
 * YOUR STACK:
 * - react-native-reanimated: 4.1.5
 * - react-native-gesture-handler: 2.29.1
 *
 * CAUTION: AI often mixes Reanimated v2/v3/v4 syntax!
 * - v2: Animated.timing().start()
 * - v4: value.value = withTiming()
 *
 * PROMPT EXAMPLE:
 * "Create a pull-to-refresh indicator using Reanimated 4.1.5.
 * It should scale based on pullProgress (0-1) and rotate
 * continuously when isRefreshing is true. Use withSpring
 * and withRepeat. Show me v4 syntax only."
 */

import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
} from "react-native-reanimated";

// =============================================================
// TODO: Implement these animations with AI's help!
// =============================================================

type RefreshIndicatorProps = {
  pullProgress: number; // 0 to 1
  isRefreshing: boolean;
};

function RefreshIndicator({ pullProgress, isRefreshing }: RefreshIndicatorProps) {
  // Shared values for animations
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);

  // =============================================================
  // TODO: Add useEffect to handle animation state changes
  // =============================================================
  //
  // When pullProgress changes:
  //   - Update scale with spring animation
  //
  // When isRefreshing becomes true:
  //   - Start continuous rotation with withRepeat
  //
  // When isRefreshing becomes false:
  //   - Stop rotation, reset to 0
  //
  // HINT: Ask AI about useAnimatedReaction or regular useEffect
  // =============================================================

  // =============================================================
  // TODO: Create animated styles
  // =============================================================

  const animatedStyle = useAnimatedStyle(() => {
    // TODO: Return transform with scale and rotation
    // HINT: rotation.value is in degrees, convert to string with 'deg'
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <View style={styles.indicatorContainer}>
      <Animated.View style={[styles.indicator, animatedStyle]}>
        <View style={styles.indicatorInner}>
          <Text style={styles.indicatorIcon}>↻</Text>
        </View>
      </Animated.View>
    </View>
  );
}

// =============================================================
// Exercise Screen with controls
// =============================================================

export default function Exercise3Screen() {
  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false);
      setPullProgress(0);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise 3: Animation</Text>
      <Text style={styles.instructions}>
        Implement the RefreshIndicator animations{"\n"}
        using Reanimated 4.1.5 syntax.
      </Text>

      {/* Preview */}
      <View style={styles.preview}>
        <RefreshIndicator
          pullProgress={pullProgress}
          isRefreshing={isRefreshing}
        />
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <Text style={styles.controlLabel}>
          Pull Progress: {(pullProgress * 100).toFixed(0)}%
        </Text>
        <View style={styles.slider}>
          {[0, 0.25, 0.5, 0.75, 1].map((value) => (
            <Pressable
              key={value}
              style={[
                styles.sliderButton,
                pullProgress === value && styles.sliderButtonActive,
              ]}
              onPress={() => setPullProgress(value)}
            >
              <Text
                style={[
                  styles.sliderButtonText,
                  pullProgress === value && styles.sliderButtonTextActive,
                ]}
              >
                {(value * 100).toFixed(0)}%
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            styles.refreshButton,
            isRefreshing && styles.refreshButtonActive,
          ]}
          onPress={handleRefresh}
          disabled={isRefreshing}
        >
          <Text style={styles.refreshButtonText}>
            {isRefreshing ? "Refreshing..." : "Start Refresh"}
          </Text>
        </Pressable>
      </View>

      {/* Hints */}
      <View style={styles.hints}>
        <Text style={styles.hintsTitle}>Reanimated v4 Syntax Reminders:</Text>
        <Text style={styles.hint}>• useSharedValue(initialValue)</Text>
        <Text style={styles.hint}>• value.value = withSpring(target)</Text>
        <Text style={styles.hint}>• withRepeat(animation, -1) for infinite</Text>
        <Text style={styles.hint}>• useAnimatedStyle(() =&gt; ({"{...}"}))</Text>
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
  preview: {
    height: 150,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  indicatorContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorIcon: {
    fontSize: 24,
    color: "#3b82f6",
  },
  controls: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  controlLabel: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 12,
  },
  slider: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  sliderButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: "#0f172a",
    alignItems: "center",
  },
  sliderButtonActive: {
    backgroundColor: "#3b82f6",
  },
  sliderButtonText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
  sliderButtonTextActive: {
    color: "#f1f5f9",
  },
  refreshButton: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  refreshButtonActive: {
    backgroundColor: "#64748b",
  },
  refreshButtonText: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "600",
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
