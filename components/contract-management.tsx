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
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, FileText, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function ContractManagement() {
  const [contracts, setContracts] = useState([
    {
      id: "K001",
      client: "Agro-Pol Sp. z o.o.",
      ships: ["S001", "S003"],
      product: "MAP",
      quantity: 2500,
      remaining: 1800,
      form: "bulk",
      status: "active",
      createdDate: "2024-01-15",
    },
    {
      id: "K002",
      client: "Nawozy Północ",
      ships: ["S002"],
      product: "CAN",
      quantity: 1500,
      remaining: 1500,
      form: "bags",
      status: "active",
      createdDate: "2024-01-16",
    },
    {
      id: "K003",
      client: "Rolnicza Spółka",
      ships: ["S001"],
      product: "DAP",
      quantity: 3200,
      remaining: 800,
      form: "bulk",
      status: "active",
      createdDate: "2024-01-14",
    },
    {
      id: "K004",
      client: "Agro-Tech",
      ships: ["S003"],
      product: "MOCZNIK",
      quantity: 1800,
      remaining: 0,
      form: "bags",
      status: "completed",
      createdDate: "2024-01-13",
    },
    {
      id: "K005",
      client: "Zielona Dolina",
      ships: ["S004"],
      product: "CAN",
      quantity: 2200,
      remaining: 1100,
      form: "bulk",
      status: "active",
      createdDate: "2024-01-12",
    },
    {
      id: "K006",
      client: "Agro-Centrum",
      ships: ["S005"],
      product: "SÓL POTASOWA",
      quantity: 1600,
      remaining: 400,
      form: "bags",
      status: "active",
      createdDate: "2024-01-10",
    },
  ])

  // Available ships for selection
  const availableShips = [
    { id: "S001", name: "MV Baltic Star", cargo: "MAP" },
    { id: "S002", name: "MV North Wind", cargo: "MOCZNIK" },
    { id: "S003", name: "MV Sea Eagle", cargo: "DAP" },
    { id: "S004", name: "MV Ocean Pride", cargo: "CAN" },
    { id: "S005", name: "MV Baltic Queen", cargo: "SÓL POTASOWA" },
  ]

  const [editingContract, setEditingContract] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newContract, setNewContract] = useState({
    client: "",
    product: "",
    quantity: "",
    form: "bulk",
    ships: [] as string[],
  })

  const handleEditContract = (contract: any) => {
    setEditingContract({ ...contract })
    setIsEditDialogOpen(true)
  }

  const handleSaveContract = () => {
    if (editingContract) {
      setContracts(contracts.map((c) => (c.id === editingContract.id ? editingContract : c)))
      setIsEditDialogOpen(false)
      setEditingContract(null)
    }
  }

  const handleAddContract = () => {
    if (newContract.client && newContract.product && newContract.quantity && newContract.ships.length > 0) {
      const contract = {
        id: `K${String(contracts.length + 1).padStart(3, "0")}`,
        ...newContract,
        quantity: Number.parseInt(newContract.quantity),
        remaining: Number.parseInt(newContract.quantity),
        status: "active",
        createdDate: new Date().toISOString().split("T")[0],
      }
      setContracts([...contracts, contract])
      setNewContract({
        client: "",
        product: "",
        quantity: "",
        form: "bulk",
        ships: [],
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleShipSelection = (shipId: string, checked: boolean) => {
    if (checked) {
      setNewContract({ ...newContract, ships: [...newContract.ships, shipId] })
    } else {
      setNewContract({ ...newContract, ships: newContract.ships.filter((id) => id !== shipId) })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Aktywny</Badge>
      case "completed":
        return <Badge variant="outline">Zakończony</Badge>
      case "suspended":
        return <Badge variant="destructive">Wstrzymany</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCompletionPercentage = (remaining: number, total: number) => {
    return ((total - remaining) / total) * 100
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kontrakty FERTISTREAM - Historia Kompletna</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nowy Kontrakt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Dodaj Nowy Kontrakt</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newClient">Odbiorca</Label>
                <Input
                  id="newClient"
                  value={newContract.client}
                  onChange={(e) => setNewContract({ ...newContract, client: e.target.value })}
                  placeholder="Nazwa odbiorcy"
                />
              </div>
              <div>
                <Label htmlFor="newProduct">Towar</Label>
                <Select
                  value={newContract.product}
                  onValueChange={(value) => setNewContract({ ...newContract, product: value })}
                >
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
                <Label htmlFor="newQuantity">Ilość (t)</Label>
                <Input
                  id="newQuantity"
                  type="number"
                  value={newContract.quantity}
                  onChange={(e) => setNewContract({ ...newContract, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="newForm">Forma Magazynowania</Label>
                <Select
                  value={newContract.form}
                  onValueChange={(value) => setNewContract({ ...newContract, form: value })}
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
                <Label>Powiązane Statki</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto border rounded p-2">
                  {availableShips.map((ship) => (
                    <div key={ship.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={ship.id}
                        checked={newContract.ships.includes(ship.id)}
                        onCheckedChange={(checked) => handleShipSelection(ship.id, !!checked)}
                      />
                      <Label htmlFor={ship.id} className="text-sm">
                        {ship.id} - {ship.name} ({ship.cargo})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleAddContract} className="w-full">
                Dodaj Kontrakt
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statystyki kontraktów */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktywne Kontrakty</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contracts.filter((c) => c.status === "active").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Całkowita Wartość</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.reduce((sum, c) => sum + c.quantity, 0).toLocaleString()} t
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Do Realizacji</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contracts.reduce((sum, c) => sum + c.remaining, 0).toLocaleString()} t
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kompletna Lista Kontraktów ({contracts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Odbiorca</TableHead>
                <TableHead>Towar</TableHead>
                <TableHead>Statki</TableHead>
                <TableHead>Ilość (t)</TableHead>
                <TableHead>Pozostało (t)</TableHead>
                <TableHead>Postęp</TableHead>
                <TableHead>Forma</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.client}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{contract.product}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {contract.ships.map((ship) => (
                        <Badge key={ship} variant="outline" className="text-xs">
                          {ship}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{contract.quantity.toLocaleString()}</TableCell>
                  <TableCell>{contract.remaining.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={getCompletionPercentage(contract.remaining, contract.quantity)}
                        className="w-16"
                      />
                      <span className="text-xs text-muted-foreground">
                        {getCompletionPercentage(contract.remaining, contract.quantity).toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{contract.form === "bulk" ? "Luz" : "Big Bag"}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(contract.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditContract(contract)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog edycji kontraktu */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edytuj Kontrakt {editingContract?.id}</DialogTitle>
          </DialogHeader>
          {editingContract && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="client">Odbiorca</Label>
                <Input
                  id="client"
                  value={editingContract.client}
                  onChange={(e) => setEditingContract({ ...editingContract, client: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="product">Towar</Label>
                <Select
                  value={editingContract.product}
                  onValueChange={(value) => setEditingContract({ ...editingContract, product: value })}
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
                <Label htmlFor="quantity">Ilość (t)</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={editingContract.quantity}
                  onChange={(e) =>
                    setEditingContract({ ...editingContract, quantity: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="remaining">Pozostało (t)</Label>
                <Input
                  id="remaining"
                  type="number"
                  value={editingContract.remaining}
                  onChange={(e) =>
                    setEditingContract({ ...editingContract, remaining: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="form">Forma Magazynowania</Label>
                <Select
                  value={editingContract.form}
                  onValueChange={(value) => setEditingContract({ ...editingContract, form: value })}
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
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingContract.status}
                  onValueChange={(value) => setEditingContract({ ...editingContract, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktywny</SelectItem>
                    <SelectItem value="suspended">Wstrzymany</SelectItem>
                    <SelectItem value="completed">Zakończony</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveContract} className="w-full">
                Zapisz Zmiany
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
