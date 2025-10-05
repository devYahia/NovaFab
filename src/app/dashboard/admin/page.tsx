"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  Eye,
  Edit,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react";
import Link from "next/link";

// Mock data for admin dashboard
const dashboardStats = [
  {
    title: "إجمالي العملاء",
    value: "1,234",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "إجمالي الطلبات",
    value: "856",
    change: "+8%",
    icon: ShoppingBag,
    color: "text-green-600",
  },
  {
    title: "الإيرادات",
    value: "$45,678",
    change: "+15%",
    icon: DollarSign,
    color: "text-yellow-600",
  },
  {
    title: "النمو",
    value: "23%",
    change: "+5%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "أحمد حسن",
    product: "خزانة مطبخ مخصصة",
    amount: "$2,500",
    status: "قيد التنفيذ",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "سارة محمد",
    product: "طقم غرفة معيشة",
    amount: "$3,200",
    status: "مكتمل",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "عمر علي",
    product: "مكتب مكتبي",
    amount: "$800",
    status: "في الانتظار",
    date: "2024-01-13",
  },
];

export default function DashboardAdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        
        if (response.ok) {
          const user = await response.json();
          if (user.role === "ADMIN") {
            setIsAuthorized(true);
          } else {
            // Redirect to admin login if not admin
            router.push("/admin/login");
          }
        } else {
          // Redirect to admin login if not authenticated
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">لوحة تحكم الإدارة</h1>
            <p className="text-gray-600 mt-2">
              مرحباً بك! إليك ما يحدث في عملك.
            </p>
          </div>
          <div className="flex space-x-4 space-x-reverse">
            <Link href="/admin/dashboard">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 ml-2" />
                لوحة التحكم الكاملة
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className="text-xs text-green-600 mt-1">
                    {stat.change} من الشهر الماضي
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>الطلبات الحديثة</CardTitle>
                <CardDescription>
                  آخر الطلبات التي تحتاج إلى متابعة
                </CardDescription>
              </div>
              <Link href="/admin/orders">
                <Button size="sm">عرض الكل</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{order.id}</h4>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{order.amount}</p>
                    <Badge
                      variant={
                        order.status === "مكتمل"
                          ? "default"
                          : order.status === "قيد التنفيذ"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 ml-2 text-blue-600" />
                إدارة العملاء
              </CardTitle>
              <CardDescription>
                عرض وإدارة حسابات العملاء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/customers">
                <Button className="w-full">عرض العملاء</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="h-5 w-5 ml-2 text-green-600" />
                إدارة الطلبات
              </CardTitle>
              <CardDescription>
                متابعة وإدارة جميع الطلبات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/orders">
                <Button className="w-full">عرض الطلبات</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 ml-2 text-purple-600" />
                التقارير
              </CardTitle>
              <CardDescription>
                عرض التقارير والإحصائيات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/reports">
                <Button className="w-full">عرض التقارير</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}