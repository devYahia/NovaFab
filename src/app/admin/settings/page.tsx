"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Factory,
  Settings,
  Save,
  RefreshCw,
  Upload,
  Download,
  Database,
  Mail,
  Shield,
  Globe,
  CreditCard,
  Bell,
  Users,
  FileText,
  Palette,
  Server,
  Key,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Truck,
  Zap,
  Cloud,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

// Mock settings data
const mockSettings = {
  general: {
    companyName: "NovaFab Manufacturing",
    companyEmail: "info@novafab.com",
    companyPhone: "+1 (555) 123-4567",
    companyAddress: "123 Industrial Ave, Manufacturing City, MC 12345",
    website: "https://novafab.com",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
  },
  business: {
    businessHours: {
      monday: { open: "08:00", close: "17:00", enabled: true },
      tuesday: { open: "08:00", close: "17:00", enabled: true },
      wednesday: { open: "08:00", close: "17:00", enabled: true },
      thursday: { open: "08:00", close: "17:00", enabled: true },
      friday: { open: "08:00", close: "17:00", enabled: true },
      saturday: { open: "09:00", close: "15:00", enabled: true },
      sunday: { open: "10:00", close: "14:00", enabled: false },
    },
    leadTime: {
      "3d_printing": 3,
      cnc_machining: 5,
      injection_molding: 10,
      laser_cutting: 2,
    },
    pricing: {
      rushOrderMultiplier: 1.5,
      bulkDiscountThreshold: 100,
      bulkDiscountPercentage: 15,
      minimumOrderValue: 50,
    },
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    paymentAlerts: true,
    systemAlerts: true,
    marketingEmails: false,
    weeklyReports: true,
    monthlyReports: true,
  },
  integrations: {
    cloudinary: {
      enabled: true,
      cloudName: "novafab-cloud",
      status: "connected",
    },
    stripe: {
      enabled: true,
      publishableKey: "pk_test_...",
      status: "connected",
    },
    sendgrid: {
      enabled: true,
      apiKey: "SG.***",
      status: "connected",
    },
    analytics: {
      enabled: true,
      trackingId: "GA-123456789",
      status: "connected",
    },
  },
  security: {
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },
    ipWhitelist: [],
    apiRateLimit: 1000,
  },
  system: {
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    backupFrequency: "daily",
    lastBackup: "2024-02-15T02:00:00Z",
    systemVersion: "2.1.4",
    databaseVersion: "14.2",
    uptime: "99.9%",
  },
};

interface BusinessHour {
  open: string;
  close: string;
  enabled: boolean;
}

interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
}

interface Integration {
  enabled: boolean;
  status: string;
  [key: string]: any;
}

interface Settings {
  general: {
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    website: string;
    timezone: string;
    currency: string;
    language: string;
  };
  business: {
    businessHours: Record<string, BusinessHour>;
    leadTime: Record<string, number>;
    pricing: Record<string, number>;
  };
  notifications: Record<string, boolean>;
  integrations: Record<string, Integration>;
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordPolicy: PasswordPolicy;
    ipWhitelist: string[];
    apiRateLimit: number;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
    logLevel: string;
    backupFrequency: string;
    lastBackup: string;
    systemVersion: string;
    databaseVersion: string;
    uptime: string;
  };
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>(mockSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "business", label: "Business", icon: Factory },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "security", label: "Security", icon: Shield },
    { id: "system", label: "System", icon: Server },
  ];

  const handleInputChange = (
    section: keyof Settings,
    field: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      } as any,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings);
    setHasChanges(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Connected
          </Badge>
        );
      case "disconnected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Disconnected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>
            Basic company details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <Input
                value={settings.general.companyName}
                onChange={(e) =>
                  handleInputChange("general", "companyName", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={settings.general.companyEmail}
                onChange={(e) =>
                  handleInputChange("general", "companyEmail", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <Input
                value={settings.general.companyPhone}
                onChange={(e) =>
                  handleInputChange("general", "companyPhone", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <Input
                value={settings.general.website}
                onChange={(e) =>
                  handleInputChange("general", "website", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <Input
              value={settings.general.companyAddress}
              onChange={(e) =>
                handleInputChange("general", "companyAddress", e.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                value={settings.general.timezone}
                onChange={(e) =>
                  handleInputChange("general", "timezone", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={settings.general.currency}
                onChange={(e) =>
                  handleInputChange("general", "currency", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={settings.general.language}
                onChange={(e) =>
                  handleInputChange("general", "language", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBusinessSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Hours</CardTitle>
          <CardDescription>
            Configure operating hours for each day of the week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.business.businessHours).map(
              ([day, hours]) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={hours.enabled}
                      onChange={(e) =>
                        handleInputChange("business", "businessHours", {
                          ...settings.business.businessHours,
                          [day]: { ...hours, enabled: e.target.checked },
                        })
                      }
                      className="rounded"
                    />
                    <span className="font-medium capitalize">{day}</span>
                  </div>
                  {hours.enabled && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) =>
                          handleInputChange("business", "businessHours", {
                            ...settings.business.businessHours,
                            [day]: { ...hours, open: e.target.value },
                          })
                        }
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) =>
                          handleInputChange("business", "businessHours", {
                            ...settings.business.businessHours,
                            [day]: { ...hours, close: e.target.value },
                          })
                        }
                        className="w-24"
                      />
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Times</CardTitle>
          <CardDescription>
            Default lead times for each service (in days)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.business.leadTime).map(
              ([service, days]) => (
                <div key={service}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {service.replace("_", " ")}
                  </label>
                  <Input
                    type="number"
                    value={days}
                    onChange={(e) =>
                      handleInputChange("business", "leadTime", {
                        ...settings.business.leadTime,
                        [service]: parseInt(e.target.value),
                      })
                    }
                    min="1"
                  />
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Configuration</CardTitle>
          <CardDescription>
            Configure pricing rules and discounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rush Order Multiplier
              </label>
              <Input
                type="number"
                step="0.1"
                value={settings.business.pricing.rushOrderMultiplier}
                onChange={(e) =>
                  handleInputChange("business", "pricing", {
                    ...settings.business.pricing,
                    rushOrderMultiplier: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Value ($)
              </label>
              <Input
                type="number"
                value={settings.business.pricing.minimumOrderValue}
                onChange={(e) =>
                  handleInputChange("business", "pricing", {
                    ...settings.business.pricing,
                    minimumOrderValue: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bulk Discount Threshold
              </label>
              <Input
                type="number"
                value={settings.business.pricing.bulkDiscountThreshold}
                onChange={(e) =>
                  handleInputChange("business", "pricing", {
                    ...settings.business.pricing,
                    bulkDiscountThreshold: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bulk Discount (%)
              </label>
              <Input
                type="number"
                value={settings.business.pricing.bulkDiscountPercentage}
                onChange={(e) =>
                  handleInputChange("business", "pricing", {
                    ...settings.business.pricing,
                    bulkDiscountPercentage: parseInt(e.target.value),
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, enabled]) => (
              <div
                key={key}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h4 className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {key === "emailNotifications" &&
                      "Receive notifications via email"}
                    {key === "smsNotifications" &&
                      "Receive notifications via SMS"}
                    {key === "orderUpdates" &&
                      "Get notified about order status changes"}
                    {key === "paymentAlerts" &&
                      "Receive payment and billing alerts"}
                    {key === "systemAlerts" &&
                      "Get notified about system issues"}
                    {key === "marketingEmails" &&
                      "Receive marketing and promotional emails"}
                    {key === "weeklyReports" &&
                      "Receive weekly business reports"}
                    {key === "monthlyReports" &&
                      "Receive monthly business reports"}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={enabled as boolean}
                  onChange={(e) =>
                    handleInputChange("notifications", key, e.target.checked)
                  }
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Integrations</CardTitle>
          <CardDescription>
            Manage connections to external services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(settings.integrations).map(([service, config]) => (
              <div key={service} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded">
                      {service === "cloudinary" && (
                        <Cloud className="h-5 w-5" />
                      )}
                      {service === "stripe" && (
                        <CreditCard className="h-5 w-5" />
                      )}
                      {service === "sendgrid" && <Mail className="h-5 w-5" />}
                      {service === "analytics" && <Globe className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-medium capitalize">{service}</h4>
                      <p className="text-sm text-gray-600">
                        {service === "cloudinary" &&
                          "Image and file storage service"}
                        {service === "stripe" && "Payment processing platform"}
                        {service === "sendgrid" && "Email delivery service"}
                        {service === "analytics" &&
                          "Website analytics tracking"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(config.status)}
                    <input
                      type="checkbox"
                      checked={config.enabled}
                      onChange={(e) =>
                        handleInputChange("integrations", service, {
                          ...config,
                          enabled: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                  </div>
                </div>

                {config.enabled && (
                  <div className="space-y-3">
                    {service === "cloudinary" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cloud Name
                        </label>
                        <Input value={config.cloudName} readOnly />
                      </div>
                    )}
                    {service === "stripe" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Publishable Key
                        </label>
                        <div className="relative">
                          <Input
                            type={showApiKeys ? "text" : "password"}
                            value={config.publishableKey}
                            readOnly
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowApiKeys(!showApiKeys)}
                          >
                            {showApiKeys ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    {service === "sendgrid" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          API Key
                        </label>
                        <div className="relative">
                          <Input
                            type={showApiKeys ? "text" : "password"}
                            value={config.apiKey}
                            readOnly
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowApiKeys(!showApiKeys)}
                          >
                            {showApiKeys ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                    {service === "analytics" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tracking ID
                        </label>
                        <Input value={config.trackingId} readOnly />
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Test Connection
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Configure security policies and access controls
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">
                Require 2FA for admin accounts
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.security.twoFactorAuth}
              onChange={(e) =>
                handleInputChange("security", "twoFactorAuth", e.target.checked)
              }
              className="rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <Input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                handleInputChange(
                  "security",
                  "sessionTimeout",
                  parseInt(e.target.value),
                )
              }
              min="5"
              max="480"
            />
          </div>

          <div>
            <h4 className="font-medium mb-4">Password Policy</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Length
                </label>
                <Input
                  type="number"
                  value={settings.security.passwordPolicy.minLength}
                  onChange={(e) =>
                    handleInputChange("security", "passwordPolicy", {
                      ...settings.security.passwordPolicy,
                      minLength: parseInt(e.target.value),
                    })
                  }
                  min="6"
                  max="32"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireUppercase}
                    onChange={(e) =>
                      handleInputChange("security", "passwordPolicy", {
                        ...settings.security.passwordPolicy,
                        requireUppercase: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">Require uppercase</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireLowercase}
                    onChange={(e) =>
                      handleInputChange("security", "passwordPolicy", {
                        ...settings.security.passwordPolicy,
                        requireLowercase: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">Require lowercase</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireNumbers}
                    onChange={(e) =>
                      handleInputChange("security", "passwordPolicy", {
                        ...settings.security.passwordPolicy,
                        requireNumbers: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">Require numbers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.security.passwordPolicy.requireSymbols}
                    onChange={(e) =>
                      handleInputChange("security", "passwordPolicy", {
                        ...settings.security.passwordPolicy,
                        requireSymbols: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <label className="text-sm">Require symbols</label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Rate Limit (requests/hour)
            </label>
            <Input
              type="number"
              value={settings.security.apiRateLimit}
              onChange={(e) =>
                handleInputChange(
                  "security",
                  "apiRateLimit",
                  parseInt(e.target.value),
                )
              }
              min="100"
              max="10000"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current system information and health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {settings.system.uptime as string}
              </p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {settings.system.systemVersion as string}
              </p>
              <p className="text-sm text-gray-600">System Version</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {settings.system.databaseVersion as string}
              </p>
              <p className="text-sm text-gray-600">Database Version</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>
            Configure system behavior and maintenance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Maintenance Mode</h4>
              <p className="text-sm text-gray-600">
                Put the system in maintenance mode
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.system.maintenanceMode as boolean}
              onChange={(e) =>
                handleInputChange("system", "maintenanceMode", e.target.checked)
              }
              className="rounded"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Debug Mode</h4>
              <p className="text-sm text-gray-600">
                Enable detailed error logging
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.system.debugMode as boolean}
              onChange={(e) =>
                handleInputChange("system", "debugMode", e.target.checked)
              }
              className="rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Log Level
            </label>
            <select
              value={settings.system.logLevel as string}
              onChange={(e) =>
                handleInputChange("system", "logLevel", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="error">Error</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backup Frequency
            </label>
            <select
              value={settings.system.backupFrequency as string}
              onChange={(e) =>
                handleInputChange("system", "backupFrequency", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Last Backup</h4>
              <Badge className="bg-green-100 text-green-800">
                {new Date(
                  settings.system.lastBackup as string,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </Badge>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Backup
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <Factory className="h-6 w-6 text-blue-600" />
                <span className="font-bold">NovaFab</span>
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <span>Admin</span>
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-xl font-bold text-gray-900">Settings</span>
            </div>

            <div className="flex items-center space-x-2">
              {hasChanges && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                            : "text-gray-700"
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "general" && renderGeneralSettings()}
            {activeTab === "business" && renderBusinessSettings()}
            {activeTab === "notifications" && renderNotificationSettings()}
            {activeTab === "integrations" && renderIntegrationsSettings()}
            {activeTab === "security" && renderSecuritySettings()}
            {activeTab === "system" && renderSystemSettings()}
          </div>
        </div>
      </div>
    </div>
  );
}
