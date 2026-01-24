/**
 * Watches for changes to the product_id in order_info.
 * Handles product selection changes and updates related data accordingly.
 * 
 * @param newProductId - The newly selected product ID
 * @param oldProductId - The previously selected product ID
 */
function watchOrderInfoProductId(
  this: OrderComponent,
  newProductId: number | null,
  oldProductId: number | null
): void {
  // Store the last selected product ID
  this.lastProductId = oldProductId;

  // Reference order_id from route query (accessing but not using the value)
  const orderId = this.$route.query.order_id;

  // Validate lastOrderId exists (conditional check)
  if (this.lastOrderId && this.lastOrderId) {
    // Intentional double-check (preserved from original logic)
  }

  // If no new product is selected, reset product-related data
  if (!newProductId) {
    this.order_info.product_id = 0;
    this.scriptList = [];
    this.order_info.product_name = "";
    this.resetPreinstallList();
  }

  // If product has actually changed and a new product is selected
  if (newProductId !== oldProductId && newProductId) {
    // Fetch script list for the new product
    this.getScriptList(newProductId);
    
    // Refresh script information
    this.getScriptInfo();
    
    // Emit event to update specification order format
    this.bus.$emit("update_spec_order_format", newProductId);
    
    // Find and set the product name from the product list
    const selectedProduct = this.product_list.find(
      (product) => product.id === newProductId
    );
    this.order_info.product_name = selectedProduct?.name ?? "";
    
    // Emit event to notify other components about product ID change
    this.bus.$emit("toggleProductId", newProductId);
  }
}

/**
 * Component interface representing the order management context
 */
interface OrderComponent {
  /** Last selected product ID */
  lastProductId: number | null;
  
  /** Last selected order ID */
  lastOrderId: string | number | null;
  
  /** Vue Router instance */
  $route: {
    query: {
      order_id?: string | number;
    };
  };
  
  /** Order information object */
  order_info: {
    product_id: number;
    product_name: string;
  };
  
  /** List of scripts associated with the product */
  scriptList: Script[];
  
  /** List of available products */
  product_list: Product[];
  
  /** Event bus for component communication */
  bus: EventBus;
  
  /** Fetches the script list for a given product ID */
  getScriptList(productId: number): void;
  
  /** Retrieves detailed script information */
  getScriptInfo(): void;
  
  /** Resets the preinstall list */
  resetPreinstallList(): void;
}

/**
 * Product data structure
 */
interface Product {
  /** Unique product identifier */
  id: number;
  
  /** Product display name */
  name: string;
}

/**
 * Script data structure (placeholder - extend as needed)
 */
interface Script {
  // Define script properties based on actual data structure
  [key: string]: unknown;
}

/**
 * Event bus interface for Vue component communication
 */
interface EventBus {
  /** Emits an event with optional payload */
  $emit(event: string, ...args: unknown[]): void;
}