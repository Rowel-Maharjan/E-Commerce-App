import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import OrderDetails from './OrderDetails'

const Orders = () => {
  const [openDetailsDialog, setopenDetailsDialog] = useState(false)
  return <Card>
    <CardHeader>
      <CardTitle>Order History</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className='sr-only'>Details</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>123456</TableCell>
            <TableCell>27/06/2024</TableCell>
            <TableCell>In Process</TableCell>
            <TableCell>Rs.1000</TableCell>
            <TableCell>
              <Dialog open={openDetailsDialog} onOpenChange={setopenDetailsDialog}>
                <Button onClick = {()=>setopenDetailsDialog(true)}>View Details</Button>
                <OrderDetails />
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </CardContent>

  </Card>
}

export default Orders
