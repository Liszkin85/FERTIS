"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Ship } from "lucide-react"

export function ShipManagement() {
  const [ships, setShips] = useState([
    {
      id: "S001",
      name: "MV Baltic Star",
      client: "FERTISTREAM",
      cargo: "MAP",
      quantity: 5200,
      unloadingDate: "2024-01-15",
      status: "unloading",
      storageForm: "bulk",
    },
    {
      id: "S002",
      name: "MV North Wind",
      client: "FERTISTREAM",
      cargo: "MOCZNIK",
      quantity: 3800,
      unloadingDate: "2024-01-16",
      status: "waiting",
      storageForm: "bags",
    },
    {
      id: "S003",
      name: "MV Sea Eagle",
      client: "FERTISTREAM",
      cargo: "DAP",
      quantity: 2400,
      unloadingDate: "2024-01-14",
      status: "completed",
      storageForm: "bulk",
    },
    {
      id: "S004",
      name: "MV Ocean Pride",
      client: "FERTISTREAM",
      cargo: "CAN",
      quantity: 3100,
      unloadingDate: "2024-01-10",
      status: "completed",
      storageForm: "bulk",
    },
    {
      id: "S005",
      name: "MV Baltic Queen",
      client: "FERTISTREAM",
      cargo: "SÓL POTASOWA",
      quantity: 2800,
      unloadingDate: "2024-01-08",
      status: "completed",
      storageForm: "bags",
    },
  ])

  const [newShip, setNewShip] = useState({
    name: "",
    client: "FERTISTREAM",
    cargo: "",
    quantity: "",
    unloadingDate: "",
    status: "waiting",
    storageForm: "bulk",
  })

  const [editingShip, setEditingShip] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const handleAddShip = () => {
    if (newShip.name && newShip.cargo && newShip.quantity) {
      const ship = {
        id: `S${String(ships.length + 1).padStart(3, "0")}`,
        ...newShip,
        quantity: Number.parseInt(newShip.quantity),
      }
      setShips([...ships, ship])
      setNewShip({
        name: "",
        client: "FERTISTREAM",
        cargo: "",
        quantity: "",
        unloadingDate: "",
        status: "waiting",
        storageForm: "bulk",
      })
      setIsDialogOpen(false)
    }
  }

  const handleEditShip = (ship: any) => {
    setEditingShip({ ...ship })
    setIsEditDialogOpen(true)
  }

  const handleSaveShip = () => {
    if (editingShip) {
      setShips(ships.map((s) => (s.id === editingShip.id ? editingShip : s)))
      setIsEditDialogOpen(false)
      setEditingShip(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unloading":
        return <Badge variant="default">Rozładunek</Badge>
      case "waiting":
        return <Badge variant="secondary">Oczekuje</Badge>
      case "completed":
        return <Badge variant="outline">Zakończony</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Statki FERTISTREAM - Historia Kompletna</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj Statek
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Dodaj Nowy Statek</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="shipName">Nazwa Statku</Label>
                <Input
                  id="shipName"
                  value={newShip.name}
                  onChange={(e) => setNewShip({ ...newShip, name: e.target.value })}
                  placeholder="np. MV Baltic Star"
                />
              </div>
              <div>
                <Label htmlFor="client">Klient</Label>
                <Input id="client" value="FERTISTREAM" disabled className="bg-gray-100" />
              </div>
              <div>
                <Label htmlFor="cargo">Rodzaj Ładunku</Label>
                <Select value={newShip.cargo} onValueChange={(value) => setNewShip({ ...newShip, cargo: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz towar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAP">MAP</SelectItem>
                    <SelectItem value="CAN">CAN</SelectItem>
                    <SelectItem value="DAP">DAP</SelectItem>
                    <SelectItem value="SÓL POTASOWA">SÓL POTASOWA</SelectItem>
                    <SelectItem value="MOCZNIK">MOCZNIK</SelectItem>
                    <SelectItem value="MOCZNIK TECHNICZNY">MOCZNIK TECHNICZNY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity">Ilość (t)</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newShip.quantity}
                  onChange={(e) => setNewShip({ ...newShip, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="unloadingDate">Data Zakończenia Rozładunku</Label>
                <Input
                  id="unloadingDate"
                  type="date"
                  value={newShip.unloadingDate}
                  onChange={(e) => setNewShip({ ...newShip, unloadingDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="storageForm">Forma Magazynowania</Label>
                <Select
                  value={newShip.storageForm}
                  onValueChange={(value) => setNewShip({ ...newShip, storageForm: value })}
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
              <Button onClick={handleAddShip} className="w-full">
                Dodaj Statek
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Kompletna Lista Statków ({ships.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nazwa Statku</TableHead>
                <TableHead>Klient</TableHead>
                <TableHead>Ładunek</TableHead>
                <TableHead>Ilość (t)</TableHead>
                <TableHead>Data Rozładunku</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Forma</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ships.map((ship) => (
                <TableRow key={ship.id}>
                  <TableCell className="font-medium">{ship.id}</TableCell>
                  <TableCell>{ship.name}</TableCell>
                  <TableCell>
                    <Badge variant="default">FERTISTREAM</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{ship.cargo}</Badge>
                  </TableCell>
                  <TableCell>{ship.quantity.toLocaleString()}</TableCell>
                  <TableCell>{new Date(ship.unloadingDate).toLocaleDateString("pl-PL")}</TableCell>
                  <TableCell>{getStatusBadge(ship.status)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{ship.storageForm === "bulk" ? "Luz" : "Big Bag"}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditShip(ship)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog edycji statku */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edytuj Statek {editingShip?.id}</DialogTitle>
          </DialogHeader>
          {editingShip && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Nazwa Statku</Label>
                <Input
                  id="editName"
                  value={editingShip.name}
                  onChange={(e) => setEditingShip({ ...editingShip, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editCargo">Rodzaj Ładunku</Label>
                <Select
                  value={editingShip.cargo}
                  onValueChange={(value) => setEditingShip({ ...editingShip, cargo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MAP">MAP</SelectItem>
                    <SelectItem value="CAN">CAN</SelectItem>
                    <SelectItem value="DAP">DAP</SelectItem>
                    <SelectItem value="SÓL POTASOWA">SÓL POTASOWA</SelectItem>
                    <SelectItem value="MOCZNIK">MOCZNIK</SelectItem>
                    <SelectItem value="MOCZNIK TECHNICZNY">MOCZNIK TECHNICZNY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editQuantity">Ilość (t)</Label>
                <Input
                  id="editQuantity"
                  type="number"
                  value={editingShip.quantity}
                  onChange={(e) => setEditingShip({ ...editingShip, quantity: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="editUnloadingDate">Data Zakończenia Rozładunku</Label>
                <Input
                  id="editUnloadingDate"
                  type="date"
                  value={editingShip.unloadingDate}
                  onChange={(e) => setEditingShip({ ...editingShip, unloadingDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editStatus">Status</Label>
                <Select
                  value={editingShip.status}
                  onValueChange={(value) => setEditingShip({ ...editingShip, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="waiting">Oczekuje</SelectItem>
                    <SelectItem value="unloading">Rozładunek</SelectItem>
                    <SelectItem value="completed">Zakończony</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editForm">Forma Magazynowania</Label>
                <Select
                  value={editingShip.storageForm}
                  onValueChange={(value) => setEditingShip({ ...editingShip, storageForm: value })}
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
              <Button onClick={handleSaveShip} className="w-full">
                Zapisz Zmiany
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
