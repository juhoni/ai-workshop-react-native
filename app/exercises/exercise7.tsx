/**
 * EXERCISE 7: AI-Powered Design System & Theme Generation
 *
 * Design a custom theme based on brand colors and generate a complete
 * design system with semantic tokens, color scales, and accessibility checks.
 *
 * GOALS:
 * - Learn how AI can generate complete color palettes from a single brand color
 * - Create semantic design tokens (primary, secondary, success, error, etc.)
 * - Understand color accessibility (WCAG contrast ratios)
 * - Generate responsive spacing and typography scales
 *
 * DESIGNER WORKFLOW ENHANCEMENTS:
 * - Skip manual color palette generation
 * - Automated accessibility validation
 * - Instant design token documentation
 * - Generate design system from mood board colors
 *
 * YOUR STACK:
 * - React Native 0.81.5
 * - TypeScript 5.9.3
 *
 * PROMPT EXAMPLES:
 * "I have a brand color #6366f1 (indigo). Generate a complete design
 * system with primary, secondary, success, error, and warning color
 * scales (50-900 shades). Ensure all text colors meet WCAG AA standards
 * on their backgrounds. Also create a spacing scale (4px base) and
 * typography scale. Return as TypeScript constants."
 *
 * "Take these colors from my mood board: #FF6B6B, #4ECDC4, #FFE66D
 * and create a cohesive design system with proper contrast ratios."
 */

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";

// =============================================================
// TODO: Generate a complete design system with AI!
// =============================================================
//
// This starter has basic colors. Ask AI to:
// 1. Generate full color scales (50-900) from brand colors
// 2. Create semantic tokens (primary, success, error, etc.)
// 3. Validate WCAG contrast ratios
// 4. Generate spacing and typography scales
// 5. Add dark mode variants
//
// =============================================================

// STARTER THEME - Very basic!
const STARTER_THEME = {
  colors: {
    primary: "#3b82f6",
    background: "#0f172a",
    text: "#f1f5f9",
    border: "#1e293b",
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  typography: {
    h1: 24,
    body: 16,
    small: 14,
  },
};

// =============================================================
// TODO: Replace with AI-generated design system
// =============================================================
//
// GOAL STRUCTURE (ask AI to generate this):
//
// const DESIGN_SYSTEM = {
//   colors: {
//     primary: { 50: "...", 100: "...", ..., 900: "..." },
//     secondary: { ... },
//     success: { ... },
//     error: { ... },
//     warning: { ... },
//     neutral: { ... },
//   },
//   semantic: {
//     background: {
//       primary: "...",
//       secondary: "...",
//     },
//     text: {
//       primary: "...",
//       secondary: "...",
//       inverse: "...",
//     },
//     border: { ... },
//     interactive: {
//       default: "...",
//       hover: "...",
//       pressed: "...",
//       disabled: "...",
//     },
//   },
//   spacing: {
//     xs: 4,
//     sm: 8,
//     md: 16,
//     lg: 24,
//     xl: 32,
//     xxl: 48,
//   },
//   typography: {
//     h1: { size: 32, weight: "700", lineHeight: 40 },
//     h2: { size: 24, weight: "700", lineHeight: 32 },
//     h3: { size: 20, weight: "600", lineHeight: 28 },
//     body: { size: 16, weight: "400", lineHeight: 24 },
//     small: { size: 14, weight: "400", lineHeight: 20 },
//     caption: { size: 12, weight: "400", lineHeight: 16 },
//   },
//   borderRadius: {
//     sm: 4,
//     md: 8,
//     lg: 12,
//     xl: 16,
//     full: 9999,
//   },
//   shadows: {
//     sm: { ... },
//     md: { ... },
//     lg: { ... },
//   },
// };
//
// =============================================================

type ColorPaletteProps = {
  colorName: string;
  colorValue: string;
};

function ColorSwatch({ colorName, colorValue }: ColorPaletteProps) {
  return (
    <View style={styles.swatchContainer}>
      <View style={[styles.swatch, { backgroundColor: colorValue }]} />
      <View style={styles.swatchInfo}>
        <Text style={styles.swatchName}>{colorName}</Text>
        <Text style={styles.swatchValue}>{colorValue}</Text>
      </View>
    </View>
  );
}

type ContrastCheckerProps = {
  foreground: string;
  background: string;
  text: string;
};

function ContrastChecker({ foreground, background, text }: ContrastCheckerProps) {
  // =============================================================
  // TODO: Implement WCAG contrast ratio calculation with AI
  // =============================================================
  //
  // Ask AI: "Write a function to calculate WCAG contrast ratio
  // between two hex colors. Return the ratio and whether it
  // meets AA (4.5:1) and AAA (7:1) standards for normal text."
  //
  // =============================================================

  const contrastRatio = "4.5"; // TODO: Calculate actual ratio
  const meetsAA = true; // TODO: Check if >= 4.5
  const meetsAAA = false; // TODO: Check if >= 7.0

  return (
    <View style={[styles.contrastBox, { backgroundColor: background }]}>
      <Text style={[styles.contrastText, { color: foreground }]}>{text}</Text>
      <View style={styles.contrastInfo}>
        <Text style={[styles.contrastLabel, { color: foreground }]}>
          Ratio: {contrastRatio}:1
        </Text>
        <Text style={[styles.contrastBadge, meetsAA && styles.contrastPass]}>
          {meetsAA ? "✓ AA" : "✗ AA"}
        </Text>
        <Text style={[styles.contrastBadge, meetsAAA && styles.contrastPass]}>
          {meetsAAA ? "✓ AAA" : "✗ AAA"}
        </Text>
      </View>
    </View>
  );
}

export default function Exercise7Screen() {
  const [brandColor, setBrandColor] = useState("#6366f1");
  const [generatedTheme, setGeneratedTheme] = useState(false);

  const handleGenerateTheme = () => {
    // =============================================================
    // TODO: Call AI to generate complete theme from brand color
    // =============================================================
    //
    // This is where you'd typically call an AI API or use
    // AI-generated code to create the design system.
    //
    // For this exercise, the focus is on learning to prompt
    // AI correctly to generate design tokens.
    //
    // =============================================================
    setGeneratedTheme(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Exercise 7: Design System</Text>
        <Text style={styles.subtitle}>
          Use AI to generate a complete design system from brand colors
        </Text>

        {/* Brand Color Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Input Brand Color</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.colorInput}
              value={brandColor}
              onChangeText={setBrandColor}
              placeholder="#6366f1"
              placeholderTextColor="#64748b"
              autoCapitalize="none"
            />
            <View style={[styles.colorPreview, { backgroundColor: brandColor }]} />
          </View>
          <Pressable style={styles.generateButton} onPress={handleGenerateTheme}>
            <Text style={styles.generateButtonText}>Generate Theme</Text>
          </Pressable>
        </View>

        {/* Color Palette Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Generated Color Palette</Text>
          <Text style={styles.hint}>
            Ask AI to generate scales: primary-50 through primary-900
          </Text>

          <View style={styles.swatchGrid}>
            <ColorSwatch colorName="Primary" colorValue="#6366f1" />
            <ColorSwatch colorName="Secondary" colorValue="#8b5cf6" />
            <ColorSwatch colorName="Success" colorValue="#10b981" />
            <ColorSwatch colorName="Error" colorValue="#ef4444" />
            <ColorSwatch colorName="Warning" colorValue="#f59e0b" />
            <ColorSwatch colorName="Neutral" colorValue="#64748b" />
          </View>

          {!generatedTheme && (
            <View style={styles.todoBox}>
              <Text style={styles.todoText}>
                👆 These are placeholder colors. Ask AI to generate full color
                scales with shades 50-900 for each semantic color!
              </Text>
            </View>
          )}
        </View>

        {/* Accessibility Check */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Accessibility Validation</Text>
          <Text style={styles.hint}>
            Ensure proper contrast ratios for readability
          </Text>

          <ContrastChecker
            foreground="#f1f5f9"
            background="#6366f1"
            text="Primary Button Text"
          />
          <ContrastChecker
            foreground="#ffffff"
            background="#10b981"
            text="Success Message"
          />
          <ContrastChecker
            foreground="#0f172a"
            background="#fbbf24"
            text="Warning Banner"
          />

          <View style={styles.todoBox}>
            <Text style={styles.todoText}>
              👆 Implement WCAG contrast calculation to automatically validate
              your color combinations!
            </Text>
          </View>
        </View>

        {/* Spacing Scale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Spacing System</Text>
          <Text style={styles.hint}>
            Base 4px scale: xs(4), sm(8), md(16), lg(24), xl(32), xxl(48)
          </Text>

          <View style={styles.spacingDemo}>
            {[4, 8, 16, 24, 32, 48].map((size) => (
              <View key={size} style={styles.spacingRow}>
                <Text style={styles.spacingLabel}>{size}px</Text>
                <View style={[styles.spacingBar, { width: size * 2 }]} />
              </View>
            ))}
          </View>
        </View>

        {/* Typography Scale */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Typography System</Text>
          <Text style={styles.hint}>Ask AI to generate type scales with sizes, weights, and line heights</Text>

          <View style={styles.typeDemo}>
            <Text style={[styles.typeExample, { fontSize: 32, fontWeight: "700" }]}>
              Heading 1 - 32px Bold
            </Text>
            <Text style={[styles.typeExample, { fontSize: 24, fontWeight: "700" }]}>
              Heading 2 - 24px Bold
            </Text>
            <Text style={[styles.typeExample, { fontSize: 16, fontWeight: "400" }]}>
              Body Text - 16px Regular
            </Text>
            <Text style={[styles.typeExample, { fontSize: 14, fontWeight: "400" }]}>
              Small Text - 14px Regular
            </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>How Designers Use AI:</Text>
          <Text style={styles.instructionItem}>
            • Input brand colors from mood boards
          </Text>
          <Text style={styles.instructionItem}>
            • Generate complete color scales automatically
          </Text>
          <Text style={styles.instructionItem}>
            • Validate accessibility without manual calculation
          </Text>
          <Text style={styles.instructionItem}>
            • Create design tokens for hand-off to developers
          </Text>
          <Text style={styles.instructionItem}>
            • Generate documentation from design system
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
  inputRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  colorInput: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
    color: "#f1f5f9",
    fontSize: 16,
    fontFamily: "monospace",
  },
  colorPreview: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#334155",
  },
  generateButton: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  generateButtonText: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "600",
  },
  swatchGrid: {
    gap: 12,
  },
  swatchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  swatchInfo: {
    flex: 1,
  },
  swatchName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: 2,
  },
  swatchValue: {
    fontSize: 12,
    color: "#64748b",
    fontFamily: "monospace",
  },
  contrastBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  contrastText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  contrastInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  contrastLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: "auto",
  },
  contrastBadge: {
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#ef4444",
  },
  contrastPass: {
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    color: "#10b981",
  },
  spacingDemo: {
    gap: 12,
  },
  spacingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  spacingLabel: {
    fontSize: 14,
    color: "#94a3b8",
    width: 48,
    fontFamily: "monospace",
  },
  spacingBar: {
    height: 24,
    backgroundColor: "#6366f1",
    borderRadius: 4,
  },
  typeDemo: {
    gap: 16,
  },
  typeExample: {
    color: "#f1f5f9",
  },
  todoBox: {
    backgroundColor: "#422006",
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  todoText: {
    color: "#fbbf24",
    fontSize: 13,
    lineHeight: 20,
  },
  instructions: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
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
});
