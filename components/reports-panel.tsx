"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Download, FileText, Send, Package, Truck } from "lucide-react"

export function ReportsPanel() {
  const [reportConfig, setReportConfig] = useState({
    reportType: "daily",
    includeInventory: true,
    includeContracts: true,
    includeShipments: true,
    includeVehicles: true,
    customMessage: "",
  })

  const [recentReports, setRecentReports] = useState([
    {
      id: "R001",
      type: "daily",
      sentDate: "2024-01-15",
      status: "sent",
      content: "Raport dzienny - 15 wydań, 2,450t",
    },
    {
      id: "R002",
      type: "weekly",
      sentDate: "2024-01-14",
      status: "sent",
      content: "Raport tygodniowy - stany magazynowe",
    },
    {
      id: "R003",
      type: "daily",
      sentDate: "2024-01-13",
      status: "sent",
      content: "Raport dzienny - 12 wydań, 1,890t",
    },
  ])

  // Mock data for yesterday's shipments
  const yesterdayShipments = [
    {
      id: "W015",
      time: "08:30",
      contractId: "K001",
      client: "Agro-Pol Sp. z o.o.",
      product: "MAP",
      quantity: 150,
      form: "bulk",
      vehicleNumber: "WZ 12345",
      driver: "Jan Kowalski",
      phone: "+48 123 456 789",
    },
    {
      id: "W016",
      time: "10:15",
      contractId: "K003",
      client: "Rolnicza Spółka",
      product: "DAP",
      quantity: 200,
      form: "bags",
      vehicleNumber: "KR 67890",
      driver: "Anna Nowak",
      phone: "+48 987 654 321",
    },
    {
      id: "W017",
      time: "14:20",
      contractId: "K002",
      client: "Nawozy Północ",
      product: "CAN",
      quantity: 100,
      form: "bulk",
      vehicleNumber: "GD 11111",
      driver: "Piotr Wiśniewski",
      phone: "+48 555 666 777",
    },
  ]

  const handleSendReport = () => {
    const newReport = {
      id: `R${String(recentReports.length + 1).padStart(3, "0")}`,
      type: reportConfig.reportType,
      sentDate: new Date().toISOString().split("T")[0],
      status: "sent",
      content: `Raport ${reportConfig.reportType} - ${yesterdayShipments.length} wydań, ${yesterdayShipments
        .reduce((sum, s) => sum + s.quantity, 0)
        .toLocaleString()}t`,
    }
    setRecentReports([newReport, ...recentReports])

    // Reset form
    setReportConfig({
      reportType: "daily",
      includeInventory: true,
      includeContracts: true,
      includeShipments: true,
      includeVehicles: true,
      customMessage: "",
    })
  }

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case "daily":
        return "Dzienny"
      case "weekly":
        return "Tygodniowy"
      case "monthly":
        return "Miesięczny"
      case "inventory":
        return "Stany Magazynowe"
      default:
        return type
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default">Wysłany</Badge>
      case "failed":
        return <Badge variant="destructive">Błąd</Badge>
      case "pending":
        return <Badge variant="secondary">Oczekuje</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalYesterdayQuantity = yesterdayShipments.reduce((sum, s) => sum + s.quantity, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Raporty dla FERTISTREAM</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formularz wysyłania raportu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Wyślij Raport do FERTISTREAM
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="reportType">Typ Raportu</Label>
              <Select
                value={reportConfig.reportType}
                onValueChange={(value) => setReportConfig({ ...reportConfig, reportType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Raport Dzienny</SelectItem>
                  <SelectItem value="weekly">Raport Tygodniowy</SelectItem>
                  <SelectItem value="monthly">Raport Miesięczny</SelectItem>
                  <SelectItem value="inventory">Stany Magazynowe</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Zawartość Raportu</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inventory"
                    checked={reportConfig.includeInventory}
                    onCheckedChange={(checked) => setReportConfig({ ...reportConfig, includeInventory: !!checked })}
                  />
                  <Label htmlFor="inventory">Stany magazynowe produktów FERTISTREAM</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contracts"
                    checked={reportConfig.includeContracts}
                    onCheckedChange={(checked) => setReportConfig({ ...reportConfig, includeContracts: !!checked })}
                  />
                  <Label htmlFor="contracts">Status kontraktów z odbiorcami</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shipments"
                    checked={reportConfig.includeShipments}
                    onCheckedChange={(checked) => setReportConfig({ ...reportConfig, includeShipments: !!checked })}
                  />
                  <Label htmlFor="shipments">Wydania z dnia poprzedzającego</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vehicles"
                    checked={reportConfig.includeVehicles}
                    onCheckedChange={(checked) => setReportConfig({ ...reportConfig, includeVehicles: !!checked })}
                  />
                  <Label htmlFor="vehicles">Dane pojazdów i kierowców</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="customMessage">Dodatkowa Wiadomość</Label>
              <Textarea
                id="customMessage"
                value={reportConfig.customMessage}
                onChange={(e) => setReportConfig({ ...reportConfig, customMessage: e.target.value })}
                placeholder="Opcjonalna wiadomość do FERTISTREAM..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSendReport} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Wyślij do FERTISTREAM
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Pobierz PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Historia raportów */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Historia Raportów
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{report.id}</span>
                      {getStatusBadge(report.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{getReportTypeLabel(report.type)}</p>
                    <p className="text-xs text-muted-foreground">{report.content}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.sentDate).toLocaleDateString("pl-PL")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Podgląd raportu dziennego */}
      <Card>
        <CardHeader>
          <CardTitle>Podgląd Raportu Dziennego - Wczoraj</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Łączne Wydania</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{totalYesterdayQuantity.toLocaleString()} t</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Pojazdy</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{yesterdayShipments.length}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Kontrakty</span>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(yesterdayShipments.map((s) => s.contractId)).size}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Szczegóły Wydań:</h4>
              {yesterdayShipments.map((shipment) => (
                <div key={shipment.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong>Godzina:</strong> {shipment.time} | <strong>Pojazd:</strong> {shipment.vehicleNumber}
                    </div>
                    <div>
                      <strong>Kierowca:</strong> {shipment.driver} | <strong>Tel:</strong> {shipment.phone}
                    </div>
                    <div>
                      <strong>Kontrakt:</strong> {shipment.contractId} | <strong>Odbiorca:</strong> {shipment.client}
                    </div>
                    <div>
                      <strong>Towar:</strong> {shipment.product} | <strong>Ilość:</strong>{" "}
                      {shipment.quantity.toLocaleString()} t ({shipment.form === "bulk" ? "Luz" : "Big Bag"})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
