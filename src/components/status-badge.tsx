'use client';

import { Badge } from "@/components/ui/badge";
import type { Booking } from "@/lib/types";

interface StatusBadgeProps {
  status: Booking['status'];
  view?: 'client' | 'provider';
}

export function StatusBadge({ status, view = 'client' }: StatusBadgeProps) {
  switch (status) {
    case 'Pending':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    case 'Review Order and Pay':
      if (view === 'provider') {
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Awaiting Payment</Badge>;
      }
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Payment Required</Badge>;
    case 'Confirmed':
      return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
    case 'Completed':
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case 'Cancelled':
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
