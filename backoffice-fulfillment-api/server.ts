import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

interface InventoryItem {
  printerId: number;
  quantity: number;
}

interface Order {
  id: number;
  customerName: string;
  items: Array<{
    printerId: number;
    quantity: number;
  }>;
  totalAmount: number;
  orderDate: string;
}

interface Printer {
  id: number;
  name: string;
  image: string;
  description: string;
  shortDescription: string;
  price: number;
}

async function fetchState(): Promise<{
  inventory: InventoryItem[];
  orders: Order[];
  printers: Printer[];
}> {
  let inventory: InventoryItem[] = [];
  let orders: Order[] = [];
  let printers: Printer[] = [];

  if (inventory.length === 0) {
    const printersReq = await fetch("http://localhost:8082/products");
    printers = await printersReq.json();

    inventory = printers.map((printer: Printer) => ({
      printerId: printer.id,
      quantity: Math.floor(Math.random() * 10) + 5,
    }));

    orders = [
      {
        id: 1,
        customerName: "Alice Wonderland",
        items: [{ printerId: 1, quantity: 2 }],
        totalAmount: 498,
        orderDate: "2024-01-15",
      },
      {
        id: 2,
        customerName: "Bob The Builder",
        items: [
          { printerId: 2, quantity: 1 },
          { printerId: 3, quantity: 1 },
        ],
        totalAmount: 848,
        orderDate: "2024-02-20",
      },
      {
        id: 3,
        customerName: "Charlie Chaplin",
        items: [{ printerId: 4, quantity: 3 }],
        totalAmount: 387,
        orderDate: "2024-03-10",
      },
      {
        id: 4,
        customerName: "Diana Prince",
        items: [
          { printerId: 5, quantity: 1 },
          { printerId: 6, quantity: 2 },
        ],
        totalAmount: 1997,
        orderDate: "2024-04-05",
      },
      {
        id: 5,
        customerName: "Ethan Hunt",
        items: [{ printerId: 7, quantity: 1 }],
        totalAmount: 349,
        orderDate: "2024-05-12",
      },
      {
        id: 6,
        customerName: "Fiona Gallagher",
        items: [
          { printerId: 8, quantity: 1 },
          { printerId: 1, quantity: 1 },
        ],
        totalAmount: 1248,
        orderDate: "2024-06-22",
      },
      {
        id: 7,
        customerName: "George Michael",
        items: [{ printerId: 9, quantity: 2 }],
        totalAmount: 998,
        orderDate: "2024-07-01",
      },
      {
        id: 8,
        customerName: "Hannah Montana",
        items: [
          { printerId: 10, quantity: 1 },
          { printerId: 2, quantity: 2 },
        ],
        totalAmount: 1097,
        orderDate: "2024-08-18",
      },
      {
        id: 9,
        customerName: "Indiana Jones",
        items: [{ printerId: 3, quantity: 2 }],
        totalAmount: 898,
        orderDate: "2024-09-25",
      },
      {
        id: 10,
        customerName: "Jack Sparrow",
        items: [
          { printerId: 4, quantity: 1 },
          { printerId: 5, quantity: 1 },
          { printerId: 6, quantity: 1 },
        ],
        totalAmount: 1697,
        orderDate: "2024-10-30",
      },
    ];
  }

  return { inventory, orders, printers };
}

let state: Awaited<ReturnType<typeof fetchState>> | null = null;
const getState = async () => {
  if (!state) {
    state = await fetchState();
  }
  return state;
};

app.get("/inventory", async (req, res) => {
  const { inventory, orders, printers } = await getState();
  const inventoryWithDetails = inventory.map((item) => {
    const printer = printers.find((g: Printer) => g.id === item.printerId);
    return {
      ...item,
      printer,
    };
  });
  res.json(inventoryWithDetails);
});

app.get("/orders", async (req, res) => {
  const { orders } = await getState();
  res.json(
    [...orders]
      .sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      )
      .reverse()
  );
});

// @ts-ignore
app.post("/purchase", async (req, res) => {
  const { inventory, orders, printers } = await getState();

  const { customerName, items } = req.body as {
    customerName: string;
    items: Array<{ printerId: number; quantity: number }>;
  };

  if (!customerName || !items || items.length === 0) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  let totalAmount = 0;
  for (const item of items) {
    const inventoryItem = inventory.find((i) => i.printerId === item.printerId);
    const printer = printers.find((g: Printer) => g.id === item.printerId);

    if (!inventoryItem || !printer) {
      return res
        .status(404)
        .json({ error: `Printer with id ${item.printerId} not found` });
    }

    if (inventoryItem.quantity < item.quantity) {
      return res.status(400).json({
        error: `Insufficient inventory for printer ${printer.name}. Available: ${inventoryItem.quantity}`,
      });
    }

    totalAmount += printer.price * item.quantity;
  }

  // Create order
  const order: Order = {
    id: orders.length + 1,
    customerName,
    items,
    totalAmount,
    orderDate: new Date().toISOString(),
  };

  // Update inventory
  items.forEach((item) => {
    const inventoryItem = inventory.find((i) => i.printerId === item.printerId)!;
    inventoryItem.quantity -= item.quantity;
  });

  orders.push(order);

  res.json(order);
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(
    `Printer Store Fulfillment API Server is running on port http://localhost:${PORT}`
  );
  console.log(`/inventory`);
  console.log(`/orders`);
  console.log(`/purchase`);    
});
