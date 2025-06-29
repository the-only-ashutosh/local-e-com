"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, Star, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: string;
  timeline: {
    step: string;
    date: string;
    completed: boolean;
    description: string;
  }[];
}

interface UserDashboardTimelineProps {
  className?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15T10:30:00Z',
    status: 'shipped',
    total: 299.99,
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2024-01-18',
    shippingAddress: '123 Main St, Valsad, Gujarat',
    items: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 299.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'
      }
    ],
    timeline: [
      {
        step: 'Order Placed',
        date: '2024-01-15T10:30:00Z',
        completed: true,
        description: 'Your order has been confirmed'
      },
      {
        step: 'Processing',
        date: '2024-01-15T14:00:00Z',
        completed: true,
        description: 'Order is being prepared'
      },
      {
        step: 'Shipped',
        date: '2024-01-16T09:00:00Z',
        completed: true,
        description: 'Package is on its way'
      },
      {
        step: 'Out for Delivery',
        date: '',
        completed: false,
        description: 'Package is out for delivery'
      },
      {
        step: 'Delivered',
        date: '',
        completed: false,
        description: 'Package delivered successfully'
      }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-10T15:45:00Z',
    status: 'delivered',
    total: 159.98,
    shippingAddress: '123 Main St, Valsad, Gujarat',
    items: [
      {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        quantity: 2,
        price: 29.99,
        image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
      },
      {
        id: '3',
        name: 'Premium Coffee Beans',
        quantity: 1,
        price: 99.99,
        image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg'
      }
    ],
    timeline: [
      {
        step: 'Order Placed',
        date: '2024-01-10T15:45:00Z',
        completed: true,
        description: 'Your order has been confirmed'
      },
      {
        step: 'Processing',
        date: '2024-01-10T18:00:00Z',
        completed: true,
        description: 'Order is being prepared'
      },
      {
        step: 'Shipped',
        date: '2024-01-11T10:00:00Z',
        completed: true,
        description: 'Package is on its way'
      },
      {
        step: 'Out for Delivery',
        date: '2024-01-12T08:00:00Z',
        completed: true,
        description: 'Package is out for delivery'
      },
      {
        step: 'Delivered',
        date: '2024-01-12T16:30:00Z',
        completed: true,
        description: 'Package delivered successfully'
      }
    ]
  }
];

export function UserDashboardTimeline({ className = '' }: UserDashboardTimelineProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing':
        return Clock;
      case 'shipped':
        return Truck;
      case 'delivered':
        return CheckCircle;
      default:
        return Package;
    }
  };

  const getProgressPercentage = (timeline: Order['timeline']) => {
    const completedSteps = timeline.filter(step => step.completed).length;
    return (completedSteps / timeline.length) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          
          {mockOrders.map((order, index) => {
            const StatusIcon = getStatusIcon(order.status);
            const isSelected = selectedOrder === order.id;
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedOrder(isSelected ? null : order.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-lg">
                          <StatusIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.date)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="text-sm font-semibold mt-1">
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Order Progress</span>
                        <span>{Math.round(getProgressPercentage(order.timeline))}%</span>
                      </div>
                      <Progress value={getProgressPercentage(order.timeline)} className="h-2" />
                    </div>

                    {/* Order Items Preview */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}:
                      </span>
                      <div className="flex gap-1">
                        {order.items.slice(0, 3).map((item) => (
                          <div key={item.id} className="w-8 h-8 rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                            <span className="text-xs">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === 'shipped' && (
                        <Button variant="outline" size="sm">
                          <Truck className="h-4 w-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-2" />
                          Rate Items
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Order Timeline Detail */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Order Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const order = mockOrders.find(o => o.id === selectedOrder);
                    if (!order) return null;

                    return (
                      <div className="space-y-6">
                        {/* Order Info */}
                        <div className="space-y-2">
                          <h4 className="font-semibold">{order.id}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{order.shippingAddress}</span>
                          </div>
                          {order.trackingNumber && (
                            <p className="text-sm">
                              <span className="font-medium">Tracking:</span> {order.trackingNumber}
                            </p>
                          )}
                          {order.estimatedDelivery && (
                            <p className="text-sm">
                              <span className="font-medium">Est. Delivery:</span>{' '}
                              {new Date(order.estimatedDelivery).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        {/* Timeline */}
                        <div className="space-y-4">
                          {order.timeline.map((step, index) => (
                            <div key={index} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className={`
                                  w-8 h-8 rounded-full border-2 flex items-center justify-center
                                  ${step.completed 
                                    ? 'bg-primary border-primary text-primary-foreground' 
                                    : 'bg-background border-muted-foreground text-muted-foreground'
                                  }
                                `}>
                                  {step.completed ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-current" />
                                  )}
                                </div>
                                {index < order.timeline.length - 1 && (
                                  <div className={`
                                    w-0.5 h-8 mt-1
                                    ${step.completed ? 'bg-primary' : 'bg-muted'}
                                  `} />
                                )}
                              </div>
                              
                              <div className="flex-1 pb-4">
                                <h5 className={`font-medium ${
                                  step.completed ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {step.step}
                                </h5>
                                <p className="text-sm text-muted-foreground">
                                  {step.description}
                                </p>
                                {step.date && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {formatDate(step.date)}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="sticky top-4">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h4 className="font-semibold mb-2">Select an Order</h4>
                <p className="text-sm text-muted-foreground">
                  Click on an order to view its detailed timeline and tracking information.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}