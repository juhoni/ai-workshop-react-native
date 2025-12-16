/**
 * EXERCISE 5: Performance Optimization Patterns
 *
 * A product list with filters that has performance issues.
 * Use AI to identify what needs optimization and what doesn't!
 *
 * REQUIREMENTS:
 * - Identify real performance bottlenecks
 * - Apply useMemo/useCallback correctly
 * - Avoid premature optimization
 * - Understand dependency arrays
 *
 * YOUR STACK:
 * - React 19.1.0
 * - React Native 0.81.5
 *
 * CAUTION: AI often suggests useMemo/useCallback everywhere!
 * Not everything needs optimization. Learn to:
 * - Measure first (React DevTools Profiler)
 * - Optimize expensive computations only
 * - Understand when re-renders are OK
 *
 * PROMPT EXAMPLE:
 * "Review this React Native component for performance issues.
 * Should I use useMemo for the filtered list? What about
 * useCallback for handlers? Explain when optimization helps
 * vs premature optimization. React 19."
 */

import { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";

// =============================================================
// Mock data
// =============================================================

type Product = {
  id: string;
  name: string;
  price: number;
  category: "electronics" | "clothing" | "food" | "books";
  inStock: boolean;
};

const PRODUCTS: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: `product-${i}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 10,
  category: ["electronics", "clothing", "food", "books"][
    Math.floor(Math.random() * 4)
  ] as Product["category"],
  inStock: Math.random() > 0.3,
}));

// =============================================================
// Helper function - is this expensive enough to memoize?
// =============================================================

function filterProducts(
  products: Product[],
  searchQuery: string,
  selectedCategory: string | null,
  showInStockOnly: boolean
): Product[] {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesStock = !showInStockOnly || product.inStock;

    return matchesSearch && matchesCategory && matchesStock;
  });
}

// =============================================================
// Helper to format price - is this expensive?
// =============================================================

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

// =============================================================
// TODO: Optimize this component with AI's help!
// =============================================================
//
// Questions to ask AI:
// 1. Should filteredProducts use useMemo? Why or why not?
// 2. Should formatPrice be wrapped in useCallback?
// 3. Should renderItem be wrapped in useCallback?
// 4. What are the correct dependencies for each?
// 5. Which optimizations actually help vs add complexity?
//
// =============================================================

type ProductListProps = {
  onProductPress: (product: Product) => void;
};

function ProductList({ onProductPress }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // =============================================================
  // TODO #1: Does this need useMemo?
  // =============================================================
  // Currently this runs on every render. With 100 items and
  // multiple filters, is it expensive enough to memoize?
  //
  // Ask AI: "Should I wrap this in useMemo? What are the
  // trade-offs? When does the optimization cost more than
  // it saves?"
  // =============================================================

  const filteredProducts = filterProducts(
    PRODUCTS,
    searchQuery,
    selectedCategory,
    showInStockOnly
  );

  // =============================================================
  // TODO #2: Do these handlers need useCallback?
  // =============================================================
  // These are passed to child components. But do they cause
  // unnecessary re-renders?
  //
  // Ask AI: "Should I wrap these in useCallback? Would it
  // prevent re-renders? What if the child isn't memoized?"
  // =============================================================

  const handleCategoryPress = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleStockToggle = () => {
    setShowInStockOnly((prev) => !prev);
  };

  // =============================================================
  // TODO #3: Should renderItem be wrapped in useCallback?
  // =============================================================

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.productItem}
      onPress={() => onProductPress(item)}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <View style={styles.productRight}>
        <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        <Text style={[styles.stockBadge, item.inStock && styles.stockInStock]}>
          {item.inStock ? "In Stock" : "Out"}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.listContainer}>
      {/* Search */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        placeholderTextColor="#64748b"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.categoryButtons}>
          <Pressable
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.categoryButtonActive,
            ]}
            onPress={() => handleCategoryPress(null)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === null && styles.categoryButtonTextActive,
              ]}
            >
              All
            </Text>
          </Pressable>
          {["electronics", "clothing", "food", "books"].map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryPress(cat)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === cat && styles.categoryButtonTextActive,
                ]}
              >
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            styles.stockToggle,
            showInStockOnly && styles.stockToggleActive,
          ]}
          onPress={handleStockToggle}
        >
          <Text style={styles.stockToggleText}>
            {showInStockOnly ? "✓ In Stock Only" : "All Stock"}
          </Text>
        </Pressable>
      </View>

      {/* Results count */}
      <Text style={styles.resultsText}>
        {filteredProducts.length} products found
      </Text>

      {/* List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// =============================================================
// Exercise Screen
// =============================================================

export default function Exercise5Screen() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise 5: Performance</Text>
      <Text style={styles.instructions}>
        Review and optimize this product list.{"\n"}
        Ask AI: What needs optimization? What doesn't?
      </Text>

      <ProductList onProductPress={handleProductPress} />

      {selectedProduct && (
        <View style={styles.selectedCard}>
          <Text style={styles.selectedTitle}>Selected:</Text>
          <Text style={styles.selectedName}>{selectedProduct.name}</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => setSelectedProduct(null)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>
        </View>
      )}

      {/* Hints */}
      <View style={styles.hints}>
        <Text style={styles.hintsTitle}>Performance Review Questions:</Text>
        <Text style={styles.hint}>• Is the computation expensive?</Text>
        <Text style={styles.hint}>• Does it run on every render?</Text>
        <Text style={styles.hint}>• Are dependencies correct?</Text>
        <Text style={styles.hint}>• Does memoization add complexity?</Text>
        <Text style={styles.hint}>• Can you measure the improvement?</Text>
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
    marginBottom: 16,
    lineHeight: 20,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
    color: "#f1f5f9",
    fontSize: 16,
    marginBottom: 12,
  },
  filters: {
    marginBottom: 12,
  },
  categoryButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: "#0f172a",
  },
  categoryButtonActive: {
    backgroundColor: "#3b82f6",
  },
  categoryButtonText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryButtonTextActive: {
    color: "#f1f5f9",
  },
  stockToggle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#0f172a",
    alignSelf: "flex-start",
  },
  stockToggleActive: {
    backgroundColor: "#10b981",
  },
  stockToggleText: {
    color: "#f1f5f9",
    fontSize: 12,
    fontWeight: "600",
  },
  resultsText: {
    color: "#94a3b8",
    fontSize: 12,
    marginBottom: 8,
  },
  listContent: {
    gap: 8,
  },
  productItem: {
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  productCategory: {
    color: "#64748b",
    fontSize: 12,
  },
  productRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  productPrice: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "700",
  },
  stockBadge: {
    color: "#ef4444",
    fontSize: 11,
    fontWeight: "600",
  },
  stockInStock: {
    color: "#10b981",
  },
  selectedCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  selectedTitle: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 8,
  },
  selectedName: {
    color: "#f1f5f9",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#475569",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
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
