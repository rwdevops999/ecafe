import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarResourceType } from "../data/scheme"
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ResourceItems = ({resource}:{resource: SidebarResourceType}) => {
    const {t} = useTranslation();

    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
      });

    const renderComponent = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                    </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="bg-background ml-4 w-48 border-2 rounded-lg"
                    side="right"
                    align="start"
                >
                    {resource.children.map((child) => (
                        <DropdownMenuItem key={child.tkey}>
                        <div className="flex m-1 space-x-1 text-sm hover:bg-muted">
                            <child.icon size={18}/>
                            <a href={child.url}>
                                <span className="capitalize">{isClient ? t(child.tkey) : child.tkey}</span>
                            </a>
                        </div>
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    };

    return (<>{renderComponent()}</>
    )
}

export default ResourceItems;