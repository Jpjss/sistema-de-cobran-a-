"use client"

import { useState } from "react"
import { Plus, DollarSign, Users, FileText, TrendingUp, Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BillingForm } from "@/components/billing-form"
import { BillingList } from "@/components/billing-list"
import { CustomerList } from "@/components/customer-list"
import { Dashboard } from "@/components/dashboard"
import { NotificationSystem } from "@/components/notification-system"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeSettings } from "@/components/theme-settings"
import { ThemeDebug } from "@/components/theme-debug"

export interface Billing {
  id: string
  customerName: string
  customerEmail: string
  description: string
  amount: number
  dueDate: string
  status: "pending" | "paid" | "overdue"
  createdAt: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
}

export default function BillingSystem() {
  const [billings, setBillings] = useState<Billing[]>([
    {
      id: "1",
      customerName: "João Silva",
      customerEmail: "joao@email.com",
      description: "Desenvolvimento de website",
      amount: 2500.0,
      dueDate: "2024-01-15",
      status: "pending",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      customerName: "Maria Santos",
      customerEmail: "maria@email.com",
      description: "Consultoria em marketing digital",
      amount: 1800.0,
      dueDate: "2024-01-10",
      status: "paid",
      createdAt: "2023-12-28",
    },
    {
      id: "3",
      customerName: "Pedro Costa",
      customerEmail: "pedro@email.com",
      description: "Manutenção de sistema",
      amount: 800.0,
      dueDate: "2023-12-30",
      status: "overdue",
      createdAt: "2023-12-15",
    },
  ])

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      name: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo, SP",
      createdAt: "2023-12-01",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 88888-8888",
      address: "Av. Paulista, 456 - São Paulo, SP",
      createdAt: "2023-11-15",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 77777-7777",
      address: "Rua Augusta, 789 - São Paulo, SP",
      createdAt: "2023-10-20",
    },
  ])

  const [showBillingForm, setShowBillingForm] = useState(false)

  const addBilling = (billing: Omit<Billing, "id" | "createdAt">) => {
    const newBilling: Billing = {
      ...billing,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setBillings([newBilling, ...billings])
    setShowBillingForm(false)
  }

  const updateBilling = (id: string, updates: Partial<Billing>) => {
    setBillings(billings.map((billing) => (billing.id === id ? { ...billing, ...updates } : billing)))
  }

  const deleteBilling = (id: string) => {
    setBillings(billings.filter((billing) => billing.id !== id))
  }

  const addCustomer = (customer: Omit<Customer, "id" | "createdAt">) => {
    const newCustomer: Customer = {
      ...customer,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setCustomers([newCustomer, ...customers])
  }

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(customers.map((customer) => (customer.id === id ? { ...customer, ...updates } : customer)))
  }

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sistema de Cobrança</h1>
            <p className="text-muted-foreground mt-2">Gerencie suas cobranças e clientes de forma eficiente</p>
          </div>
          <ThemeToggle />
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="billings" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Cobranças
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Clientes
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard billings={billings} customers={customers} />
          </TabsContent>

          <TabsContent value="billings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Cobranças</h2>
              <Button onClick={() => setShowBillingForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Cobrança
              </Button>
            </div>

            {showBillingForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Nova Cobrança</CardTitle>
                  <CardDescription>Preencha os dados para criar uma nova cobrança</CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingForm customers={customers} onSubmit={addBilling} onCancel={() => setShowBillingForm(false)} />
                </CardContent>
              </Card>
            )}

            <BillingList billings={billings} onUpdate={updateBilling} onDelete={deleteBilling} />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerList
              customers={customers}
              onAdd={addCustomer}
              onUpdate={updateCustomer}
              onDelete={deleteCustomer}
            />
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Relatórios Financeiros</CardTitle>
                  <CardDescription>Análise detalhada das suas cobranças</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Funcionalidade de relatórios em desenvolvimento...</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationSystem billings={billings} />
          </TabsContent>

          <TabsContent value="settings">
            <ThemeSettings />
            <ThemeDebug />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
