/**
 * EXERCISE 6: Testing for Edge Cases
 *
 * You've been given a production function that processes financial transactions.
 * It's expensive to run and has some dangerous edge cases that need tests!
 *
 * GOALS:
 * - Set up Jest testing for React Native/Expo
 * - Write comprehensive tests for a complex function
 * - Discover and fix dangerous edge cases through testing
 *
 * DANGEROUS EDGE CASES TO FIND:
 * 1. Division by zero vulnerability
 * 2. Floating point precision issues with money
 *
 * YOUR TASK:
 * 1. Ask AI to set up Jest for this Expo project
 * 2. Create a test file for the calculatePortfolioMetrics function
 * 3. Write tests that will expose the edge cases
 * 4. Fix the bugs you discover
 *
 * HINT: Test with:
 * - Empty portfolios
 * - Single assets
 * - Very small decimal values
 * - Large numbers
 * - Mixed positive/negative returns
 */

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

// ============================================
// THE FUNCTION YOU NEED TO TEST AND FIX
// ============================================

interface Asset {
  symbol: string;
  shares: number;
  purchasePrice: number;
  currentPrice: number;
  dividendYield?: number;
}

interface PortfolioMetrics {
  totalValue: number;
  totalCost: number;
  totalGainLoss: number;
  percentageReturn: number;
  averageReturn: number;
  sharpeRatio: number;
  bestPerformer: string;
  worstPerformer: string;
}

/**
 * Calculates comprehensive portfolio metrics
 * WARNING: This function has dangerous edge cases!
 */
export function calculatePortfolioMetrics(
  assets: Asset[]
): PortfolioMetrics {
  // Calculate total values
  const totalValue = assets.reduce(
    (sum, asset) => sum + asset.shares * asset.currentPrice,
    0
  );

  const totalCost = assets.reduce(
    (sum, asset) => sum + asset.shares * asset.purchasePrice,
    0
  );

  const totalGainLoss = totalValue - totalCost;

  // BUG #1: Division by zero when totalCost is 0!
  const percentageReturn = (totalGainLoss / totalCost) * 100;

  // Calculate individual returns
  const returns = assets.map((asset) => {
    const cost = asset.shares * asset.purchasePrice;
    const value = asset.shares * asset.currentPrice;
    const gainLoss = value - cost;
    // BUG #2: Another division by zero possible!
    return (gainLoss / cost) * 100;
  });

  // Calculate average return
  const averageReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length;

  // Calculate Sharpe Ratio (simplified - assuming risk-free rate of 2%)
  const riskFreeRate = 2.0;
  const variance =
    returns.reduce((sum, ret) => sum + Math.pow(ret - averageReturn, 2), 0) /
    returns.length;
  const stdDev = Math.sqrt(variance);
  // BUG #3: Another division by zero!
  const sharpeRatio = (averageReturn - riskFreeRate) / stdDev;

  // Find best and worst performers
  const performanceData = assets.map((asset, index) => ({
    symbol: asset.symbol,
    return: returns[index],
  }));

  const sorted = [...performanceData].sort((a, b) => b.return - a.return);
  const bestPerformer = sorted[0].symbol;
  const worstPerformer = sorted[sorted.length - 1].symbol;

  // BUG #4: Floating point precision - money should be rounded!
  return {
    totalValue,
    totalCost,
    totalGainLoss,
    percentageReturn,
    averageReturn,
    sharpeRatio,
    bestPerformer,
    worstPerformer,
  };
}

// ============================================
// DEMO UI
// ============================================

export default function Exercise6Screen() {
  const [sampleData] = useState<Asset[]>([
    {
      symbol: "AAPL",
      shares: 10,
      purchasePrice: 150.0,
      currentPrice: 175.5,
      dividendYield: 0.5,
    },
    {
      symbol: "GOOGL",
      shares: 5,
      purchasePrice: 2800.0,
      currentPrice: 2650.0,
      dividendYield: 0.0,
    },
    {
      symbol: "MSFT",
      shares: 15,
      purchasePrice: 300.0,
      currentPrice: 380.0,
      dividendYield: 0.8,
    },
  ]);

  let metrics: PortfolioMetrics | null = null;
  let error: string | null = null;

  try {
    metrics = calculatePortfolioMetrics(sampleData);
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Portfolio Metrics Calculator</Text>

        <Text style={styles.description}>
          This exercise demonstrates a complex function that needs comprehensive
          testing. Your job is to set up Jest and write tests that expose the
          edge cases!
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sample Portfolio:</Text>
          {sampleData.map((asset) => (
            <View key={asset.symbol} style={styles.assetRow}>
              <Text style={styles.assetText}>
                {asset.symbol}: {asset.shares} shares @ ${asset.currentPrice}
              </Text>
            </View>
          ))}
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        ) : metrics ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Metrics:</Text>
            <Text style={styles.metric}>
              Total Value: ${metrics.totalValue.toFixed(2)}
            </Text>
            <Text style={styles.metric}>
              Total Cost: ${metrics.totalCost.toFixed(2)}
            </Text>
            <Text
              style={[
                styles.metric,
                metrics.totalGainLoss >= 0 ? styles.positive : styles.negative,
              ]}
            >
              Gain/Loss: ${metrics.totalGainLoss.toFixed(2)} (
              {metrics.percentageReturn.toFixed(2)}%)
            </Text>
            <Text style={styles.metric}>
              Average Return: {metrics.averageReturn.toFixed(2)}%
            </Text>
            <Text style={styles.metric}>
              Sharpe Ratio: {metrics.sharpeRatio.toFixed(2)}
            </Text>
            <Text style={styles.metric}>
              Best: {metrics.bestPerformer} | Worst: {metrics.worstPerformer}
            </Text>
          </View>
        ) : null}

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Your Tasks:</Text>
          <Text style={styles.instructionItem}>
            1. Ask AI to set up Jest for testing
          </Text>
          <Text style={styles.instructionItem}>
            2. Create a test file for calculatePortfolioMetrics
          </Text>
          <Text style={styles.instructionItem}>
            3. Write tests for edge cases (empty array, zero values, etc.)
          </Text>
          <Text style={styles.instructionItem}>
            4. Fix the bugs your tests expose
          </Text>
          <Text style={styles.instructionItem}>
            5. Verify all tests pass
          </Text>
        </View>

        <View style={styles.dangerBox}>
          <Text style={styles.dangerTitle}>⚠️ Known Issues:</Text>
          <Text style={styles.dangerText}>
            • Division by zero vulnerabilities
          </Text>
          <Text style={styles.dangerText}>
            • Floating point precision with money
          </Text>
          <Text style={styles.dangerText}>
            • No handling of empty portfolios
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1f5f9",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#cbd5e1",
    marginBottom: 20,
    lineHeight: 24,
  },
  section: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: 12,
  },
  assetRow: {
    marginBottom: 8,
  },
  assetText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  metric: {
    color: "#e2e8f0",
    fontSize: 15,
    marginBottom: 8,
  },
  positive: {
    color: "#34d399",
  },
  negative: {
    color: "#f87171",
  },
  instructions: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: 12,
  },
  instructionItem: {
    color: "#cbd5e1",
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  dangerBox: {
    backgroundColor: "#7f1d1d",
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#dc2626",
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fecaca",
    marginBottom: 8,
  },
  dangerText: {
    color: "#fca5a5",
    fontSize: 14,
    marginBottom: 4,
  },
  errorBox: {
    backgroundColor: "#7f1d1d",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#fecaca",
    fontSize: 14,
  },
});
