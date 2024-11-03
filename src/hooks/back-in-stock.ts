import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { BackInStockNotificationRequestValues, createBackInStockNotificationRequest } from "@/wix-api/backInStockNotifications";
import { wixBrowserClient } from "@/lib/wix-client.browser";

export function useCreateBackInStockNotificationRequest() {
    const {toast} = useToast()

    return useMutation({
        mutationFn: (values: BackInStockNotificationRequestValues) => 
            createBackInStockNotificationRequest(wixBrowserClient, values),
        onError(error) {
            console.log(error);
            if (
                (error as any).details.applicationError.code === "BACK_IN_STOCK_NOTIFICATION_REQUEST_AlREADY_EXISTS"
            ) {
                toast({
                    variant: "destructive",
                    description: "you are already subscribed to this product."
                })
            } else {
                toast({
                    variant: "destructive",
                    description: "something went wrong. please try again."
                })
            }
        }
    })
}