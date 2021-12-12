import { useEffect, useState } from "react";
import { OpenSeaService, Asset } from '../../services/OpenSeaService';

export const useHome = () => {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
        const service = new OpenSeaService();
        service.retrieveAssets()
            .then((res) => {
                if (res) {
                    setAssets(res.assets.filter((a) => a.image_url));
                }
            });
    }, []);

    return {
        assets
    };
};