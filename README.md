# AI Workshop Exercises

Example React Native Expo project for the AI-Powered Mobile Development workshop.

## Tech Stack

This project matches the workshop's target stack:

| Package | Version |
|---------|---------|
| React Native | 0.81.5 |
| Expo | 54.0.x |
| expo-router | 6.0.x |
| TypeScript | 5.9.x |
| Reanimated | 4.1.5 |
| React Navigation | 7.x |
| Tanstack Query | 5.90.x |
| Gesture Handler | 2.29.x |

## Setup

```bash
# Install dependencies
npm install
# or
yarn install

# Start the development server
npx expo start
```

## Exercises

### Exercise 1: Debug a Real Crash
**File:** `app/exercises/exercise1.tsx`

Material Top Tabs crashes on Android. Practice:
- Providing context to AI (error messages, versions)
- Asking follow-up questions
- Verifying solutions against docs

### Exercise 2: Type-Safe Component
**File:** `app/exercises/exercise2.tsx`

Create mutually exclusive props with TypeScript:
- Either `data + renderItem` OR `children`
- Never both at once
- TypeScript should catch invalid combinations

### Exercise 3: Reanimated Animation
**File:** `app/exercises/exercise3.tsx`

Build a pull-to-refresh indicator:
- Scale based on pull progress
- Rotate while refreshing
- Use Reanimated v4 syntax (not v2!)

### Exercise 4: Data Fetching with TanStack Query
**File:** `app/exercises/exercise4.tsx`

Implement user profile with React Query v5:
- Fetch data with automatic caching
- Optimistic updates for editing
- Handle loading and error states
- Avoid mixing v3/v4/v5 syntax

### Exercise 5: Performance Optimization
**File:** `app/exercises/exercise5.tsx`

Review a product list for performance:
- Identify real bottlenecks vs premature optimization
- When to use `useMemo`/`useCallback`
- Correct dependency arrays
- Question AI recommendations critically

### Exercise 6: Jest Testing & Edge Cases
**File:** `app/exercises/exercise6.tsx`

Test a complex financial portfolio calculator:
- Set up Jest for Expo/React Native
- Write tests that expose dangerous edge cases
- Find division by zero vulnerabilities
- Fix floating point precision issues with money
- Handle empty portfolios and edge conditions

### Exercise 7: Design System & Theme Generation
**File:** `app/exercises/exercise7.tsx`

Generate a complete design system from brand colors using AI:
- Generate full color palettes (50-900 shades) from a single brand color
- Create semantic design tokens (primary, secondary, success, error, warning)
- Validate WCAG contrast ratios for accessibility
- Build responsive spacing and typography scales
- Learn how AI can accelerate design-to-code workflows

### Exercise 8: Component Variants & Accessibility
**File:** `app/exercises/exercise8.tsx`

Design flexible, accessible components with AI assistance:
- Create components with multiple variants and sizes
- Implement full accessibility (ARIA, keyboard navigation, screen readers)
- Describe component behavior in plain language → Get production code
- Build Button, Input, and Card components with comprehensive variants
- Auto-generate component documentation for design systems

## Workshop Tips

### Good Prompts Include:
1. **Versions**: "Using Expo 54, Reanimated 4.1.5..."
2. **Context**: Error messages, code snippets
3. **Constraints**: "Must work on both platforms"

### Always Verify:
- Check official documentation
- Run TypeScript (`npm run typecheck`)
- Test on both iOS and Android

### Watch For:
- Hallucinated APIs that don't exist
- Old syntax (class components, Reanimated v2)
- Platform-specific issues

## Project Structure

```
app/
├── _layout.tsx          # Root layout with providers
├── index.tsx            # Home screen with exercise links
└── exercises/
    ├── _layout.tsx      # Exercises stack navigator
    ├── exercise1.tsx    # Material Top Tabs debug
    ├── exercise2.tsx    # Type-safe component
    ├── exercise3.tsx    # Reanimated animation
    ├── exercise4.tsx    # TanStack Query data fetching
    ├── exercise5.tsx    # Performance optimization
    ├── exercise6.tsx    # Jest testing & edge cases
    ├── exercise7.tsx    # Design system & theme generation
    └── exercise8.tsx    # Component variants & accessibility
```

## Resources

- [Expo Docs](https://docs.expo.dev)
- [expo-router Docs](https://docs.expo.dev/router/introduction/)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Tanstack Query](https://tanstack.com/query/latest/docs)
