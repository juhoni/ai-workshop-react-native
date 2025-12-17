/**
 * EXERCISE 8: Component Variants & Accessibility Patterns
 *
 * Design a versatile Button component with multiple variants, sizes,
 * and full accessibility support using AI assistance.
 *
 * GOALS:
 * - Create a flexible component API with variants and sizes
 * - Implement proper accessibility (ARIA, focus, keyboard navigation)
 * - Generate comprehensive component documentation
 * - Learn design-to-code workflows with AI
 *
 * DESIGNER WORKFLOW ENHANCEMENTS:
 * - Describe component behavior in plain language → Get production code
 * - Generate all variants from design specs automatically
 * - Ensure accessibility without deep technical knowledge
 * - Auto-generate component documentation for design systems
 * - Quickly prototype and iterate on component APIs
 *
 * YOUR STACK:
 * - React Native 0.81.5
 * - TypeScript 5.9.3
 *
 * PROMPT EXAMPLES:
 * "Create a Button component with variants: primary, secondary, outline,
 * ghost. Sizes: small, medium, large. States: default, hover, pressed,
 * disabled, loading. Include proper accessibility with role, accessible
 * label, disabled state. Add haptic feedback on press. TypeScript."
 *
 * "Generate a Card component with variants: elevated, outlined, filled.
 * Support optional header, content, and footer sections. Make it
 * accessible for screen readers. Add proper TypeScript types."
 *
 * "I need an Input component with variants for text, email, password.
 * Include label, error message, helper text, and character count.
 * Full accessibility with proper focus management and ARIA labels."
 */

import { useState } from "react";
import type { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as Haptics from "expo-haptics";

// =============================================================
// TODO: Create a production-ready Button component with AI
// =============================================================
//
// Ask AI to generate a Button component with:
// - Variants: primary, secondary, outline, ghost, danger
// - Sizes: sm, md, lg
// - States: default, pressed, disabled, loading
// - Full accessibility support
// - Optional icons (left/right)
// - Haptic feedback
// - Proper TypeScript types
//
// =============================================================

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

// STARTER: Basic button without full variant support
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  leftIcon,
  rightIcon,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  // =============================================================
  // TODO: Ask AI to generate proper style variants
  // =============================================================
  //
  // Current implementation is minimal. Ask AI to:
  // 1. Generate complete style variants (primary, secondary, etc.)
  // 2. Create size variants with proper padding and font sizes
  // 3. Handle disabled and loading states visually
  // 4. Add pressed state styling
  // 5. Support icon positioning
  //
  // =============================================================

  const handlePress = async () => {
    if (disabled || loading || !onPress) return;

    // Add haptic feedback for better UX
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {
      // Haptics not available
    }

    onPress();
  };

  // Basic variant styles - TODO: Expand with AI
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return { backgroundColor: "#6366f1", color: "#ffffff" };
      case "secondary":
        return { backgroundColor: "#8b5cf6", color: "#ffffff" };
      case "outline":
        return { backgroundColor: "transparent", borderColor: "#6366f1", borderWidth: 2, color: "#6366f1" };
      case "ghost":
        return { backgroundColor: "transparent", color: "#6366f1" };
      case "danger":
        return { backgroundColor: "#ef4444", color: "#ffffff" };
      default:
        return { backgroundColor: "#6366f1", color: "#ffffff" };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 };
      case "md":
        return { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 };
      case "lg":
        return { paddingVertical: 16, paddingHorizontal: 32, fontSize: 18 };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || children}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth,
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          opacity: pressed ? 0.8 : 1,
        },
        disabled && styles.buttonDisabled,
        fullWidth && styles.buttonFullWidth,
      ]}
    >
      <View style={styles.buttonContent}>
        {loading && (
          <ActivityIndicator
            size="small"
            color={variantStyles.color}
            style={styles.buttonLoader}
          />
        )}
        {!loading && leftIcon && (
          <Text style={[styles.buttonIcon, { color: variantStyles.color }]}>
            {leftIcon}
          </Text>
        )}
        <Text
          style={[
            styles.buttonText,
            { color: variantStyles.color, fontSize: sizeStyles.fontSize },
          ]}
        >
          {children}
        </Text>
        {!loading && rightIcon && (
          <Text style={[styles.buttonIcon, { color: variantStyles.color }]}>
            {rightIcon}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

// =============================================================
// TODO: Create an accessible Input component with AI
// =============================================================
//
// Ask AI to generate an Input component with:
// - Label, helper text, error message support
// - Character count
// - Required field indicator
// - Proper focus states
// - Full accessibility (ARIA labels, error announcements)
// - Different input types (text, email, password, number)
//
// =============================================================

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  disabled?: boolean;
};

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  helperText,
  errorMessage,
  required = false,
  maxLength,
  showCharCount = false,
  disabled = false,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!errorMessage;

  return (
    <View style={styles.inputContainer}>
      {/* Label */}
      <View style={styles.labelRow}>
        <Text style={styles.inputLabel}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        {showCharCount && maxLength && (
          <Text style={styles.charCount}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>

      {/* Input Field */}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          disabled && styles.inputDisabled,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
        editable={!disabled}
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={helperText}
      />

      {/* Helper Text or Error Message */}
      {helperText && !hasError && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      {hasError && (
        <Text
          style={styles.errorText}
          accessible={true}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

// =============================================================
// TODO: Create a Card component with AI
// =============================================================
//
// Ask AI for a Card component with:
// - Variants: elevated, outlined, filled
// - Optional sections: header, content, footer
// - Proper semantic structure for screen readers
// - Pressable variant for interactive cards
// - Loading state
//
// =============================================================

type CardVariant = "elevated" | "outlined" | "filled";

type CardProps = {
  variant?: CardVariant;
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
};

function Card({
  variant = "elevated",
  header,
  children,
  footer,
  onPress,
  accessibilityLabel,
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return {
          backgroundColor: "#1e293b",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 4,
        };
      case "outlined":
        return {
          backgroundColor: "#1e293b",
          borderWidth: 1,
          borderColor: "#334155",
        };
      case "filled":
        return {
          backgroundColor: "#334155",
        };
    }
  };

  const content = (
    <View style={[styles.card, getVariantStyles()]}>
      {header && <View style={styles.cardHeader}>{header}</View>}
      <View style={styles.cardContent}>{children}</View>
      {footer && <View style={styles.cardFooter}>{footer}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

// =============================================================
// Demo Screen
// =============================================================

export default function Exercise8Screen() {
  const [inputValue, setInputValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate email
    if (!emailValue.includes("@")) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Exercise 8: Component Variants</Text>
        <Text style={styles.subtitle}>
          Design flexible, accessible components with AI assistance
        </Text>

        {/* Button Variants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Button Component</Text>
          <Text style={styles.hint}>
            Ask AI to generate all variants and states
          </Text>

          <View style={styles.componentGrid}>
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </View>

          <View style={styles.componentGrid}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </View>

          <View style={styles.componentGrid}>
            <Button leftIcon="→">With Icon</Button>
            <Button rightIcon="✓">Success</Button>
            <Button loading>Loading...</Button>
            <Button disabled>Disabled</Button>
          </View>
        </View>

        {/* Input Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Component</Text>
          <Text style={styles.hint}>
            Full accessibility with labels, errors, and hints
          </Text>

          <Input
            label="Name"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter your name"
            helperText="This will be displayed on your profile"
            required
            maxLength={50}
            showCharCount
          />

          <Input
            label="Email"
            value={emailValue}
            onChangeText={setEmailValue}
            placeholder="you@example.com"
            errorMessage={emailError}
            required
          />
        </View>

        {/* Card Component */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Component</Text>
          <Text style={styles.hint}>Multiple variants and layouts</Text>

          <Card
            variant="elevated"
            header={<Text style={styles.cardTitle}>Elevated Card</Text>}
            footer={
              <Button variant="primary" size="sm" fullWidth>
                Action
              </Button>
            }
          >
            <Text style={styles.cardText}>
              This card has elevation shadow for depth
            </Text>
          </Card>

          <Card
            variant="outlined"
            header={<Text style={styles.cardTitle}>Outlined Card</Text>}
          >
            <Text style={styles.cardText}>
              This card uses a border instead of shadow
            </Text>
          </Card>

          <Card
            variant="filled"
            onPress={() => {}}
            accessibilityLabel="Interactive card, double tap to open"
          >
            <Text style={styles.cardText}>
              This card is pressable and filled
            </Text>
          </Card>
        </View>

        {/* Form Example */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Complete Form Example</Text>
          <Text style={styles.hint}>
            All components working together with accessibility
          </Text>

          <Card variant="elevated">
            <View style={styles.formContent}>
              <Input
                label="Full Name"
                value={inputValue}
                onChangeText={setInputValue}
                required
              />
              <Input
                label="Email Address"
                value={emailValue}
                onChangeText={setEmailValue}
                errorMessage={emailError}
                required
              />
              <Button
                variant="primary"
                fullWidth
                loading={loading}
                onPress={handleSubmit}
                accessibilityHint="Submit the form"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </View>
          </Card>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Designer Workflow with AI:</Text>
          <Text style={styles.instructionItem}>
            • Describe component behavior in natural language
          </Text>
          <Text style={styles.instructionItem}>
            • Get production-ready code with all variants
          </Text>
          <Text style={styles.instructionItem}>
            • Accessibility built-in without deep expertise
          </Text>
          <Text style={styles.instructionItem}>
            • Iterate quickly on component APIs
          </Text>
          <Text style={styles.instructionItem}>
            • Generate Storybook/documentation automatically
          </Text>
          <Text style={styles.instructionItem}>
            • Export design tokens to code seamlessly
          </Text>
        </View>

        <View style={styles.challengeBox}>
          <Text style={styles.challengeTitle}>Your Challenge:</Text>
          <Text style={styles.challengeText}>
            1. Extend the Button component with more variants (link, icon-only)
          </Text>
          <Text style={styles.challengeText}>
            2. Add a Select/Dropdown component with keyboard navigation
          </Text>
          <Text style={styles.challengeText}>
            3. Create a Toast/Notification component with auto-dismiss
          </Text>
          <Text style={styles.challengeText}>
            4. Build a Modal component with focus trap
          </Text>
          <Text style={styles.challengeText}>
            5. Use AI to generate comprehensive PropTypes documentation
          </Text>
        </View>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 16,
    fontStyle: "italic",
  },
  componentGrid: {
    gap: 12,
    marginBottom: 16,
  },

  // Button Styles
  button: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFullWidth: {
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    fontWeight: "600",
  },
  buttonIcon: {
    fontSize: 16,
  },
  buttonLoader: {
    marginRight: 8,
  },

  // Input Styles
  inputContainer: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f1f5f9",
  },
  required: {
    color: "#ef4444",
  },
  charCount: {
    fontSize: 12,
    color: "#64748b",
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 2,
    borderColor: "#334155",
    borderRadius: 8,
    padding: 12,
    color: "#f1f5f9",
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#6366f1",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: "#1e293b",
  },
  helperText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#ef4444",
    marginTop: 4,
  },

  // Card Styles
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  cardContent: {
    padding: 16,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  cardText: {
    fontSize: 14,
    color: "#cbd5e1",
    lineHeight: 20,
  },

  // Form
  formContent: {
    gap: 8,
  },

  // Instructions
  instructions: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 12,
  },
  instructionItem: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },

  // Challenge
  challengeBox: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#f1f5f9",
    marginBottom: 12,
  },
  challengeText: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
});
