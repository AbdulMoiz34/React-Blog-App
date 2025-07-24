import { useEffect, useRef } from "react";
import { useNetworkState } from "@uidotdev/usehooks";
import toast from "react-hot-toast";
export default function OfflineAlert() {
    const network = useNetworkState();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (network.online === false && !hasShownToast.current) {
            toast.error("Internet connection lost.");
            hasShownToast.current = true;
        }

        if (network.online === true && hasShownToast.current) {
            toast.success("Back online");
            hasShownToast.current = false;
        }
    }, [network.online]);

    return null;
}