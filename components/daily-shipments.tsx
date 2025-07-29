"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, Package, Calendar } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function DailyShipments() {
  const [shipments, setShipments] = useState([
    {
      id: "W001",
      date: "2024-01-15",
      contractId: "K001",
      client: "Agro-Pol Sp. z o.o.",
      product: "MAP",
      quantity: 150,
      form: "bulk",
      vehicleNumber: "WZ 12345",
      driver: "Jan Kowalski",
      driverPhone: "+48 123 456 789",
    },
    {
      id: "W002",
      date: "2024-01-15",
      contractId: "K003",
      client: "Rolnicza Spółka",
      product: "DAP",
      quantity: 200,
      form: "bags",
      vehicleNumber: "KR 67890",
      driver: "Anna Nowak",
      driverPhone: "+48 987 654 321",
    },
    {
      id: "W003",
      date: "2024-01-14",
      contractId: "K002",
      client: "Nawozy Północ",
      product: "CAN",
      quantity: 100,
      form: "bulk",
      vehicleNumber: "GD 11111",
      driver: "Piotr Wiśniewski",
      driverPhone: "+48 555 666 777",
    },
  ])

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newShipment, setNewShipment] = useState({
    contractId: "",
    quantity: "",
    form: "bulk",
    vehicleNumber: "",
    driver: "",
    driverPhone: "",
  })

  const [importData, setImportData] = useState("")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)

  const handleAddShipment = () => {
    if (newShipment.contractId && newShipment.quantity && newShipment.vehicleNumber && newShipment.driver) {
      const shipment = {
        id: `W${String(shipments.length + 1).padStart(3, "0")}`,
        date: selectedDate,
        client: "Klient", // W rzeczywistości pobrane z kontraktu
        product: "N/A",
        ...newShipment,
        quantity: Number.parseInt(newShipment.quantity),
      }
      setShipments([...shipments, shipment])
      setNewShipment({
        contractId: "",
        quantity: "",
        form: "bulk",
        vehicleNumber: "",
        driver: "",
        driverPhone: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const filteredShipments = shipments.filter((s) => s.date === selectedDate)
  const dailyTotal = filteredShipments.reduce((sum, s) => sum + s.quantity, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dzienne Wydania Towarów</h2>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importuj CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Import Danych Wydań</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="csvData">Dane CSV</Label>
                  <Textarea
                    id="csvData"
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Wklej dane CSV w formacie: Kontrakt,Ilość,Forma,Pojazd,Kierowca,Telefon"
                    rows={10}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Format: Kontrakt,Ilość,Forma,Pojazd,Kierowca,Telefon
                  <br />
                  Przykład: K001,150,bulk,WZ 12345,Jan Kowalski,+48 123 456 789
                </div>
                <Button
                  onClick={() => {
                    // Process CSV import logic here
                    setIsImportDialogOpen(false)
                    setImportData("")
                  }}
                  className="w-full"
                >
                  Importuj Dane
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Package className="h-4 w-4 mr-2" />
                Dodaj Wydanie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Dodaj Wydanie Towaru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contractId">Kontrakt</Label>
                  <Select
                    value={newShipment.contractId}
                    onValueChange={(value) => setNewShipment({ ...newShipment, contractId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz kontrakt" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="K001">K001 - Agro-Pol Sp. z o.o.</SelectItem>
                      <SelectItem value="K002">K002 - Nawozy Północ</SelectItem>
                      <SelectItem value="K003">K003 - Rolnicza Spółka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Ilość (t)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newShipment.quantity}
                    onChange={(e) => setNewShipment({ ...newShipment, quantity: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="form">Forma</Label>
                  <Select
                    value={newShipment.form}
                    onValueChange={(value) => setNewShipment({ ...newShipment, form: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bulk">Luz</SelectItem>
                      <SelectItem value="bags">Big Bag</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="vehicleNumber">Numer Pojazdu</Label>
                  <Input
                    id="vehicleNumber"
                    value={newShipment.vehicleNumber}
                    onChange={(e) => setNewShipment({ ...newShipment, vehicleNumber: e.target.value })}
                    placeholder="np. WZ 12345"
                  />
                </div>
                <div>
                  <Label htmlFor="driver">Kierowca</Label>
                  <Input
                    id="driver"
                    value={newShipment.driver}
                    onChange={(e) => setNewShipment({ ...newShipment, driver: e.target.value })}
                    placeholder="Imię i nazwisko"
                  />
                </div>
                <div>
                  <Label htmlFor="driverPhone">Telefon Kierowcy</Label>
                  <Input
                    id="driverPhone"
                    value={newShipment.driverPhone || ""}
                    onChange={(e) => setNewShipment({ ...newShipment, driverPhone: e.target.value })}
                    placeholder="+48 123 456 789"
                  />
                </div>
                <Button onClick={handleAddShipment} className="w-full">
                  Dodaj Wydanie
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Wybór daty i podsumowanie */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wydania Dzienne</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredShipments.length}</div>
            <p className="text-xs text-muted-foreground">{new Date(selectedDate).toLocaleDateString("pl-PL")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Całkowita Ilość</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyTotal.toLocaleString()} t</div>
            <p className="text-xs text-muted-foreground">Wydano w wybranym dniu</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Wydania z dnia {new Date(selectedDate).toLocaleDateString("pl-PL")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Kontrakt</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Towar</TableHead>
                <TableHead>Ilość (t)</TableHead>
                <TableHead>Forma</TableHead>
                <TableHead>Pojazd</TableHead>
                <TableHead>Kierowca</TableHead>
                <TableHead>Telefon</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredShipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{shipment.contractId}</Badge>
                  </TableCell>
                  <TableCell>{shipment.client}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{shipment.product}</Badge>
                  </TableCell>
                  <TableCell>{shipment.quantity.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{shipment.form === "bulk" ? "Luz" : "Big Bag"}</Badge>
                  </TableCell>
                  <TableCell>{shipment.vehicleNumber}</TableCell>
                  <TableCell>{shipment.driver}</TableCell>
                  <TableCell className="text-sm">{shipment.driverPhone}</TableCell>
                </TableRow>
              ))}
              {filteredShipments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    Brak wydań w wybranym dniu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
