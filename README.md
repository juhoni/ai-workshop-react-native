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
    └── exercise3.tsx    # Reanimated animation
```

## Resources

- [Expo Docs](https://docs.expo.dev)
- [expo-router Docs](https://docs.expo.dev/router/introduction/)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Tanstack Query](https://tanstack.com/query/latest/docs)
