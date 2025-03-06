import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface OrderCardProps {
  order: {
    id: string;
    date: string;
    status: string;
    total: string;
    items: { name: string; quantity: number; price: string }[];
  };
  expandedOrder: string | null;
  setExpandedOrder: (id: string | null) => void;
  getStatusColor: (status: string) => string;
}

export default function OrderCard({ order, expandedOrder, setExpandedOrder, getStatusColor }: OrderCardProps) {
  const isExpanded = expandedOrder === order.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">Order {order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
            >
              {isExpanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <div className="text-sm text-muted-foreground">Total: {order.total}</div>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2"
            >
              <p className="text-sm font-semibold">Items:</p>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{item.price}</span>
                </div>
              ))}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}