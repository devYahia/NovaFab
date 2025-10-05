"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
  User,
} from "lucide-react";

// Mock data - in a real app, this would come from the database
const orders = [
  {
    id: "ORD-001",
    title: "Custom Metal Bracket",
    serviceType: "CNC Machining",
    status: "in_progress",
    urgency: "high",
    totalCost: 245.5,
    estimatedDelivery: "2024-01-15",
  },
  {
    id: "ORD-002",
    title: "Prototype Housing",
    serviceType: "3D Printing",
    status: "completed",
    urgency: "medium",
    totalCost: 89.99,
    estimatedDelivery: "2024-01-10",
  },
  {
    id: "ORD-003",
    title: "Sheet Metal Panel",
    serviceType: "Laser Cutting",
    status: "pending",
    urgency: "low",
    totalCost: 156.75,
    estimatedDelivery: "2024-01-20",
  },
];

// Mock statistics
const stats = {
  totalOrders: 12,
  activeOrders: 3,
  completedOrders: 8,
  totalSpent: 1247.89,
};

export default function Dashboard() {
  // Helper functions for styling
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-red-200 text-red-700";
      case "medium":
        return "border-yellow-200 text-yellow-700";
      case "low":
        return "border-green-200 text-green-700";
      default:
        return "border-gray-200 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">مرحباً بك مرة أخرى! 👋</h1>
              <p className="text-blue-100 text-lg">
                إليك ما يحدث مع طلباتك اليوم
              </p>
            </div>
            <Link href="/dashboard/orders/new">
              <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 transition-all duration-300 hover:scale-105">
                <Plus className="h-5 w-5 mr-2" />
                طلب جديد
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">إجمالي الطلبات</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileText className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.totalOrders}</div>
            <p className="text-xs text-blue-600 mt-1">جميع الأوقات</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">الطلبات النشطة</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <Package className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-900">{stats.activeOrders}</div>
            <p className="text-xs text-orange-600 mt-1">قيد التنفيذ</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">مكتملة</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{stats.completedOrders}</div>
            <p className="text-xs text-green-600 mt-1">تم التسليم بنجاح</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">إجمالي المصروفات</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">
              ${stats.totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-purple-600 mt-1">جميع الأوقات</p>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Recent Orders */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl text-gray-800">الطلبات الأخيرة</CardTitle>
              <CardDescription className="text-gray-600">
                أحدث طلبات التصنيع الخاصة بك
              </CardDescription>
            </div>
            <Link href="/dashboard/orders">
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300 transition-colors">
                عرض الكل
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="group relative overflow-hidden rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="p-2 rounded-lg bg-blue-100">
                        {getStatusIcon(order.status)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {order.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {order.id} • {order.serviceType}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${order.totalCost.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-600">
                        تاريخ التسليم:{" "}
                        {new Date(order.estimatedDelivery).toLocaleDateString(
                          "ar-EG",
                          {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col space-y-1">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ")}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getUrgencyColor(order.urgency)}
                      >
                        {order.urgency}
                      </Badge>
                    </div>

                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                        عرض
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <Link href="/dashboard/orders/new">
            <CardHeader className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-blue-900 mb-2">
                طلب جديد
              </CardTitle>
              <CardDescription className="text-blue-700">
                ابدأ مشروع تصنيع جديد
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-green-50 to-green-100">
          <Link href="/dashboard/orders">
            <CardHeader className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-green-900 mb-2">
                عرض الطلبات
              </CardTitle>
              <CardDescription className="text-green-700">
                إدارة طلباتك الحالية
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <Link href="/dashboard/profile">
            <CardHeader className="text-center p-8">
              <div className="mx-auto w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-purple-900 mb-2">
                الملف الشخصي
              </CardTitle>
              <CardDescription className="text-purple-700">
                تحديث إعدادات حسابك
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
}