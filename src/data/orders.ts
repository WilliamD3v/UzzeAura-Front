import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getOrderById,
  getOrderByTrackingCode,
  getOrders,
  updateOrderStatus,
} from '@/hooks/orders'

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],

    queryFn: getOrders,
  })
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['order', id],

    queryFn: () => getOrderById(id),

    enabled: !!id,
  })
}

export function useTrackingOrder(trackingCode: string) {
  return useQuery({
    queryKey: ['tracking-order', trackingCode],

    queryFn: () => getOrderByTrackingCode(trackingCode),

    enabled: !!trackingCode,

    retry: false,
  })
}

export function useUpdateOrderStatus(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Parameters<typeof updateOrderStatus>[1]) =>
      updateOrderStatus(id, data),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['order', id],
        }),

        queryClient.invalidateQueries({
          queryKey: ['orders'],
        }),
      ])
    },
  })
}
