"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Ship, Package, FileText, AlertTriangle } from "lucide-react"

export function InventoryOverview() {
  // Mock data - w rzeczywistej aplikacji dane pochodziłyby z bazy danych
  const inventoryData = {
    totalStock: {
      MAP: { bulk: 2500, bags: 1200, total: 3700 },
      CAN: { bulk: 1800, bags: 800, total: 2600 },
      DAP: { bulk: 3200, bags: 1500, total: 4700 },
      "SÓL POTASOWA": { bulk: 1500, bags: 600, total: 2100 },
      MOCZNIK: { bulk: 2200, bags: 1100, total: 3300 },
      "MOCZNIK TECHNICZNY": { bulk: 800, bags: 400, total: 1200 },
    },
    contractedStock: {
      MAP: { bulk: 1800, bags: 1000, total: 2800 },
      CAN: { bulk: 1200, bags: 700, total: 1900 },
      DAP: { bulk: 2500, bags: 1000, total: 3500 },
      "SÓL POTASOWA": { bulk: 800, bags: 400, total: 1200 },
      MOCZNIK: { bulk: 1500, bags: 600, total: 2100 },
      "MOCZNIK TECHNICZNY": { bulk: 500, bags: 200, total: 700 },
    },
    activeShips: 3,
    activeContracts: 8,
    pendingShipments: 12,
  }

  // Calculate totals
  const totalInventory = Object.values(inventoryData.totalStock).reduce((sum, product) => sum + product.total, 0)
  const totalContracted = Object.values(inventoryData.contractedStock).reduce((sum, qty) => sum + qty.total, 0)
  const totalUncontracted = totalInventory - totalContracted

  // Calculate uncontracted by form
  const uncontractedByForm = Object.entries(inventoryData.totalStock).reduce(
    (acc, [product, stock]) => {
      const contracted = inventoryData.contractedStock[product] || { bulk: 0, bags: 0 }
      const uncontractedBulk = stock.bulk - contracted.bulk
      const uncontractedBags = stock.bags - contracted.bags

      acc.bulk += Math.max(0, uncontractedBulk)
      acc.bags += Math.max(0, uncontractedBags)
      return acc
    },
    { bulk: 0, bags: 0 },
  )

  const totalContractedByForm = Object.values(inventoryData.contractedStock).reduce(
    (acc, contracted) => {
      acc.bulk += contracted.bulk
      acc.bags += contracted.bags
      return acc
    },
    { bulk: 0, bags: 0 },
  )

  const contracts = [
    { id: "K001", client: "Agro-Pol Sp. z o.o.", quantity: 2500, remaining: 1800, form: "Luz", status: "active" },
    { id: "K002", client: "Nawozy Północ", quantity: 1500, remaining: 1500, form: "Big Bag", status: "active" },
    { id: "K003", client: "Rolnicza Spółka", quantity: 3200, remaining: 800, form: "Luz", status: "active" },
    { id: "K004", client: "Agro-Tech", quantity: 1800, remaining: 0, form: "Big Bag", status: "completed" },
  ]

  const ships = [
    { id: "S001", name: "MV Baltic Star", cargo: "MAP", quantity: 5200, status: "unloading" },
    { id: "S002", name: "MV North Wind", cargo: "MOCZNIK", quantity: 3800, status: "waiting" },
    { id: "S003", name: "MV Sea Eagle", cargo: "DAP", quantity: 2400, status: "completed" },
  ]

  return (
    <div className="space-y-6">
      {/* Statystyki główne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Całkowity Stan</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInventory.toLocaleString()} t</div>
            <p className="text-xs text-muted-foreground">
              Luz:{" "}
              {Object.values(inventoryData.totalStock)
                .reduce((sum, p) => sum + p.bulk, 0)
                .toLocaleString()}{" "}
              t | Worki:{" "}
              {Object.values(inventoryData.totalStock)
                .reduce((sum, p) => sum + p.bags, 0)
                .toLocaleString()}{" "}
              t
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Towar Zakontraktowany</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContracted.toLocaleString()} t</div>
            <p className="text-xs text-muted-foreground">
              Luz: {totalContractedByForm.bulk.toLocaleString()} t | Worki:{" "}
              {totalContractedByForm.bags.toLocaleString()} t
            </p>
            <Progress value={(totalContracted / totalInventory) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Towar Bez Kontraktu</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUncontracted.toLocaleString()} t</div>
            <p className="text-xs text-muted-foreground">
              Luz: {uncontractedByForm.bulk.toLocaleString()} t | Worki: {uncontractedByForm.bags.toLocaleString()} t
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne Statki</CardTitle>
            <Ship className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.activeShips}</div>
            <p className="text-xs text-muted-foreground">{inventoryData.activeContracts} aktywnych kontraktów</p>
          </CardContent>
        </Card>
      </div>

      {/* Szczegółowy podział na towary */}
      <Card>
        <CardHeader>
          <CardTitle>Szczegółowy Podział Stanów Magazynowych</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(inventoryData.totalStock).map(([product, stock]) => {
              const contracted = inventoryData.contractedStock[product] || { bulk: 0, bags: 0, total: 0 }
              const uncontractedBulk = Math.max(0, stock.bulk - contracted.bulk)
              const uncontractedBags = Math.max(0, stock.bags - contracted.bags)
              const contractedPercentage = (contracted.total / stock.total) * 100

              return (
                <div key={product} className="p-6 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{product}</h3>
                      <p className="text-sm text-muted-foreground">Całkowity stan: {stock.total.toLocaleString()} t</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {contractedPercentage.toFixed(1)}% zakontraktowane
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Towar zakontraktowany */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-green-700 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Zakontraktowane: {contracted.total.toLocaleString()} t
                      </h4>
                      <div className="space-y-2 pl-6">
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">Luz:</span>
                          <span className="font-medium text-green-700">{contracted.bulk.toLocaleString()} t</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span className="text-sm">Big Bag:</span>
                          <span className="font-medium text-green-700">{contracted.bags.toLocaleString()} t</span>
                        </div>
                      </div>
                    </div>

                    {/* Towar bez kontraktu */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-orange-700 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Bez kontraktu: {(uncontractedBulk + uncontractedBags).toLocaleString()} t
                      </h4>
                      <div className="space-y-2 pl-6">
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="text-sm">Luz:</span>
                          <span className="font-medium text-orange-700">{uncontractedBulk.toLocaleString()} t</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                          <span className="text-sm">Big Bag:</span>
                          <span className="font-medium text-orange-700">{uncontractedBags.toLocaleString()} t</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Progress value={contractedPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0 t</span>
                      <span>{stock.total.toLocaleString()} t</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Aktywne kontrakty */}
      <Card>
        <CardHeader>
          <CardTitle>Aktywne Kontrakty FERTISTREAM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{contract.id}</span>
                    <Badge variant={contract.status === "active" ? "default" : "secondary"}>
                      {contract.status === "active" ? "Aktywny" : "Zakończony"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Odbiorca: {contract.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {contract.remaining.toLocaleString()} / {contract.quantity.toLocaleString()} t
                  </p>
                  <p className="text-sm text-muted-foreground">{contract.form}</p>
                </div>
                <div className="w-24 ml-4">
                  <Progress value={(contract.remaining / contract.quantity) * 100} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statki w terminalu */}
      <Card>
        <CardHeader>
          <CardTitle>Statki FERTISTREAM w Terminalu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ships.map((ship) => (
              <div key={ship.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{ship.name}</span>
                    <Badge
                      variant={
                        ship.status === "unloading" ? "default" : ship.status === "waiting" ? "secondary" : "outline"
                      }
                    >
                      {ship.status === "unloading"
                        ? "Rozładunek"
                        : ship.status === "waiting"
                          ? "Oczekuje"
                          : "Zakończony"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{ship.cargo}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{ship.quantity.toLocaleString()} t</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
