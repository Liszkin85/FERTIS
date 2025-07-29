"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShipManagement } from "@/components/ship-management"
import { ContractManagement } from "@/components/contract-management"
import { InventoryOverview } from "@/components/inventory-overview"
import { DailyShipments } from "@/components/daily-shipments"
import { ReportsPanel } from "@/components/reports-panel"
import { Ship, Package, FileText, TrendingUp, Mail, Truck } from "lucide-react"
import { ShipmentSummary } from "@/components/shipment-summary"

export default function WarehouseManagement() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">FERTISTREAM - System Zarządzania Magazynem</h1>
            <div className="text-sm text-gray-500">{new Date().toLocaleDateString("pl-PL")}</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Przegląd
            </TabsTrigger>
            <TabsTrigger value="ships" className="flex items-center gap-2">
              <Ship className="h-4 w-4" />
              Statki
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Kontrakty
            </TabsTrigger>
            <TabsTrigger value="shipments" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Wydania
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Podsumowanie
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Raporty
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <InventoryOverview />
          </TabsContent>

          <TabsContent value="ships">
            <ShipManagement />
          </TabsContent>

          <TabsContent value="contracts">
            <ContractManagement />
          </TabsContent>

          <TabsContent value="shipments">
            <DailyShipments />
          </TabsContent>

          <TabsContent value="summary">
            <ShipmentSummary />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
