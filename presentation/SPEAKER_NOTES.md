# AI-Powered Mobile Development Workshop
## Speaker Notes

---

## Slide 1: Title Slide

**Duration:** 1-2 minutes

**Speaker Notes:**
Welcome everyone to today's workshop on AI-Powered Mobile Development. Over the next two hours, we'll explore how you can leverage AI tools like Claude, ChatGPT, and others to accelerate your React Native development workflow.

This is a hands-on workshop — after a 45-minute presentation, we'll take a short break, then spend the remaining hour doing practical exercises where you'll use AI tools yourself.

The goal isn't to make you dependent on AI, but to show you where it genuinely helps and where you need to be careful. Think of AI as a powerful new tool in your toolbox, not a replacement for your expertise.

---

## Slide 2: Agenda

**Duration:** 2 minutes

**Speaker Notes:**
Here's what we'll cover today. The presentation portion covers four main areas:

1. **Available AI Tools** — Free options you can start using today, even without enterprise licenses
2. **Where AI Excels** — The high-value use cases where AI genuinely saves time for React Native developers
3. **The Pitfalls** — Critical warnings about where AI can lead you astray
4. **Effective Prompting** — How to get better results from AI

Then after a 15-minute break, we'll do three hands-on exercises:
- Debugging a real crash using AI
- Creating type-safe components with TypeScript
- Building animations with Reanimated

We'll wrap up with a discussion where I'd love to hear your experiences and questions.

---

## Slide 3: Section Divider - AI Tools

**Duration:** 10 seconds (transition slide)

**Speaker Notes:**
Let's start by looking at what tools are actually available to you right now.

---

## Slide 4: Free AI Tools

**Duration:** 5 minutes

**Speaker Notes:**
Even without enterprise licenses like GitHub Copilot, you have several powerful options:

**Claude.ai** (Anthropic) — This is what I personally use most for complex coding tasks. It excels at:
- Long, detailed code reviews
- Complex reasoning about architecture
- Understanding large code snippets
- The free tier gives you roughly 30 messages per day with Claude 3.5 Sonnet

**ChatGPT** (OpenAI) — Great for:
- Quick questions and broad knowledge
- Has web browsing for current information
- Free tier uses GPT-4o mini, which is quite capable

**Cursor** — This is a game-changer. It's an IDE (VS Code fork) with AI built in:
- It understands your entire codebase
- Inline code edits and completions
- Free tier: 2000 completions per month
- I highly recommend trying this if you haven't

**Ollama** — For privacy-conscious use cases:
- Run models completely locally on your machine
- No internet required, no data sent anywhere
- Models like CodeLlama are decent for coding tasks
- Great for sensitive codebases

**Tip:** I often use multiple tools. Claude for complex problems, ChatGPT for quick lookups, Cursor for day-to-day coding.

**Resources:**
- https://claude.ai
- https://chat.openai.com
- https://cursor.sh
- https://ollama.ai

---

## Slide 5: Section Divider - Where AI Excels

**Duration:** 10 seconds (transition slide)

**Speaker Notes:**
Now let's look at where AI actually provides value for React Native development — based on real-world experience with our tech stack.

---

## Slide 6: TypeScript Type Gymnastics

**Duration:** 4 minutes

**Speaker Notes:**
This is probably where AI shines the brightest for me. TypeScript's advanced type features are powerful but have a steep learning curve.

AI is excellent at:
- **Complex generics** — When you need a function that works with multiple types while preserving type information
- **Discriminated unions** — Creating types that can be one of several variants
- **Conditional types** — Types that change based on other types
- **Mapped types** — Transforming existing types into new ones

**Real example from our codebase:** We needed a list component where you could either pass `data` + `renderItem` OR pass `children`, but never both. This prevents runtime errors where someone accidentally provides conflicting props.

[Point to the code on slide]

The solution uses the `never` type as a marker. When you set a prop to `never`, TypeScript won't allow you to pass any value for it. This creates mutually exclusive prop groups.

**Key insight:** AI is great at these puzzles because:
1. The problem is clearly defined
2. The solution is verifiable (TypeScript will tell you if it's wrong)
3. There's extensive training data on TypeScript patterns

**Action:** In the hands-on portion, you'll create something similar yourself.

**Resources:**
- TypeScript Handbook: https://typescriptlang.org/docs/handbook

---

## Slide 7: Expo Router Navigation

**Duration:** 3 minutes

**Speaker Notes:**
Expo Router uses file-based routing, which is conceptually different from traditional React Navigation setup. AI can help with:

- **File-based routing patterns** — Understanding how the `app/` directory structure maps to routes
- **Typed routes** — Setting up `useLocalSearchParams` with proper generics
- **Layout routes** — Using `_layout.tsx` files for shared UI
- **Dynamic segments** — The `[id].tsx` pattern for dynamic routes

[Point to the code]

The example shows a dynamic route. The file `app/user/[id].tsx` automatically handles URLs like `myapp://user/123`. The `useLocalSearchParams` hook extracts the `id` with type safety.

**CRITICAL WARNING:** Expo Router is relatively new (our project uses v6.0.17). AI has significantly less training data on it compared to traditional React Navigation. This means:
- More hallucinated APIs
- Suggestions mixing expo-router with React Navigation patterns
- Outdated patterns from earlier expo-router versions

Always verify against the official expo-router docs, and explicitly mention your expo-router version in prompts.

**Tip:** When asking AI about expo-router, include:
- Your expo-router version (6.0.17)
- Your Expo SDK version (54)
- Whether you're using typed routes

**Resources:**
- https://docs.expo.dev/router/introduction/

---

## Slide 8: Tanstack Query Patterns

**Duration:** 3 minutes

**Speaker Notes:**
Tanstack Query (formerly React Query) is fantastic for server state management, but the advanced patterns have a learning curve.

AI is particularly helpful for:
- **Cache invalidation** — When should data refresh? Which queries should invalidate together?
- **Optimistic updates** — Show the expected result immediately, roll back if the server rejects it
- **Infinite scroll** — Managing paginated data that keeps loading more
- **Persistence** — Caching data to disk so it survives app restarts

[Point to the code]

This optimistic update pattern is common but tricky to get right:
1. Cancel any in-flight queries to avoid race conditions
2. Save the previous state for rollback
3. Optimistically update the cache
4. If the mutation fails, restore the previous state

Our project uses Tanstack Query 5.90 with the persist client — mention this when prompting.

**Why AI helps here:** The patterns are well-documented but require combining several concepts correctly. AI can generate the boilerplate while you focus on your specific business logic.

**Resources:**
- https://tanstack.com/query/latest/docs

---

## Slide 9: Reanimated Animations

**Duration:** 3 minutes

**Speaker Notes:**
Reanimated is powerful but has a unique mental model and syntax. AI can help you:
- Understand **shared values** and how they differ from React state
- Write **worklets** correctly (functions that run on the UI thread)
- Integrate with **Gesture Handler** for touch-driven animations
- Use **interpolation** to map values between ranges

[Point to the code]

This example shows a pan gesture that moves a card and fades it based on distance. Notice:
- `useSharedValue` for the animation value
- `Gesture.Pan()` for touch handling
- `useAnimatedStyle` for reactive styles
- `interpolate` to map position to opacity

**CRITICAL WARNING:** AI often mixes Reanimated v2, v3, and v4 syntax. They're different! Our project uses Reanimated 4.1.5.

Common mistakes:
- Using `Animated.timing()` instead of `withTiming()`
- Missing the `'worklet'` directive when needed
- Using old `PanGestureHandler` component instead of new Gesture API

**Always verify** the generated animation code against the v4 docs before using it.

**Resources:**
- https://docs.swmansion.com/react-native-reanimated

---

## Slide 10: More High-Value Use Cases

**Duration:** 2 minutes

**Speaker Notes:**
Let me quickly cover some other areas where AI provides real value:

**Debugging** — Paste error messages and stack traces. AI can often identify the cause, especially for platform-specific crashes. Android and iOS behave differently, and AI has seen most common issues.

**Test Generation** — AI is excellent at generating Jest tests and MSW handlers. Give it a component or function, and it'll create reasonable test cases. You'll still need to review them, but it's much faster than writing from scratch.

**Boilerplate** — Form components with react-hook-form, API hooks, screen templates. All the repetitive setup code that follows patterns.

**Regex & Data Transforms** — Validation patterns, parsing, date formatting. Regular expressions are notoriously hard to write and read — AI handles them well.

**Code Review** — Paste a PR or code snippet and ask for feedback. It'll spot potential bugs, suggest improvements, and explain patterns.

**Documentation** — JSDoc comments, README files. AI can document your code in a consistent style.

**Key pattern:** AI works best when the task has clear inputs and verifiable outputs. If you can check whether the result is correct, AI can usually help.

---

## Slide 11: Section Divider - Pitfalls

**Duration:** 10 seconds (transition slide)

**Speaker Notes:**
Now for the important part — where AI can lead you astray. These warnings are based on real mistakes I've seen.

---

## Slide 12: Hallucinated APIs

**Duration:** 4 minutes

**Speaker Notes:**
This is the most dangerous pitfall: AI will confidently suggest APIs, props, and methods that simply don't exist.

[Point to the example]

Here, AI suggested `preloadDistance` as a FlatList prop. It sounds reasonable — you might want to control how far ahead items are preloaded. But this prop doesn't exist in React Native.

**Why does this happen?**
- AI models are trained on text, not API documentation
- They learn patterns and generate plausible-sounding code
- They don't actually "know" what APIs exist in version 0.81

**Common hallucination triggers:**
- Newer React Native versions (0.80+) that have less training data
- Recently updated libraries
- Platform-specific APIs
- Third-party component props

**How to protect yourself:**

1. **Check official documentation** — Always. Even if the code looks right.
2. **Use TypeScript** — It will catch non-existent props at compile time
3. **Test on both platforms** — Android and iOS APIs differ
4. **Be skeptical of "it should work"** — If AI says "this should work," verify it actually does

**Real story:** I once spent 30 minutes debugging code that AI said would work, only to discover the method had been deprecated two versions ago.

**Resources:**
- https://reactnative.dev/docs/flatlist

---

## Slide 13: Outdated Patterns

**Duration:** 3 minutes

**Speaker Notes:**
AI's training data is a mix of old and new code. It often suggests patterns that were correct years ago but are now outdated.

[Point to the side-by-side comparison]

**Class components vs. functional components:**
- AI still suggests `class MyComponent extends Component` with lifecycle methods
- We've used functional components with hooks for years
- `componentDidMount` → `useEffect(() => {}, [])`

**Navigation v5 vs v7:**
- The param passing syntax changed
- Old: `{ params: { id: 1 } }`
- New: `{ id: 1 }` directly

**Reanimated v2 vs v4:**
- Old: `Animated.timing(value, config).start()`
- New: `value.value = withTiming(target, config)`
- Completely different API!

**How to avoid this:**

Always specify versions in your prompts:
```
"Using React Native 0.81, Expo SDK 54, Reanimated 4.1,
React Navigation 7..."
```

If you don't specify, AI will guess — and often guess wrong.

---

## Slide 14: More Critical Pitfalls

**Duration:** 3 minutes

**Speaker Notes:**
A few more pitfalls to watch out for:

**Copy-Paste Syndrome:**
You copy AI-generated code without understanding it. It works today, but when you need to modify it later, you're stuck. You become dependent on AI for any changes. This accumulates technical debt rapidly.

**Solution:** Always take time to understand what the code does. Ask AI to explain it if needed.

**Security Blindspots:**
AI might suggest storing authentication tokens in AsyncStorage. That's insecure — we use expo-secure-store for a reason. It might skip input validation, use deprecated encryption methods, or expose sensitive data in logs.

**Solution:** Always review security-sensitive code carefully. When in doubt, ask specifically about security implications.

**Over-Engineering:**
AI loves abstractions. Ask for a simple function, and it might give you a factory pattern with dependency injection. More code means more bugs and more maintenance.

**Solution:** Ask for the simplest solution that works. You can always add complexity later.

**The "It Works" Trap:**
Code compiles and seems to work, but has subtle issues:
- Memory leaks from uncleared subscriptions
- Race conditions under specific timing
- Performance issues with large datasets

**Solution:** Test thoroughly. Profile performance. Review edge cases.

[Point to version numbers]

Your specific stack versions matter. AI doesn't know you're on RN 0.81.5, Expo 54, Reanimated 4.1.5 unless you tell it.

---

## Slide 15: Section Divider - Effective Prompting

**Duration:** 10 seconds (transition slide)

**Speaker Notes:**
So how do we get better results? Let's talk about effective prompting strategies.

---

## Slide 16: Good vs Bad Prompts

**Duration:** 4 minutes

**Speaker Notes:**
The quality of your prompt directly determines the quality of the response. Let me show you the difference.

[Point to BAD examples]

**Bad prompts:**
- "How do I fix this navigation crash?" — What crash? What error? What version?
- "Make this animation smoother" — What animation? What's wrong? What library?
- "Write a form component" — What fields? What validation? What styling?

These will give you generic answers, often for the wrong version, making assumptions that don't match your setup.

[Point to GOOD examples]

**Good prompts:**

"Using @react-navigation/stack v7, my app crashes on Android when navigating with params. Error: [paste the actual error]. Here's my navigator setup: [paste the code]"

This tells AI:
- Exact library and version
- Platform (Android)
- Specific error message
- Relevant code context

"Using Reanimated 4.1, create a spring animation for a card that scales up on press with gesture handler. Target: 60fps on low-end Android."

This specifies:
- Library version
- Desired behavior
- Integration requirements
- Performance constraints

**The result:** Targeted solutions using correct APIs that actually work in your project.

**Resources:**
- https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering

---

## Slide 17: Key Prompting Strategies

**Duration:** 3 minutes

**Speaker Notes:**
Here are five strategies that will immediately improve your results:

**1. Specify Versions**
Start every technical prompt with your versions:
"Using React Native 0.81, Expo SDK 54, Reanimated 4.1, React Navigation 7..."

This single addition prevents most outdated code suggestions.

**2. Provide Context**
Include:
- Error messages (full stack trace, not just the title)
- Relevant code snippets
- What you've already tried
- Constraints (performance, platform, accessibility)

**3. Ask for Explanations**
Don't just ask for code. Ask "Why does this approach work?" or "What are the tradeoffs?"

This builds your understanding and helps you spot issues.

**4. Iterate and Refine**
First response not perfect? That's normal. Follow up:
- "This still has [problem]. Can you fix it?"
- "Can you make this more performant?"
- "Can you simplify this?"

AI conversations are iterative. Don't expect perfection on the first try.

**5. Verify Output**
Before using any AI-generated code:
- Check it against official docs
- Run TypeScript compilation
- Test on both platforms
- Review for security issues

[Point to the mindset shift box]

**Mindset shift:** Treat AI as a senior colleague who's helpful but sometimes makes mistakes, not as an infallible oracle. You wouldn't blindly trust a colleague's code without review — apply the same standard to AI.

---

## Slide 18: Section Divider - Hands-on

**Duration:** 10 seconds (transition slide)

**Speaker Notes:**
Alright, time to put this into practice! After a 15-minute break, we'll do three exercises.

[BREAK - 15 minutes]

Welcome back! Let's get hands-on.

---

## Slide 19: Exercise 1 - Debug a Crash

**Duration:** 15 minutes

**Speaker Notes:**
For our first exercise, we'll debug a real crash scenario.

[Point to the code]

This Material Top Tabs setup crashes on Android. Your task is to use AI to diagnose and fix it.

**Setup:**
1. Open your AI tool of choice (Claude, ChatGPT, etc.)
2. You'll need to provide context — what would you include in your prompt?

**What you should include:**
- The code snippet
- That it crashes on Android specifically
- Your library versions (react-navigation/material-top-tabs, react-native-pager-view)
- Ask for both the diagnosis AND the fix

**Common issues this reveals:**
- Missing gesture handler setup in entry file
- react-native-pager-view not installed or linked
- Android-specific configuration missing

**Learning goals:**
1. Practice providing good context
2. See how AI diagnoses issues
3. Learn to ask follow-up questions
4. Verify the solution against docs

[Give participants 10-12 minutes to work]

**Debrief:** Who found the issue? What was it? Did AI suggest the right fix on the first try?

**Resources:**
- https://reactnavigation.org/docs/material-top-tab-navigator

---

## Slide 20: Exercise 2 - Type-Safe Components

**Duration:** 20 minutes

**Speaker Notes:**
Now let's tackle the TypeScript challenge we discussed earlier.

[Point to the code]

Your task: Create a `SmartList` component with mutually exclusive props.

**Requirements:**
- Either pass `data` + `renderItem` (like FlatList)
- OR pass `children` (like a regular container)
- TypeScript should error if you try to pass both

**Approach:**
1. Start by asking AI to explain discriminated unions and the `never` type
2. Then ask it to create the type
3. Ask it to explain WHY the solution works
4. Test it yourself — try passing invalid props and see if TypeScript catches them

**Hints to give AI:**
- "I need mutually exclusive props in TypeScript"
- "How do I use the `never` type to prevent certain prop combinations?"
- "This is for a React Native component"

**Why this exercise:**
- TypeScript types are verifiable — you can immediately see if they work
- It demonstrates AI's strength with type puzzles
- It shows the importance of understanding the solution, not just copying it

[Give participants 15-17 minutes to work]

**Debrief:** What solution did you get? Does TypeScript catch invalid usage? Can you explain why it works?

**Resources:**
- https://typescriptlang.org/docs/handbook/2/narrowing.html

---

## Slide 21: Exercise 3 - Reanimated Animation

**Duration:** 15 minutes

**Speaker Notes:**
Final exercise — let's build an animation with Reanimated.

[Point to the starter code]

Create a custom pull-to-refresh indicator with:
- **Scale animation** based on how far the user pulls (0-1 progress)
- **Rotation animation** that loops while refreshing
- Proper worklet syntax

**Approach:**
1. Ask AI to complete the starter code
2. Specify you're using Reanimated 4.1
3. Ask for spring physics on the scale
4. Request continuous rotation while `isRefreshing` is true

**Verification checklist:**
- Does it use `useSharedValue` (not `new Animated.Value`)?
- Does it use `useAnimatedStyle` (not `style={...}`)?
- Does it use `withSpring` and `withTiming` (not `.start()`)?
- Is the rotation using `withRepeat` for continuous looping?

**Common AI mistakes to watch for:**
- Using Reanimated v2 syntax
- Missing interpolation for rotation (should be degrees, not radians)
- Forgetting to stop the rotation when refreshing ends

[Give participants 12-15 minutes to work]

**Debrief:** What did you get? Did the AI use v4 syntax? Did you have to correct anything?

**Resources:**
- https://docs.swmansion.com/react-native-reanimated/docs/animations

---

## Slide 22: Discussion Questions

**Duration:** 10 minutes

**Speaker Notes:**
Let's reflect on what we learned. I'd love to hear your experiences.

[Facilitate discussion]

**Discussion questions:**

1. **What surprised you about using AI for coding?**
   - Did it exceed expectations anywhere?
   - Were there frustrating moments?

2. **Where did AI help most vs. mislead you?**
   - Which exercise was AI most helpful for?
   - Where did you have to correct it?

3. **How would you integrate this into your daily workflow?**
   - Which tasks would you use AI for?
   - Where would you avoid it?

**Prompts to keep conversation going:**
- "Did anyone get a completely wrong answer? What happened?"
- "How much time did verification take vs. the initial generation?"
- "Would you trust AI-generated code in production without review?"

**Things to listen for:**
- Stories of AI hallucinations
- Time savings vs. verification overhead
- Concerns about dependency
- Ideas for team adoption

---

## Slide 23: Key Takeaways

**Duration:** 3 minutes

**Speaker Notes:**
Let me summarize what we've covered:

[Go through each takeaway]

**AI is a powerful assistant, not a replacement**
It accelerates your work but requires your expertise to guide and verify. Don't use it to avoid learning — use it to learn faster.

**Context is everything**
Version numbers, error messages, constraints — the more context you provide, the better the results. Generic prompts give generic (often wrong) answers.

**Always verify output**
Check docs, run TypeScript, test on both platforms. AI confidently generates plausible-looking code that might not work.

**Best for: Types, debugging, boilerplate**
Tasks with clear inputs and verifiable outputs. AI excels when you can check if the answer is correct.

**Watch for: Hallucinations, outdated code**
AI will suggest non-existent APIs and deprecated patterns. It doesn't "know" what's current — it generates plausible text.

**Iterate, don't accept first response**
Conversations with AI are iterative. Ask follow-ups, request changes, refine the solution.

---

## Slide 24: Resources

**Duration:** 2 minutes

**Speaker Notes:**
Here are the key resources to bookmark:

**AI Tools:**
- claude.ai — My recommendation for complex coding tasks
- chat.openai.com — Good for quick questions
- cursor.sh — Try this IDE if you haven't
- ollama.ai — For local, private usage

**Prompting guides:**
- Anthropic and OpenAI both have excellent documentation on getting better results

**React Native docs:**
These are your verification sources. When AI suggests something, check it against:
- reactnative.dev/docs
- docs.expo.dev
- reactnavigation.org/docs
- docs.swmansion.com/react-native-reanimated
- tanstack.com/query/latest/docs

**TypeScript:**
- The handbook is excellent for understanding type patterns
- The React TypeScript cheatsheet covers common component patterns

**Action item:** Bookmark these. You'll use them constantly when verifying AI output.

---

## Slide 25: Thank You

**Duration:** 1-2 minutes

**Speaker Notes:**
Thank you all for participating! 

Remember: **AI + Human Expertise = Better Code**

Neither alone is as effective as the combination. AI accelerates, you guide and verify.

**Questions?**
I'm happy to discuss specific scenarios, tools, or techniques. What questions do you have?

**After the workshop:**
- I'll share these slides and speaker notes
- The exercise code examples will be available
- Feel free to reach out if you have questions later

**Final thought:**
Start small. Try AI on your next debugging session or TypeScript puzzle. See where it helps and where it doesn't. Build your intuition for when to reach for it.

Thanks again, and happy coding!

---

## Appendix: Additional Resources

### For Further Reading

**AI-Assisted Development:**
- "Prompt Engineering Guide" - docs.anthropic.com
- "Best Practices for AI-Assisted Coding" - GitHub Blog

**React Native Performance:**
- "Performance Overview" - reactnative.dev/docs/performance
- "Optimizing Flatlist Configuration" - reactnative.dev/docs/optimizing-flatlist-configuration

**TypeScript Advanced Types:**
- "Advanced Types" - typescriptlang.org/docs/handbook/2/types-from-types.html
- "Conditional Types" - typescriptlang.org/docs/handbook/2/conditional-types.html

**Reanimated Deep Dives:**
- "Shared Values" - docs.swmansion.com/react-native-reanimated/docs/core/useSharedValue
- "Worklets" - docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary#worklet

### Troubleshooting Common Issues

**If AI suggests wrong versions:**
Add versions explicitly at the start of every prompt.

**If code doesn't compile:**
Ask AI to explain the error and fix it. Include the full error message.

**If behavior differs between platforms:**
Mention the platform in your prompt. Ask specifically about platform differences.

**If performance is poor:**
Ask for optimization. Mention your performance targets (60fps, large datasets, etc.).
