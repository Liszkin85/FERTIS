"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Truck, Phone, User, Package, Calendar } from "lucide-react"

export function ShipmentSummary() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  // Mock data for last 30 days - w rzeczywistości z bazy danych
  const last30DaysShipments = [
    // Today
    {
      id: "W020",
      date: "2024-01-16",
      time: "09:00",
      vehicleNumber: "WZ 55555",
      driver: "Tomasz Nowicki",
      phone: "+48 444 555 666",
      client: "Agro-Centrum",
      product: "SÓL POTASOWA",
      quantity: 120,
      form: "bags",
      contractId: "K006",
      status: "completed",
    },
    // Yesterday
    {
      id: "W019",
      date: "2024-01-15",
      time: "08:30",
      vehicleNumber: "WZ 12345",
      driver: "Jan Kowalski",
      phone: "+48 123 456 789",
      client: "Agro-Pol Sp. z o.o.",
      product: "MAP",
      quantity: 150,
      form: "bulk",
      contractId: "K001",
      status: "completed",
    },
    {
      id: "W018",
      date: "2024-01-15",
      time: "10:15",
      vehicleNumber: "KR 67890",
      driver: "Anna Nowak",
      phone: "+48 987 654 321",
      client: "Rolnicza Spółka",
      product: "DAP",
      quantity: 200,
      form: "bags",
      contractId: "K003",
      status: "completed",
    },
    {
      id: "W017",
      date: "2024-01-15",
      time: "14:20",
      vehicleNumber: "GD 11111",
      driver: "Piotr Wiśniewski",
      phone: "+48 555 666 777",
      client: "Nawozy Północ",
      product: "CAN",
      quantity: 100,
      form: "bulk",
      contractId: "K002",
      status: "completed",
    },
    // Day before yesterday
    {
      id: "W016",
      date: "2024-01-14",
      time: "11:30",
      vehicleNumber: "WA 99999",
      driver: "Maria Kowalczyk",
      phone: "+48 111 222 333",
      client: "Zielona Dolina",
      product: "CAN",
      quantity: 180,
      form: "bulk",
      contractId: "K005",
      status: "completed",
    },
    // Add more historical data...
    {
      id: "W015",
      date: "2024-01-13",
      time: "15:45",
      vehicleNumber: "KR 77777",
      driver: "Andrzej Kowal",
      phone: "+48 777 888 999",
      client: "Agro-Tech",
      product: "MOCZNIK",
      quantity: 220,
      form: "bags",
      contractId: "K004",
      status: "completed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Zakończone</Badge>
      case "in_progress":
        return <Badge variant="secondary">W trakcie</Badge>
      case "waiting":
        return <Badge variant="outline">Oczekuje</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Filter shipments for selected date
  const filteredShipments = last30DaysShipments.filter((s) => s.date === selectedDate)

  // Calculate statistics for last 30 days
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const last30Days = last30DaysShipments.filter((s) => new Date(s.date) >= thirtyDaysAgo)

  const totalQuantity = filteredShipments.reduce((sum, shipment) => sum + shipment.quantity, 0)
  const uniqueVehicles = new Set(filteredShipments.map((s) => s.vehicleNumber)).size
  const uniqueDrivers = new Set(filteredShipments.map((s) => s.driver)).size

  // Statistics for last 30 days
  const last30DaysTotal = last30Days.reduce((sum, s) => sum + s.quantity, 0)
  const last30DaysCount = last30Days.length
  const last30DaysAverage = last30DaysCount > 0 ? Math.round(last30DaysTotal / last30DaysCount) : 0

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Podsumowanie Wydań - Ostatnie 30 Dni</h2>
        <div className="flex items-center gap-2">
          <Label htmlFor="summaryDate">Data:</Label>
          <Input
            id="summaryDate"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-40"
          />
        </div>
      </div>

      {/* Statystyki z ostatnich 30 dni */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Statystyki z Ostatnich 30 Dni
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{last30DaysTotal.toLocaleString()} t</div>
              <p className="text-sm text-muted-foreground">Łączne wydania</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{last30DaysCount}</div>
              <p className="text-sm text-muted-foreground">Liczba wydań</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{last30DaysAverage} t</div>
              <p className="text-sm text-muted-foreground">Średnia na wydanie</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {new Set(last30Days.map((s) => s.vehicleNumber)).size}
              </div>
              <p className="text-sm text-muted-foreground">Unikalne pojazdy</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statystyki wybranego dnia */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Łączna Ilość</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity.toLocaleString()} t</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wydania</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredShipments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pojazdy</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueVehicles}</div>
            <p className="text-xs text-muted-foreground">Unikalne pojazdy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kierowcy</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueDrivers}</div>
            <p className="text-xs text-muted-foreground">Różni kierowcy</p>
          </CardContent>
        </Card>
      </div>

      {/* Szczegółowa lista wydań */}
      <Card>
        <CardHeader>
          <CardTitle>
            Lista Wydań - {new Date(selectedDate).toLocaleDateString("pl-PL")} ({filteredShipments.length} wydań)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredShipments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Godzina</TableHead>
                  <TableHead>Pojazd</TableHead>
                  <TableHead>Kierowca</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Odbiorca</TableHead>
                  <TableHead>Towar</TableHead>
                  <TableHead>Ilość (t)</TableHead>
                  <TableHead>Forma</TableHead>
                  <TableHead>Kontrakt</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.time}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        {shipment.vehicleNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {shipment.driver}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{shipment.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{shipment.client}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{shipment.product}</Badge>
                    </TableCell>
                    <TableCell>{shipment.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{shipment.form === "bulk" ? "Luz" : "Big Bag"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{shipment.contractId}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">Brak wydań w wybranym dniu</div>
          )}
        </CardContent>
      </Card>

      {/* Podsumowanie według towarów dla wybranego dnia */}
      {filteredShipments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Podsumowanie według Towarów - {new Date(selectedDate).toLocaleDateString("pl-PL")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(
                filteredShipments.reduce(
                  (acc, shipment) => {
                    if (!acc[shipment.product]) {
                      acc[shipment.product] = { bulk: 0, bags: 0, total: 0 }
                    }
                    acc[shipment.product][shipment.form] += shipment.quantity
                    acc[shipment.product].total += shipment.quantity
                    return acc
                  },
                  {} as Record<string, { bulk: number; bags: number; total: number }>,
                ),
              ).map(([product, quantities]) => (
                <div key={product} className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">{product}</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      Łącznie: <span className="font-medium">{quantities.total.toLocaleString()} t</span>
                    </div>
                    <div>
                      Luz: <span className="text-blue-600">{quantities.bulk.toLocaleString()} t</span>
                    </div>
                    <div>
                      Big Bag: <span className="text-green-600">{quantities.bags.toLocaleString()} t</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
